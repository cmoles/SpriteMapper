var Widgets = {};

Widgets.coordWidget = function (app) {
  const div = app.div;
  const scontext = app.con.contextSprites;
  const redraw = app.redraw;
  const cx = document.getElementById('cx');
  const cy = document.getElementById('cy');
  const ch = document.getElementById('ch');
  const cw = document.getElementById('cw');
  const cu = document.getElementById('cu');

  this.init = () => {
    //cu.addEventListener('onclick', this.update);
    cu.onclick = this.update;
  };
  
  this.view = (sprite) => {
    if (sprite != null) {
      cx.value = sprite.x;
      cy.value = sprite.y;
      cw.value = sprite.w;
      ch.value = sprite.h;
    } else {
      cx.value = "";
      cy.value = "";
      cw.value = "";
      ch.value = "";
    }
  };
  
  this.update = () => {
    if (div.activeSprite == null) return;
    var spriteUpdate = new Sprite(cx.value, cy.value, cw.value, ch.value);
    div.sprites.forEach((sprite) => {
      if (sprite == div.activeSprite) {
        sprite.update(spriteUpdate.toList());
      }
    });
    scontext.clearRect.apply(scontext, div.activeSprite.toList());
    div.activeSprite.update(spriteUpdate.toList());
    redraw();
  };
};
