defmodule Chat.CanvasChannel do
  use Phoenix.Channel
  require Logger

  alias Pichat.SharedCanvas

  def join("canvas:lobby", message, socket) do
    Process.flag(:trap_exit, true)
    :timer.send_interval(5000, :ping)
    send(self, {:after_join, message})

    {:ok, socket}
  end

  def handle_info({:after_join, msg}, socket) do
    Logger.debug "> join #{socket.topic}"
    broadcast! socket, "user:entered", %{user: msg["user"]}
    push socket, "join", %{status: "connected", state: SharedCanvas.get_state}
    {:noreply, socket}
  end
  def handle_info(:ping, socket) do
    push socket, "new:msg", %{user: "SYSTEM", body: "ping"}
    {:noreply, socket}
  end

  def terminate(reason, socket) do
    Logger.debug"> leave #{inspect reason}"
    :ok
  end

  def handle_in("new:pixel", %{"x" => x, "y" => y, "c" => color} = msg, socket) do
    Logger.debug "> pixel #{inspect msg}"
    state = SharedCanvas.set(x, y, color)
    broadcast! socket, "new:state", %{state: state}
    {:noreply, socket}
  end

  def handle_in("new:msg", msg, socket) do
    broadcast! socket, "new:msg", %{user: msg["user"], body: msg["body"]}
    {:reply, {:ok, msg["body"]}, assign(socket, :user, msg["user"])}
  end

end