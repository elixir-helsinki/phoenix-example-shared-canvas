defmodule Pichat.SharedCanvas do

  @width 16
  @height 16

  defmodule State do
    defstruct pixels: [], width: 0, height: 0
  end

  @doc "Start a shared canvas process and register it by module name"
  def start_link(_opts) do
    Agent.start_link(fn ->
      pixels = for(_ <- 1..@width, do: for(_ <- 1..@height, do: 0))
      %State{pixels: pixels, width: @width, height: @height}
    end, name: __MODULE__)
  end

  @doc "Sets a pixel on the canvas"
  def set(x, y, color) do
    Agent.get_and_update(__MODULE__, fn canvas -> 
      row = canvas.pixels |> Enum.at y

      row = List.replace_at row, x, color

      pixels = List.replace_at canvas.pixels, y, row

      canvas = put_in canvas.pixels, pixels
      {canvas, canvas}
    end)
  end

  @doc "Return agent state"
  def get_state do
    Agent.get(__MODULE__, &(&1))
  end

end