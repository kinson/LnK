defmodule LnkPlatform.LinkGenerator do
  @moduledoc """
  LinkGenerator module provides functions
  to generate a short path used by the link
  shortening application
  """

  @doc """
  Generates a random path with a given length.

  ## Examples

      iex> generate_random_path(3)
      a3

  """
  def generate_random_path(length \\ 6) do
    :crypto.strong_rand_bytes(length) |> Base.url_encode64() |> binary_part(0, length)
  end

end
