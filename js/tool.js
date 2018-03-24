var Tools = {};

//Tools.drawSprite = function (can, con, div, redraw) {
Tools.drawSprite = function (app) {
  const can = app.can;
  const con = app.con;
  const wid = app.wid;
  const div = app.div;
  const redraw = app.redraw;
  const screen = new Sprite(0, 0, div.width, div.height);
  // Interface context
  const icontext = con.contextInterface;
  const ifillRect = icontext.fillRect;
  const ifillStyle = icontext.fillStyle;
  const iclearRect = icontext.clearRect;
  // Sprite context
  const scontext = con.contextSprites;
  const sfillRect = scontext.fillRect;
  const sfillStyle = scontext.fillStyle;
  const sclearRect = scontext.clearRect;
  // Sprite styles
  const styleOff = div.styles.off;
  const styleOn = div.styles.on;
  const styleActive = div.styles.active;
  // Tool members
  this.drawLock = false;
  this.hoverLock = false;
  this.toolSprite = null;
  this.hoverSelect = null;

  this.mousedown = (ev) => {
    if (!this.hoverLock) {
      if (this.hoverSelect === null) {
        this.drawLock = true;
        this.toolSprite = new Sprite(ev._x, ev._y);
        if (div.activeSprite !== null) {
          clearSprite(div.activeSprite);
          drawSprite(div.activeSprite, styleOff);
          div.activeSprite = null;
          wid.coords.view(null);
        }
      } else if (div.activeSprite != this.hoverSelect) {
        if (div.activeSprite !== null) {
          clearSprite(div.activeSprite);
          drawSprite(div.activeSprite, styleOff);
        }
        div.activeSprite = this.hoverSelect;
        clearSprite(div.activeSprite);
        drawSprite(div.activeSprite, styleActive);
        wid.coords.view(div.activeSprite);
      } else {
        clearSprite(div.activeSprite);
        drawSprite(div.activeSprite, styleOn);
        div.activeSprite = null;
        wid.coords.view(null);
      }
    }
  };

  this.mousemove = (ev) => {
    if (!this.drawLock) {
      if (!this.hoverLock) {
        this.hoverLock = true;
        let hoverFound = null;
        div.sprites.forEach((sprite) => {
          if (sprite.onHover(ev._x, ev._y, div.zoom)) {
            hoverFound = sprite;
            sprite.hover = true;
            if (sprite != div.activeSprite) {
              clearSprite(sprite);
              drawSprite(sprite, styleOn);
            }
          } else if (sprite.hover) {
            if (sprite != div.activeSprite) {
              sprite.hover = false;
              clearSprite(sprite);
              drawSprite(sprite, styleOff);
            }
          }
        });
        this.hoverSelect = hoverFound;
        this.hoverLock = false;
      }
      return;
    }  
    this.toolSprite.updateWH(ev._x, ev._y);
    clearInterface();
    drawInterface(this.toolSprite, styleActive);
    div.activeSprite = this.toolSprite.copy().unzoom(div.zoom);
    wid.coords.view(div.activeSprite);
  };

  this.mouseup = (ev) => {
    if (!this.drawLock) return;
    if (this.toolSprite.isZeroArea()) {
      this.toolSprite = null;
      div.activeSprite = null;
      return;
    }
    div.sprites.push(this.toolSprite.unzoom(div.zoom));
    clearInterface();
    drawSprite(this.toolSprite, styleActive);
    div.activeSprite = this.toolSprite;
    wid.coords.view(div.activeSprite);
    this.drawLock = false;
  };

  var clearInterface = () => {
    iclearRect.apply(icontext, screen.toList());
  }

  var drawInterface = (sprite, style) => {
    icontext.fillStyle = style;
    ifillRect.apply(icontext, sprite.toList());
  }

  var clearSprite = (sprite) => {
    sclearRect.apply(scontext, sprite.toList(div.zoom));
  }

  var drawSprite = (sprite, style) => {
    scontext.fillStyle = style;
    sfillRect.apply(scontext, sprite.toList(div.zoom));
  }
}
