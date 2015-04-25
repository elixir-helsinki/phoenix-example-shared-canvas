import {Socket, LongPoller} from "phoenix"

// sourced mostly from: https://github.com/muhmi/phoenix_chat_example/blob/master/web/static/js/app.js

let WIDTH = 16;
let HEIGHT = 16;

let BOX_WIDTH = 512/WIDTH;
let BOX_HEIGHT = 512/HEIGHT;

class App {

  static init(){
    // This would come from the server
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
     ]
    };

    // setup click handler
    $("#canvas").click(function (e) {
      let offset = $(this).offset();
      let x = Math.round((e.pageX - offset.left)/BOX_WIDTH);
      let y = Math.round((e.pageY - offset.top)/BOX_HEIGHT);
      App.click(x, y);
    });

    console.log("Alive!");
    App.render(state);
  }

  static click(x, y) {
    console.log("click & clack " + x + ", " + y);
  }

  static render(state)
  {
    var ctx = document.getElementById("canvas").getContext("2d");

    var palette = ["#000000", "#9d9d9d", "#ffffff", "#be2633", "#e06f8b", "#493c2b", "#a46422", "#eb8931", "#f7e26b", "#2f484e", "#44891a", "#a3ce27", "#1b2632", "#005784", "#31a2f2", "#b2dcef"];

    ctx.fillStyle = "#fffafa";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    var pixels = state.pixels;

    for (var y = 0; y < HEIGHT; y++) {
      var row = pixels[y];
      for (var x = 0; x < WIDTH; x++) {
        var color = row[x];
        if (color == 0) continue;
        ctx.fillStyle = palette[color];
        ctx.fillRect(x*BOX_WIDTH,y*BOX_HEIGHT,BOX_WIDTH,BOX_HEIGHT);

      }
    }

  }

}

$( () => App.init() )

export default App
