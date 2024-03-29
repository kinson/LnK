defmodule LnkPlatformWeb.Router do
  use LnkPlatformWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", LnkPlatformWeb do
    pipe_through :api

    resources "/urls", UrlController, only: [:create]
    get "/urls/path/:slug", UrlController, :show
    get "/urls/long_url/:long_url", UrlController, :show
  end
end
