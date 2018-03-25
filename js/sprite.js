var Sprite = function() {
  return this.init(arguments);
}

Sprite.prototype.x = 0;
Sprite.prototype.y = 0;
Sprite.prototype.w = 0;
Sprite.prototype.h = 0;
Sprite.prototype.hover = false;

Sprite.prototype.init = function (args) {
  this.x = args[0] || 0;
  this.y = args[1] || 0;
  this.w = args[2] || 0;
  this.h = args[3] || 0;
  return this;
}

Sprite.prototype.update = function (args) {
  this.x = args[0] || 0;
  this.y = args[1] || 0;
  this.w = args[2] || 0;
  this.h = args[3] || 0;
}

Sprite.prototype.updateWH = function (x, y) {
  this.w = x - this.x;
  this.h = y - this.y;
}

Sprite.prototype.unzoom = function(zoom = 1) {
  this.x = Math.round(this.x / zoom);
  this.y = Math.round(this.y / zoom);
  this.w = Math.round(this.w / zoom);
  this.h = Math.round(this.h / zoom);
  if (this.w < 0) {
    this.x += this.w;
    this.w *= -1;
  }
  if (this.h < 0) {
    this.y += this.h;
    this.h *= -1;
  }
  return this;
}

Sprite.prototype.shift = function(offx = 0, offy = 0, zoom = 1) {
  this.x = this.x + Math.round(offx / zoom);
  this.y = this.y + Math.round(offy / zoom);
  return this;
}

Sprite.prototype.copy = function() {
  return new Sprite(this.x, this.y, this.w, this.h);
}

Sprite.prototype.toList = function (offx = 0, offy = 0, zoom = 1) {
  const x = this.x * zoom - offx;
  const y = this.y * zoom - offy;
  const w = this.w * zoom;
  const h = this.h * zoom;
  return [x, y, w, h];
}

Sprite.prototype.onHover = function (x, y, offx = 0, offy = 0, zoom = 1) {
  return (x > this.x * zoom - offx && 
          y > this.y * zoom - offy &&
          x < this.x * zoom - offx + this.w * zoom &&
          y < this.y * zoom - offy + this.h * zoom);
}

Sprite.prototype.isZeroArea = function () {
  return this.w === 0 || this.h === 0;
}

Sprite.prototype.toCSV = function () {
  return "" + this.x + ", " + this.y + ", " + this.w + ", " + this.h;
}

var SpriteSet = Array;

SpriteSet.prototype.toCSV = function() {
  if (this.length === 0) {
    return "";
  }
  return this.reduce((csv, sprite) => {
    return csv + sprite.toCSV() + "\n";
  }, "").trimRight(1);
}
