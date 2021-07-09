defmodule LnkPlatformWeb.UrlController do

  use LnkPlatformWeb, :controller

  # TODO: delete since this probably won't be used
  def index(conn, _params) do
    conn
    |> put_status(200)
    |> text("Hello")
  end

  # TODO: delete since this probably won't be used
  def show(conn, %{"id" => url_id}) do
    IO.inspect(url_id)
    # fetch url by id

    conn
    |> put_status(200)
    |> text("Hello")
  end

  def show(conn, %{"slug" => slug}) do
    IO.inspect(slug)
    # fetch url by slug

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
    case LnkPlatform.Links.create_url(long_url) do
      {:ok, link} -> link |> IO.inspect
      {:error, error} -> error |> IO.inspect
    end

    conn
    |> put_status(200)
    |> text("Hello")
  end

  def create(conn, _params) do
    conn
    |> put_status(400)
    |> text("Bad request")
  end
end
