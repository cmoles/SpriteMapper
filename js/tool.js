var Tools = {};

Tools.drawSprite = function (can, con, div, redraw) {
  const screen = new Sprite(0, 0, div.width, div.height);
  // Interface context
  const icontext = con.contextInterface;
  const ifillRect = icontext.fillRect;
  const iclearRect = icontext.clearRect;
  // Sprite context
  const scontext = con.contextSprites;
  const sfillRect = scontext.fillRect;
  const sclearRect = scontext.clearRect;
  // Tool members
  this.active = false;
  this.sprite = null;

  this.mousedown = (ev) => {
    this.active = true;
    this.sprite = new Sprite(ev._x, ev._y);
  };

  this.mousemove = (ev) => {
    if (!this.active) return;
    this.sprite.updateWH(ev._x, ev._y);
    iclearRect.apply(icontext, screen.toList());
    ifillRect.apply(icontext, this.sprite.toList());
  };

  this.mouseup = (ev) => {
    div.sprites.push(this.sprite.unzoom(div.zoom));
    iclearRect.apply(icontext, screen.toList());
    sfillRect.apply(scontext, this.sprite.toList(div.zoom));
    this.active = false;
  };
}
