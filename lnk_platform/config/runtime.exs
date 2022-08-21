import Config

if config_env() == :prod do
  config :lnk_platform, LnkPlatformWeb.Endpoint, server: true

  # Configure your database
  db_url =
    System.get_env("DATABASE_URL") ||
      raise """
      environment variable DATABASE_URL is missing.
      """

  config :lnk_platform, LnkPlatform.Repo,
    ssl: false,
    url: db_url,
    socket_options: [:inet6]

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
