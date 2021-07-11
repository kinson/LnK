defmodule LnkPlatformWeb.UrlController do
  use LnkPlatformWeb, :controller

  def show(conn, %{"slug" => slug}) do
    case LnkPlatform.Links.get_url_by_slug(slug) do
      nil ->
        put_status(conn, 404) |> render(:show, error: :not_found)

      link ->
        put_status(conn, 200) |> render(:show, link: link)
    end
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
    |> render(:error, error: :bad_payload)
  end

  defp handle_create_error(conn, errors) do
    case hd(errors) do
      {_, {_, [constraint: :unique, constraint_name: _]}} ->
        put_status(conn, 409) |> render(:error, error: :unique)

      {:long_url, {_, [count: count, validation: :length, kind: _, type: _]}} ->
        put_status(conn, 400) |> render(:error, error: :too_long_url, length: count)

      {:long_url, {_, [validation: :format]}} ->
        put_status(conn, 400) |> render(:error, error: :bad_format)

      err ->
        IO.inspect(err)
        put_status(conn, 500) |> render(:error, error: :server)
    end
  end

  defp artificial_loading_time(long_url) do
    sleep = Task.async(fn -> :timer.sleep(500) end)

    ret = LnkPlatform.Links.create_url(long_url)

    Task.await(sleep)

    ret
  end
end
