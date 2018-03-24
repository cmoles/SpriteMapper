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
  const cd = document.getElementById('cd');

  this.init = () => {
    cu.onclick = this.updateButton;
    cd.onclick = this.deleteButton;
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

  this.updateButton = () => {
    if (div.activeSprite === null) {
      return;
    }
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

  this.deleteButton = () => {
    if (div.activeSprite === null) {
      return;
    }
    div.sprites.forEach((sprite, index, array) => {
      if (sprite == div.activeSprite) {
        array.splice(index, 1);
      }
    });
    scontext.clearRect.apply(scontext, div.activeSprite.toList());
    div.activeSprite = null;
    this.view(null);
    redraw();
  };
};

Widgets.loadWidget = function (app) {
  const div = app.div;
  const fa = document.getElementById('fa');
  const fn = document.getElementById('fn');
  const fd = document.getElementById('fd');

  this.init = () => {
    fd.onclick = this.downloadButton;
  };

  this.downloadButton = () => {
    if (div.sprites.length === 0) {
      return;
    }
    const filename = fn.value;
    const type = "application/octet-stream";
    const blob = new Blob([div.sprites.toCSV()], {type: type});
    const url = window.URL.createObjectURL(blob);
    fa.href = url;
    fa.download = filename;
    fa.click();
    window.URL.revokeObjectURL(url);
  };
};
