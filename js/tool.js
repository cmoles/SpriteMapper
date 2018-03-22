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
  this.drawLock = false;
  this.hoverLock = false;
  this.hoverSelect = false;
  this.sprite = null;

  this.mousedown = (ev) => {
    if (!this.hoverLock && !this.hoverSelect) {
      this.drawLock = true;
      this.sprite = new Sprite(ev._x, ev._y);
    }
  };

  this.mousemove = (ev) => {
    if (!this.drawLock) {
      if (!this.hoverLock) {
        this.hoverLock = true;
        let hoverFound = false;
        div.sprites.forEach((sprite) => {
          if (sprite.onHover(ev._x, ev._y, div.zoom)) {
            hoverFound = true;
            sprite.hover = true;
            sclearRect.apply(scontext, sprite.toList(div.zoom));
            scontext.fillStyle = div.styles.on;
            sfillRect.apply(scontext, sprite.toList(div.zoom));
          } else if (sprite.hover) {
            sprite.hover = false;
            sclearRect.apply(scontext, sprite.toList(div.zoom));
            scontext.fillStyle = div.styles.off;
            sfillRect.apply(scontext, sprite.toList(div.zoom));
          }
        });
        this.hoverSelect = hoverFound;
        this.hoverLock = false;
      }
      return;
    }  
    this.sprite.updateWH(ev._x, ev._y);
    iclearRect.apply(icontext, screen.toList());
    icontext.fillStyle = div.styles.draw;
    ifillRect.apply(icontext, this.sprite.toList());
  };

  this.mouseup = (ev) => {
    if (!this.drawLock) return;
    div.sprites.push(this.sprite.unzoom(div.zoom));
    iclearRect.apply(icontext, screen.toList());
    scontext.fillStyle = div.styles.off;
    sfillRect.apply(scontext, this.sprite.toList(div.zoom));
    this.drawLock = false;
  };
}
