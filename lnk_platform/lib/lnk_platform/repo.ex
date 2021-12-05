defmodule LnkPlatform.Repo do
  use Ecto.Repo,
    otp_app: :lnk_platform,
    adapter: Ecto.Adapters.SQLite3
end
