defmodule Pichat.Router do
  use Phoenix.Router

  socket "/ws", Chat do
    channel "canvas:*", CanvasChannel
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Pichat do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Pichat do
  #   pipe_through :api
  # end
end
