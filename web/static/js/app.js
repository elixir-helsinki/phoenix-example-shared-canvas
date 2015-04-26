import {Socket, LongPoller} from "phoenix"

// sourced mostly from: https://github.com/muhmi/phoenix_chat_example/blob/master/web/static/js/app.js

let WIDTH = 16;
let HEIGHT = 16;

let BOX_WIDTH = 512/WIDTH;
let BOX_HEIGHT = 512/HEIGHT;

class App {

  static init(){

    let names = ["void", "ash", "blind", "bloodred", "pigmeat", "oldpoop", "newpoop", "blaze", "zornskin", "shadegreen", "leafgreen", "slimegreen", "nightblue", "seablue", "skyblue", "cloudblue"]

    // This would come from the server
    let state = {
      pixels: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
     ]
    };

    // start our socket code

    let $messages  = $("#messages")
    let $username  = $("#username")
    let $input     = $("#message-input")
    let $canvas    = $("#canvas")

    let mycolor = Math.round(15 * Math.random())

    if ($username.val() == '') {
      $username.val(names[mycolor])
    }

    let proto = location.protocol == "https:" ? "wss:" : "ws:"
    let socket = new Socket(proto + "//" + location.host +  "/ws")
    socket.connect()

    socket.onClose( e => console.log("CLOSE", e) )

    socket.join("canvas:lobby", {color: mycolor, user: $username.val()})
      .receive("ignore", () => console.log("auth error") )
      .receive("ok", chan => {

        chan.onError( e => console.log("something went wrong", e) )
        chan.onClose( e => console.log("channel closed", e) )

        $input.off("keypress").on("keypress", e => {
          if (e.keyCode == 13) {
            chan.push("new:msg", {user: $username.val(), color: mycolor, body: $input.val()})
            $input.val("")
          }
        })

        chan.on("join", msg => {
          this.render(msg.state)
        } )

        chan.on("new:state", msg => {
          this.render(msg.state)
        })

        chan.on("new:msg", msg => {
          $messages.append(this.messageTemplate(msg))
          $messages.scrollTop($messages.height())
        })

        chan.on("user:entered", msg => {
          var username = this.sanitize(msg.user || "anonymous")
          $messages.append(`<br/><i>[${username} entered]</i>`)
        })

        var mouseDown = false

        let setpixel = function(elem, e) {
          let offset = elem.offset();
          let x = Math.floor((e.pageX - offset.left) / BOX_WIDTH)
          let y = Math.floor((e.pageY - offset.top) / BOX_HEIGHT)

          chan.push("new:pixel", {user: $username.val(), x: x, y: y, c: mycolor})
        }

        // setup click handler
        $canvas.mousedown(function (e) {
          setpixel($(this), e)
          mouseDown = true
          return false
        })

        $canvas.mouseup(function (e) {
          mouseDown = false
          return false
        })

        $canvas.mousemove(function (e) {
          if (mouseDown) setpixel($(this), e)
          return false
        });

      })
      .after(10000, () => console.log("Connection interruption") )

    console.log("Alive!");
    App.render(state);
  }

  static click(x, y) {
    console.log("click & clack " + x + ", " + y);
  }

  static render(state)
  {
    let ctx = document.getElementById("canvas").getContext("2d")

    let palette = ["#000000", "#9d9d9d", "#ffffff", "#be2633", "#e06f8b", "#493c2b", "#a46422", "#eb8931", "#f7e26b", "#2f484e", "#44891a", "#a3ce27", "#1b2632", "#005784", "#31a2f2", "#b2dcef"]

    ctx.fillStyle = "#fffafa"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    let pixels = state.pixels

    for (var y = 0; y < HEIGHT; y++) {
      let row = pixels[y]
      for (var x = 0; x < WIDTH; x++) {
        let color = row[x]
        if (color == 0) continue
        ctx.fillStyle = palette[color]
        ctx.fillRect(x * BOX_WIDTH, y * BOX_HEIGHT, BOX_WIDTH, BOX_HEIGHT)
      }
    }

  }

  static sanitize(html) { return $("<div/>").text(html).html() }

  static messageTemplate(msg){
    let username = this.sanitize(msg.user || "anonymous")
    let body     = this.sanitize(msg.body)

    return(`<p><a href='#'>[${username}]</a>&nbsp; ${body}</p>`)
  }

}

$( () => App.init() )

export default App
