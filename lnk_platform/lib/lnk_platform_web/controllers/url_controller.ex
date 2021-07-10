defmodule LnkPlatformWeb.UrlController do
  use LnkPlatformWeb, :controller

  def show(conn, %{"slug" => slug}) do
    conn
    |> put_status(200)
    |> text("Hello there")
  end

  def show(conn, _params) do
    conn
    |> put_status(400)
    |> text("Bad request")
  end

  def create(conn, %{"long_url" => long_url}) do
    case artificial_loading_time(long_url) do
      {:ok, link} ->
        put_status(conn, 201) |> render(:create, link: link)

      {:error, cs} ->
        handle_create_error(conn, cs.errors)
    end
  end

  def create(conn, _params) do
    conn
    |> put_status(400)
    |> text("Bad request")
  end

  defp handle_create_error(conn, errors) do
    case hd(errors) do
      {_, {_, [constraint: :unique, constraint_name: _]}} ->
        put_status(conn, 409) |> render(:error, error: :unique)

      _ ->
        put_status(conn, 500) |> render(:error, error: :server)
    end
  end

  defp artificial_loading_time(long_url) do
    sleep = Task.async(fn -> :timer.sleep(1000) end)

    ret = LnkPlatform.Links.create_url(long_url)

    Task.await(sleep)

    ret
  end
end
