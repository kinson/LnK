import Config

if config_env() == :prod do
  config :lnk_platform, LnkPlatformWeb.Endpoint, server: true

  # Configure your database
  config :lnk_platform, LnkPlatform.Repo,
    database: "priv/database.db",
    cache_size: -2000,
    temp_store: :file,
    journal_mode: :delete

  secret_key_base =
    System.get_env("SECRET_KEY_BASE") ||
      raise """
      environment variable SECRET_KEY_BASE is missing.
      You can generate one by calling: mix phx.gen.secret
      """

  config :lnk_platform, LnkPlatformWeb.Endpoint,
    http: [
      port: String.to_integer(System.get_env("PORT") || "4201"),
      transport_options: [socket_opts: [:inet6]]
    ],
    secret_key_base: secret_key_base
end
