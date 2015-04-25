defmodule Pichat.PageController do
  use Pichat.Web, :controller

  plug :action

  def index(conn, _params) do
    render conn, "index.html"
  end
end
