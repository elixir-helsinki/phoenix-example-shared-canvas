import {Socket, LongPoller} from "phoenix"

// sourced mostly from: https://github.com/muhmi/phoenix_chat_example/blob/master/web/static/js/app.js

class App {

  static init(){
    let state = {
      pixels: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
     ],
      width: 16,
      height: 16
    };
    console.log("Alive!");
    App.render(state);
  }

  static render(state)
  {
    var ctx = document.getElementById("canvas").getContext("2d");

    var palette = ["#000000", "#9d9d9d", "#ffffff", "#be2633", "#e06f8b", "#493c2b", "#a46422", "#eb8931", "#f7e26b", "#2f484e", "#44891a", "#a3ce27", "#1b2632", "#005784", "#31a2f2", "#b2dcef"];

    var boxw = canvas.width/state.width;
    var boxh = canvas.height/state.height;

    ctx.fillStyle = "#fffafa";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    var pixels = state.pixels;

    for (var y = 0; y < state.height; y++) {
      var row = pixels[y];
      for (var x = 0; x < state.width; x++) {
        var color = row[x];
        if (color == 0) continue;
        ctx.fillStyle = palette[color];
        ctx.fillRect(x*boxw,y*boxh,boxw,boxh);
      }
    }
    
  }

}

$( () => App.init() )

export default App
