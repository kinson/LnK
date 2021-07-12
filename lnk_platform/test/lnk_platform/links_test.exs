defmodule LnkPlatform.LinksTest do
  use LnkPlatform.DataCase

  alias LnkPlatform.Links

  describe "urls" do
    alias LnkPlatform.Links.Url

    @valid_long_url "http://google.com/longurkl"
    @invalid_long_url "http://google."
    @valid_attrs %{long_url: @valid_long_url, path_slug: "ABCDEF"}

    def url_fixture() do
      {:ok, url} =
        Url.changeset(%Url{}, @valid_attrs)
        |> LnkPlatform.Repo.insert()

      url
    end

    test "create_url/1 with valid long_url creates a url" do
      assert {:ok, %Url{} = url} = Links.create_url(@valid_long_url)
      assert url.long_url == @valid_long_url
    end

    test "create_url/1 with invalid long_url returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Links.create_url(@invalid_long_url)
    end

    test "create_url/1 prevents duplicate paths from being used" do
      assert {:ok, %Url{}} = Links.create_url(@valid_long_url)

      path_slug_generator = fn ->
        [@valid_attrs.path_slug, @valid_attrs.path_slug, "ANOTHERKEY"]
        |> Enum.take_random(1)
        |> hd()
      end

      assert {:ok, %Url{}} =
               Links.create_url("https://google.com/search?q=query", path_slug_generator)

      assert {:ok, %Url{}} =
               Links.create_url("https://google.com/search?q=another+query", path_slug_generator)
    end

    test "get_url_by_slug/1 returns url data when path_slug is found" do
      url_fixture()
      assert %Url{} = Links.get_url_by_slug("ABCDEF")
    end

    test "get_url_by_slug/1 returns nil when path_slug is not found" do
      url_fixture()
      assert is_nil(Links.get_url_by_slug("AAAAA"))
    end
  end
end
