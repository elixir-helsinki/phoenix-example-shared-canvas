defmodule Pichat.PageControllerTest do
  use Pichat.ConnCase

  test "GET /" do
    conn = get conn(), "/"
    assert conn.resp_body =~ "Welcome to Phoenix!"
  end
end
