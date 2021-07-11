defmodule LnkPlatformWeb.UrlView do
  use LnkPlatformWeb, :view

  @url_response_keys [:long_url, :path_slug, :id, :inserted_at]

  def render("create.json", %{link: link}) do
    Map.take(link, @url_response_keys)
  end

  def render("error.json", %{error: :unique}) do
    %{message: "This URL has already been shortened"}
  end

  def render("error.json", %{error: :too_long_url, length: length}) do
    %{message: "URL must be less than #{length} characters"}
  end

  def render("error.json", %{error: :bad_format}) do
    %{message: "URL must have format http(s)://site.com"}
  end

  def render("error.json", %{error: :bad_payload}) do
    %{message: "Invalid payload"}
  end

  def render("error.json", %{error: :server}) do
    %{message: "Failed to shorten URL"}
  end

  def render("show.json", %{link: link}) do
    Map.take(link, @url_response_keys)
  end

  def render("show.json", %{error: :not_found}) do
    %{message: "Could not find url"}
  end
end
