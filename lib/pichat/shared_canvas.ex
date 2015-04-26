defmodule Pichat.SharedCanvas do

  @width 16
  @height 16

  defmodule State do
    defstruct pixels: [], width: @width, height: @height
  end

  @doc "Start a shared canvas process and register it by module name"
  def start_link(_opts) do
    Agent.start_link(fn ->
      pixels = for(_ <- 1..@width, do: for(_ <- 1..@height, do: 0))
      %State{pixels: pixels}
    end, name: __MODULE__)
  end

  @doc "Sets a pixel on the canvas"
  def set(x, y, color) do
    Agent.update(__MODULE__, fn canvas -> 
      row = canvas.pixels 
      |> Enum.at y 
      |> List.replace_at x, color

      pixels = List.replace_at canvas.pixels, y, row

      update_in canvas.pixels, pixels

    end)
  end

  @doc "Return agent state"
  def get_state do
    Agent.get(__MODULE__, &(&1))
  end

end