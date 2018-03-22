var app = {};

app.init = function() {
  console.debug('App Initializing...');

  console.debug('Adding Elements...');
  app.div = {width:0, height:0};
  app.div.appDiv = document.getElementById('SpriteViewerApp');
  app.can = {};
  app.can.canvasBackground = document.getElementById('canvasBackground');
  app.can.canvasSprites = document.getElementById('canvasSprites');
  app.can.canvasInterface = document.getElementById('canvasInterface');
  app.con = {};
  app.con.contextBackground = app.can.canvasBackground.getContext('2d');
  app.con.contextSprites = app.can.canvasSprites.getContext('2d');
  app.con.contextInterface = app.can.canvasInterface.getContext('2d');

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
  const bcontext = app.con.contextBackground;

  bcontext.drawImage(app.img, 0, 0, width, height, 
                              0, 0, width, height);
};
