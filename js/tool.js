var Tools = {};

Tools.drawSprite = function (can, con, div, redraw) {
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
  // Tool members
  this.active = false;
  this.hover = false;
  this.sprite = null;

  this.mousedown = (ev) => {
    this.active = true;
    this.sprite = new Sprite(ev._x, ev._y);
  };

  this.mousemove = (ev) => {
    if (!this.active) {
      if (!this.hover) {
        this.hover = true;
        div.sprites.forEach((sprite) => {
          if (sprite.onHover(ev._x, ev._y, div.zoom)) {
            sclearRect.apply(scontext, sprite.toList(div.zoom));
            scontext.fillStyle =  "rgba(0,255,0,.2)"
            sfillRect.apply(scontext, sprite.toList(div.zoom));
          } else if (sprite.hover) {
            sprite.hover = false;
            sclearRect.apply(scontext, sprite.toList(div.zoom));
            scontext.fillStyle =  "rgba(0,0,0,.6)"
            sfillRect.apply(scontext, sprite.toList(div.zoom));
          }
        });
        this.hover = false;
      }
      return;
    }  
    this.sprite.updateWH(ev._x, ev._y);
    iclearRect.apply(icontext, screen.toList());
    icontext.fillStyle = "rgba(0,0,0,.2)";
    ifillRect.apply(icontext, this.sprite.toList());
  };

  this.mouseup = (ev) => {
    div.sprites.push(this.sprite.unzoom(div.zoom));
    iclearRect.apply(icontext, screen.toList());
    scontext.fillStyle = "rgba(0,0,0,.6)";
    sfillRect.apply(scontext, this.sprite.toList(div.zoom));
    this.active = false;
  };
}
