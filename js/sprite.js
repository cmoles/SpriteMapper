var Sprite = function() {
  return this.init(arguments);
}

Sprite.prototype.x = 0;
Sprite.prototype.y = 0;
Sprite.prototype.w = 0;
Sprite.prototype.h = 0;

Sprite.prototype.init = function (args) {
  this.x = args[0] || 0;
  this.y = args[1] || 0;
  this.w = args[2] || 0;
  this.h = args[3] || 0;
  return this;
}

Sprite.prototype.updateWH = function (x, y) {
  this.w = x - this.x;
  this.h = y - this.y;
}

Sprite.prototype.unzoom = function(zoom = 1) {
  this.x /= zoom;
  this.y /= zoom;
  this.w /= zoom;
  this.h /= zoom;
  return this;
}

Sprite.prototype.toList = function (zoom = 1) {
  return [this.x * zoom, this.y * zoom, this.w * zoom, this.h * zoom];
}

var SpriteSet = Array;
