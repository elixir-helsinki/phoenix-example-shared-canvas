import {Socket, LongPoller} from "phoenix"

// sourced mostly from: https://github.com/muhmi/phoenix_chat_example/blob/master/web/static/js/app.js

class App {

  static init(){
    console.log("I am alive!");
    App.render();
  }

  static render()
  {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.beginPath();
    ctx.arc(95,50,40,0,2*Math.PI);
    ctx.stroke();
  }

}

$( () => App.init() )

export default App
