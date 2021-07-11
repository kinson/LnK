defmodule LnkPlatform.Links.Url do
  use Ecto.Schema
  import Ecto.Changeset

  schema "urls" do
    field :long_url, :string
    field :path_slug, :string

    timestamps()
  end

  @doc false
  def changeset(url, attrs) do
    url
    |> cast(attrs, [:long_url, :path_slug])
    |> unique_constraint(:long_url)
    |> unique_constraint(:path_slug)
    |> validate_length(:long_url, [min: 10, max: 500])
    |> validate_format(:long_url, ~r/http[s]{0,1}:\/\/.*\..+/)
    |> validate_required([:long_url, :path_slug])
  end
end
