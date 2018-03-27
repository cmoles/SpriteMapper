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
  const cc = document.getElementById('cc');

  this.init = () => {
    cu.onclick = this.updateButton;
    cd.onclick = this.deleteButton;
    cc.onclick = this.clearButton;
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

  this.clearButton = () => {
    div.sprites.length = 0;
    div.activeSprite = null;
    this.view(null);
    redraw();
  };
};

Widgets.loadWidget = function (app) {
  const div = app.div;
  const redraw = app.redraw;
  const fa = document.getElementById('fa');
  const fi = document.getElementById('fi');
  const fn = document.getElementById('fn');
  const fd = document.getElementById('fd');
  const fu = document.getElementById('fu');
  const cx = document.getElementById('cx');
  const cy = document.getElementById('cy');
  const ch = document.getElementById('ch');
  const cw = document.getElementById('cw');

  this.init = () => {
    fi.onchange = this.handleFileImgSelect;
    fd.onclick = this.downloadButton;
    fu.onchange = this.handleFileMapSelect;
  };

  this.downloadButton = () => {
    if (div.sprites.length === 0) {
      return;
    }
    const filename = fn.value || "sprite_list.txt";
    const type = "application/octet-stream";
    const blob = new Blob([div.sprites.toCSV()], {type: type});
    const url = window.URL.createObjectURL(blob);
    fn.value = filename;
    fa.href = url;
    fa.download = filename;
    fa.click();
    window.URL.revokeObjectURL(url);
  };

  this.handleFileImgSelect = () => {
    const file = event.target.files[0];
    const reader = new FileReader()
    if (file === undefined) {
      return;
    }
    reader.onload = (ev) => {
      const f = ev.target.result;
      div.offx = 0;
      div.offy = 0;
      div.zoom = 3;
      app.img = new Image();
      app.img.onload = redraw;
      app.img.src = f;
    };
    reader.readAsDataURL(file);
    fi.value = null;
  };

  this.handleFileMapSelect = () => {
    const file = event.target.files[0];
    const reader = new FileReader()
    if (file === undefined) {
      return;
    }
    reader.onload = (ev) => {
      const f = ev.target.result;
      const lines = f.split(/\r\n|\n/);

      if (lines.length === 0) {
        return;
      }

      div.activeSprite = null;
      div.sprites.length = 0;
      cx.value = "";
      cy.value = "";
      cw.value = "";
      ch.value = "";

      lines.forEach((args) => {
        const a = args.split(", ");
        if (a.length !== 4) {
          return;
        }
        div.sprites.push(new Sprite(a[0], a[1], a[2], a[3]));
      });
      redraw();
    };
    reader.readAsText(file);
    fu.value = null;
  };
};
