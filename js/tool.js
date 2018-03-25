var Tools = {};

//Tools.drawSprite = function (can, con, div, redraw) {
Tools.drawSprite = function (app) {
  const con = app.con;
  const wid = app.wid;
  const div = app.div;
  const redraw = app.redraw;
  // Interface context
  const icontext = con.contextInterface;
  const ifillRect = icontext.fillRect;
  const iclearRect = icontext.clearRect;
  // Sprite context
  const scontext = con.contextSprites;
  const sfillRect = scontext.fillRect;
  const sclearRect = scontext.clearRect;
  // Sprite styles
  const styleOff = div.styles.off;
  const styleOn = div.styles.on;
  const styleActive = div.styles.active;
  // Tool members
  this.drawLock = false;
  this.hoverLock = false;
  this.shiftLock = false;
  this.toolSprite = null;
  this.hoverSelect = null;
  this.shiftOrigin = null;

  this.init = () => {
    document.oncontextmenu = new Function("return false");
  };

  this.mousedown = (ev) => {
    if (this.hoverLock || this.drawLock) {
      return;
    }
    if (ev._right && !this.shiftLock) {
      this.shiftLock = true;
      this.shiftOrigin = {x: ev._x, y: ev._y};
      return;
    }
    if (this.shiftLock) {
      this.shiftOrigin = null;
      this.shiftLock = false;
      redraw();
      return;
    }
    if (this.hoverSelect === null) {
      this.drawLock = true;
      this.toolSprite = new Sprite(ev._x, ev._y);
      if (div.activeSprite !== null) {
        clearSprite(div.activeSprite);
        drawSprite(div.activeSprite, styleOff);
        div.activeSprite = null;
        wid.coords.view(null);
      }
      return;
    }
    if (div.activeSprite != this.hoverSelect) {
      if (div.activeSprite !== null) {
        clearSprite(div.activeSprite);
        drawSprite(div.activeSprite, styleOff);
      }
      div.activeSprite = this.hoverSelect;
      clearSprite(div.activeSprite);
      drawSprite(div.activeSprite, styleActive);
      wid.coords.view(div.activeSprite);
      return;
    }
    clearSprite(div.activeSprite);
    drawSprite(div.activeSprite, styleOn);
    div.activeSprite = null;
    wid.coords.view(null);
    return;
  };

  this.mousemove = (ev) => {
    if (this.drawLock) {
      this.toolSprite.updateWH(ev._x, ev._y);
      clearInterface();
      drawInterface(this.toolSprite, styleActive);
      div.activeSprite = this.toolSprite
                             .copy().unzoom(div.zoom);
      wid.coords.view(div.activeSprite);
      return;
    }
    if (this.hoverLock) {
      return;
    }
    if (this.shiftLock) {
      div.offx -= Math.round(ev._x - this.shiftOrigin.x);
      div.offy -= Math.round(ev._y - this.shiftOrigin.y);
      this.shiftOrigin = {x: ev._x, y: ev._y};
      redraw(false);
      return;
    }
    this.hoverLock = true;
    let hoverFound = null;
    div.sprites.forEach((sprite) => {
      if (sprite.onHover(ev._x, ev._y, div.offx, div.offy, div.zoom)) {
        hoverFound = sprite;
        sprite.hover = true;
        if (sprite != div.activeSprite) {
          clearSprite(sprite);
          drawSprite(sprite, styleOn);
        }
        return;
      }
      if (sprite.hover && sprite != div.activeSprite) {
        sprite.hover = false;
        clearSprite(sprite);
        drawSprite(sprite, styleOff);
      }
      return;
    });
    this.hoverSelect = hoverFound;
    this.hoverLock = false;
    return;
  };

  this.mouseup = (ev) => {
    if (!this.drawLock) {
      return;
    }
    if (this.toolSprite.isZeroArea()) {
      this.toolSprite = null;
      div.activeSprite = null;
      this.drawLock = false;
      return;
    }
    div.sprites.push(this.toolSprite.unzoom(div.zoom)
                                    .shift(div.offx, div.offy, div.zoom));
    clearInterface();
    drawSprite(this.toolSprite, styleActive);
    div.activeSprite = this.toolSprite;
    wid.coords.view(div.activeSprite);
    this.toolSprite = null;
    this.drawLock = false;
    return;
  };

  this.wheel = (ev) => {
    const pre_d = div.zoom;
    var delta = 0;

    if (event.wheelDelta) {
      delta = event.wheelDelta / 60; // IE and Opera
    } else if (event.detail) {
      delta = -event.detail / 60; // W3C
    }
    div.zoom = div.zoom + (delta * .1);

    if (div.zoom < 1) {
      div.zoom = 1;
    } else if (div.zoom > 10) {
      div.zoom = 10;
    }

    if (div.zoom !== pre_d) {
      this.mousemove(ev);
      redraw();
    }
    return;
  };

  var clearInterface = () => {
    const screen = new Sprite(0, 0, div.width, div.height);
    iclearRect.apply(icontext, screen.toList());
  }

  var drawInterface = (sprite, style) => {
    icontext.fillStyle = style;
    ifillRect.apply(icontext, sprite.toList());
  }

  var clearSprite = (sprite) => {
    sclearRect.apply(scontext, sprite.toList(div.offx, div.offy, div.zoom));
  }

  var drawSprite = (sprite, style) => {
    scontext.fillStyle = style;
    sfillRect.apply(scontext, sprite.toList(div.offx, div.offy, div.zoom));
  }
}
