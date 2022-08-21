# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Mix.Config

config :lnk_platform,
  ecto_repos: [LnkPlatform.Repo]

# Configures the endpoint
config :lnk_platform, LnkPlatformWeb.Endpoint,
  server: true,
  url: [host: "localhost"],
  secret_key_base: "fv5hHuHpKKK6GmjpNEPAoL0Zad9/vPrcc9AizSjW8A08inlSUBFbujfZz2ku2z7T",
  render_errors: [view: LnkPlatformWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: LnkPlatform.PubSub,
  live_view: [signing_salt: "THhxI0xI"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
