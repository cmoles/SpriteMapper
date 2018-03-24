var app = {};

app.init = function() {
  console.debug('App Initializing...');

  console.debug('Adding Elements...');
  app.div = {width:0, height:0, zoom: 3};
  app.div.appDiv = document.getElementById('SpriteViewerApp');
  app.div.sprites = new SpriteSet();
  app.div.activeSprite = null;
  app.div.styles = {off: "rgba(0,0,0,.6)",
                    on: "rgba(0,0,0,.2",
                    active: "rgba(255,0,0,.2"};
  app.can = {};
  app.can.canvasBackground = document.getElementById('canvasBackground');
  app.can.canvasSprites = document.getElementById('canvasSprites');
  app.can.canvasInterface = document.getElementById('canvasInterface');
  app.con = {};
  app.con.contextBackground = app.can.canvasBackground.getContext('2d');
  app.con.contextSprites = app.can.canvasSprites.getContext('2d');
  app.con.contextInterface = app.can.canvasInterface.getContext('2d');

  console.debug('Initializing Coordinate Widget...');
  app.wid = {};
  app.wid.coords = new Widgets.coordWidget(app);
  app.wid.coords.init();

  console.debug('Adding Sprite Map...');
  app.img = new Image();
  app.img.onload = app.redraw;
  app.img.src = "./data/theincrediblehulk.png";

  console.debug('Initializing Screen...');
  app.resizing = false;
  app.updateDimensions();
  window.onresize = (ev) => {
    if(!app.resizing) {
      app.updateDimensions();
    }
  };

  console.debug('Initializing Sprite Tool...');
  //app.tool = new Tools['drawSprite'](app.can, app.con, app.div, app.redraw);
  app.tool = new Tools['drawSprite'](app);

  console.debug('Adding Tool Events...');
  app.can.canvasInterface.addEventListener('mousemove', this.runTool, false);
  app.can.canvasInterface.addEventListener('mousedown', this.runTool, false);
  app.can.canvasInterface.addEventListener('mouseup', this.runTool, false);
  app.can.canvasInterface.addEventListener('wheel', this.runTool, false);
};

app.runTool = function (ev) {
  if (ev.offsetX || ev.offsetX == 0) { // Webkit
    ev._x = ev.offsetX;
    ev._y = ev.offsetY;
  } else if (ev.layerX || ev.layerX == 0) { // Gecko
    ev._x = ev.layerX;
    ev._y = ev.layerY;
  }
  app.tool[ev.type](ev);
};

app.updateDimensions = function() {
  if(app.resizing) return false;
  const width = window.innerWidth;
  const height = window.innerHeight;

  console.debug("Updating Dimensions...");
  app.resizing = true;
  app.div.width = width;
  app.div.height = height;
  app.div.appDiv.width = width;
  app.div.appDiv.height = height;
  app.can.canvasBackground.width = width;
  app.can.canvasBackground.height = height;
  app.can.canvasSprites.width = width;
  app.can.canvasSprites.height = height;
  app.can.canvasInterface.width = width;
  app.can.canvasInterface.height = height;
  app.redraw();
  app.resizing = false;
};

app.redraw = function() {
  const width = app.div.width;
  const height = app.div.height;
  const zoom = app.div.zoom;
  const sprites = app.div.sprites;
  const active = app.div.activeSprite;
  const bcontext = app.con.contextBackground;
  const scontext = app.con.contextSprites;

  bcontext.drawImage(app.img, 0, 0, width / zoom, height / zoom,
                              0, 0, width, height);
  scontext.clearRect(0, 0, width, height);
  scontext.fillStyle = app.div.styles.off;
  sprites.forEach((item) => {
    scontext.fillRect.apply(scontext, item.toList(zoom));
  });
  if (active !== null) {
    scontext.clearRect.apply(scontext, active.toList(zoom));
    scontext.fillStyle = app.div.styles.active;
    scontext.fillRect.apply(scontext, active.toList(zoom));
  }
};
