export default class APPX_AppKeys {
  constructor() {
    APPX.checkKeyPressed = function(e) {
      const keyCode = e.keyCode;

      //  if (keyCode == 48)
      //      APPX.scene.fullScreen();

      //  if (keyCode == 57)
      //      APPX.scene.fullScreenExit();

      if (keyCode == 49) APPX.appKeyMode1();

      if (keyCode == 50) APPX.appKeyMode2();

      if (keyCode == 51) APPX.appKeyMode3();

      if (keyCode == 48) APPX.appKeyMode0();

      //  if (keyCode > 48 && keyCode < 58)
      //      appKeyNumber(keyCode);

      aloggerKit(' (checkKeyPressed) ' + keyCode);
    };

    document.addEventListener('keypress', APPX.checkKeyPressed, false);
  }
}

/*****

APPX_ControllerKeys = function() {

    this.keyboard = new KeyboardState();

    this.input = false;

    this.init = function() {

    }

    this.update = function() {

        this.keyboard.update();

        //	this.keyboard.debug();

        if (this.keyboard.pressed("1"))
            testm();

        if (this.keyboard.pressed("2"))
            test2();

        if (this.keyboard.pressed("3"))
            test3();

        if (this.keyboard.pressed("4"))
            test4();

        if (this.keyboard.pressed("5"))
            test5();

        if (this.keyboard.pressed("alt"))
            altPressed();

        if (this.keyboard.pressed("shift"))
            shiftPressed();

        if (this.keyboard.pressed("="))
            templateSearch();

        //if ( this.keyboard.pressed("+"))
        //	fullScreen();

        if (this.keyboard.pressed("enter"))
            this.endCharInput();

        var alpha = this.keyboard.alphaDown();

        if (alpha != 0) {
            if (!this.keyboard.pressed("alt"))
                this.addCharInput(alpha);
        }

    }

    this.addCharInput = //(key) {
        this.input = true;
        addRingInput(key);
        aloggerCtlKit("anet: (input-char) " + key);
    }

    this.endCharInput = //(key) {

        if (this.input) {
            this.input = false;
            endRingInput();
            aloggerCtlKit("anet: (input-end) " + key + " " + this.input);
        } else {
            //checkStartRingInput();
        }

    }


}

////////////////////////////////////////////////////////////////////////////

// initialization
KeyboardState = function() {
    // bind keyEvents
    document.addEventListener("keydown", KeyboardState.onKeyDown, false);
    document.addEventListener("keyup", KeyboardState.onKeyUp, false);
}

///////////////////////////////////////////////////////////////////////////////

KeyboardState.k =
{
    8: "backspace", 9: "tab", 13: "enter", 16: "shift",
    17: "ctrl", 18: "alt", 27: "esc", 32: "space",
    33: "pageup", 34: "pagedown", 35: "end", 36: "home",
    37: "left", 38: "up", 39: "right", 40: "down",
    45: "insert", 46: "delete", 186: ";", 187: "=",
    188: ",", 189: "-", 190: ".", 191: "/",
    219: "[", 220: "\\", 221: "]", 222: "'"
}

KeyboardState.status = {}

KeyboardState.keyName = //(keyCode) {
    return ( KeyboardState.k[keyCode] != null ) ?
        KeyboardState.k[keyCode] :
        String.fromCharCode(keyCode);
}

KeyboardState.onKeyUp = //(event) {
    var key = KeyboardState.keyName(event.keyCode);
    if (KeyboardState.status[key])
        KeyboardState.status[key].pressed = false;
}

KeyboardState.onKeyDown = //(event) {
    var key = KeyboardState.keyName(event.keyCode);
    if (!KeyboardState.status[key])
        KeyboardState.status[key] = {
            down: false,
            pressed: false,
            up: false,
            updatedPreviously: false,
            code: event.keyCode
        }
}

KeyboardState.prototype.update = function() {
    for (var key in KeyboardState.status) {
        // insure that every keypress has "down" status exactly once
        if (!KeyboardState.status[key].updatedPreviously) {
            KeyboardState.status[key].down = true;
            KeyboardState.status[key].pressed = true;
            KeyboardState.status[key].updatedPreviously = true;
        }
        else // updated previously
        {
            KeyboardState.status[key].down = false;
        }

        // key has been flagged as "up" since last update
        if (KeyboardState.status[key].up) {
            delete KeyboardState.status[key];
            continue; // move on to next key
        }

        if (!KeyboardState.status[key].pressed) // key released
            KeyboardState.status[key].up = true;
    }
}

KeyboardState.prototype.down = //(keyName) {
    return (KeyboardState.status[keyName] && KeyboardState.status[keyName].down);
}

KeyboardState.prototype.pressed = //(keyName) {
    return (KeyboardState.status[keyName] && KeyboardState.status[keyName].pressed);
}

KeyboardState.prototype.up = //(keyName) {
    return (KeyboardState.status[keyName] && KeyboardState.status[keyName].up);
}

KeyboardState.prototype.alphaDown = function() {

    for (var key in KeyboardState.status) {
        if (KeyboardState.status[key].code >= 65 && KeyboardState.status[key].code <= 90) {

            if (KeyboardState.status[key] && KeyboardState.status[key].down) {
                var keyl = key.toLowerCase();
                return keyl;
            }

        }
    }

    return 0;

}

KeyboardState.prototype.debug = function() {
    var list = "Keys active: ";
    for (var arg in KeyboardState.status)
        list += " " + arg
    console.log(list);
}
*/
