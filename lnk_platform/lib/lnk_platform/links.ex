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

      iex> get_url_by_slug(123)
      %Url{}

      iex> get_url_by_slug(456)
      nil

  """
  @spec get_url_by_slug(String.t()) :: Url.t()
  def get_url_by_slug(slug), do: Repo.get_by(Url, path_slug: slug)

  @doc """
  Gets a single url using the long_url associated with it.

  Returns nil if the Url does not exist.

  ## Examples

      iex> get_slug_by_url("https://google.com/longurl")
      %Url{}

      iex> get_slug_by_url("http://newgoogle.com/longurl")
      nil

  """
  @spec get_slug_by_url(String.t()) :: Url.t()
  def get_slug_by_url(long_url), do: Repo.get_by(Url, long_url: long_url)

  @doc """
  Creates a url with a given long_url.

  Returns the newly created Url struct.

  ## Examples

      iex> create_url("https://long_url.com/long")
      {:ok, %Url{}}

      iex> create_url("bad_sitedotnotreal")
      {:error, %Ecto.Changeset{}}

  """
  @spec create_url(String.t(), (() -> String.t()) | nil) :: {:ok, Url.t()}
  def create_url(long_url, generator_fn \\ nil) do
    random_path =
      case generator_fn do
        nil -> LnkPlatform.LinkGenerator.generate_random_path()
        generator_fn -> generator_fn.()
      end

    case Repo.get_by(Url, path_slug: random_path) do
      nil ->
        %Url{}
        |> Url.changeset(%{long_url: long_url, path_slug: random_path})
        |> Repo.insert(returning: true)

      _ ->
        create_url(long_url)
    end
  end
end
