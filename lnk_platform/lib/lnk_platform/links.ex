defmodule LnkPlatform.Links do
  @moduledoc """
  The Links context is the interface to core of the
  LnkPlatform app.
  """

  import Ecto.Query, warn: false
  alias LnkPlatform.Repo

  alias LnkPlatform.Links.Url

  @doc """
  Gets a single url using the slug associated with it.

  Returns nil if the Url does not exist.

  ## Examples

      iex> get_url!(123)
      %Url{}

      iex> get_url!(456)
      nil

  """
  def get_url_by_slug(slug), do: Repo.get_by(Url, path_slug: slug)

  @doc """
  Creates a url with a given long_url.

  Returns the newly created Url struct.

  ## Examples

      iex> create_url("https://long_url.com/long")
      {:ok, %Url{}}

      iex> create_url("bad_sitedotnotreal")
      {:error, %Ecto.Changeset{}}

  """
  def create_url(long_url) do
    random_path = LnkPlatform.LinkGenerator.generate_random_path()

    %Url{}
    |> Url.changeset(%{long_url: long_url, path_slug: random_path})
    |> Repo.insert(returning: true)
  end
end
