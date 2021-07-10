defmodule LnkPlatformWeb.UrlView do
  use LnkPlatformWeb, :view

  @url_response_keys [:long_url, :path_slug, :id, :inserted_at]

  def render("create.json", %{link: link}) do
    Map.take(link, @url_response_keys)
  end

  def render("error.json", %{error: :unique}) do
    %{message: "This URL has already been shortened"}
  end

  def render("error.json", %{error: :server}) do
    %{message: "Failed to shorten URL"}
  end
end
