defmodule LnkPlatform.Repo.Migrations.CreateUrls do
  use Ecto.Migration

  def change do
    create table(:urls) do
      add :long_url, :string
      add :path_slug, :string

      timestamps()
    end

    create unique_index(:urls, :long_url)
    create unique_index(:urls, :path_slug)
  end
end
