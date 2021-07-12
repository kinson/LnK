defmodule LnkPlatformWeb.UrlControllerTest do
  use LnkPlatformWeb.ConnCase

  alias LnkPlatform.Links.Url

  @valid_attrs %{long_url: "https://google.com/longurl", path_slug: "ABCDEF"}

  def url_fixture() do
    {:ok, url} =
      Url.changeset(%Url{}, @valid_attrs)
      |> LnkPlatform.Repo.insert()

    url
  end

  def create_url(_) do
    url = url_fixture()
    %{url: url}
  end

  describe "url controller" do
    setup [:create_url]

    test "show/2 should return 200 when it finds a url corresponding to a slug", %{conn: conn} do
      conn = get(conn, Routes.url_path(conn, :show, @valid_attrs.path_slug))
      assert Map.has_key?(json_response(conn, 200), "long_url")
    end

    test "show/2 should return 404 when it cannot find a url corresponding to a slug", %{
      conn: conn
    } do
      conn = get(conn, Routes.url_path(conn, :show, "AAAA"))
      assert Map.has_key?(json_response(conn, 404), "message")
    end

    test "show/2 should return 200 when it finds the url corresponding to a long_url", %{
      conn: conn
    } do
      encoded = URI.encode_www_form(@valid_attrs.long_url)
      conn = get(conn, "/api/urls/long_url/#{encoded}")
      assert Map.has_key?(json_response(conn, 200), "path_slug")
    end

    test "show/2 should return 404 when it cannot find a url corresponding to a long_url", %{
      conn: conn
    } do
      encoded = URI.encode_www_form("https://newurl.com/long")
      conn = get(conn, "/api/urls/long_url/#{encoded}")
      assert Map.has_key?(json_response(conn, 404), "message")
    end

    test "create/2 should return 201 when it successfully creates a Url", %{conn: conn} do
      conn =
        post(conn, Routes.url_path(conn, :create), %{"long_url" => "https://newurl.com/long"})

      assert Map.has_key?(json_response(conn, 201), "path_slug")
    end

    test "create/2 should return a 409 when a url with the long_url already exists", %{conn: conn} do
      conn = post(conn, Routes.url_path(conn, :create), %{"long_url" => @valid_attrs.long_url})
      assert Map.has_key?(json_response(conn, 409), "message")
    end

    test "create/2 should return a 400 when a the long_url is not formatted correctly", %{
      conn: conn
    } do
      conn =
        post(conn, Routes.url_path(conn, :create), %{"long_url" => "htp://google.com/longerurl"})

      assert Map.has_key?(json_response(conn, 400), "message")
    end

    test "create/2 should return a 400 when a the long_url is too long", %{conn: conn} do
      url_path = Enum.map(1..1001, fn _i -> "a" end) |> Enum.join()
      url = "http://google.com/reallylong?q=#{url_path}"

      conn = post(conn, Routes.url_path(conn, :create), %{"long_url" => url})
      assert Map.has_key?(json_response(conn, 400), "message")
    end

    test "create/2 should return a 400 when the payload is incorrect", %{conn: conn} do
      conn = post(conn, Routes.url_path(conn, :create), %{"url" => "htp://google.com/longerurl"})
      assert Map.has_key?(json_response(conn, 400), "message")
    end
  end
end
