export function sakura() {
  let SakuraCanvas;

  window.requestAnimationFrame = function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000);
      }
  }();

  initSakura();

  /* canvas object */
  function initSakura(){
    SakuraCanvas = new CanvasController('sakura');
    // setInterval(anim, 50);
    window.cancelAnimationFrame(anim);
    anim();
  }
  function anim() {
    if (Math.random() > 0.92 && SakuraCanvas.children.length < 100)addSakura(1, 1, 1, SakuraCanvas.width, 1);

    SakuraCanvas.rendering();
    window.requestAnimationFrame(anim);
  }
  function CanvasController(id) {
    let canvas = document.getElementById(id);
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    this.canvasCtx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.children = [];

    this.rendering = function(){
      this.clear();

      let limit = this.children.length;
      for(let i = limit-1 ; i >= 0 ; i--){
        this.canvasCtx.save();
        let child = this.children[i];
        if(child.draw(this.canvasCtx)){
          this.removeChild(i);
        }
        this.canvasCtx.restore();
      }
    };
    this.clear = function(){
      this.canvasCtx.clearRect(0,0,this.width,this.height);
    };
    this.addChild = function(child){
      this.children.push(child);
    };
    this.removeChild = function(num){
      this.children.splice(num, 1);
    };
  }

  function random(n) {
    return Math.floor(Math.random()*n)+1;
  }

  function addSakura(num,x1,y1,x2,y2) {
    for(let i = 0 ; i < num ; i++){
      let x_pos = Math.floor(Math.random()*(x2-x1)) + x1;
      let y_pos = Math.floor(Math.random()*(y2-y1)) + y1;
      SakuraCanvas.addChild(new Sakura(
        x_pos,
        y_pos,
        Math.random() + 0.1,
        {x:random(360), y:random(360), z:random(360)},
        {x:random(10), y:random(10), z:random(10)},
        random(3)
      ));
    }
  }
  function Sakura(x, y, scale, direction, rotate, wind) {
    this.x_pos     = x;
    this.y_pos     = y;
    this.scale     = scale;
    this.direction = direction;
    this.rotate    = rotate;
    this.wind      = wind;
    this.gr        = 6;
    this.length    = 10;
    this.phase     = 0;

    this.draw = function(ctx) {
      ctx.beginPath();
      ctx.translate(this.x_pos, this.y_pos);

      ctx.rotate(this.direction.y / 180 * Math.PI);
      ctx.scale(this.scale, this.scale);

      let grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.length);
      grad.addColorStop(0, 'rgba(255,200,200,1)');
      grad.addColorStop(1, 'rgba(255,200,200,0.6)');
      ctx.fillStyle = grad;
      ctx.shadowColor = ('rgb(255,255,255)');
      ctx.shadowBlur = 10;

      let x_rad = Math.cos(this.direction.x*Math.PI/180);
      let z_rad = Math.cos(this.direction.z*Math.PI/180);
      ctx.moveTo(-6*z_rad,-10*x_rad);
      ctx.bezierCurveTo( -10*z_rad,    0,         -5*z_rad,   10*x_rad,   0,         10*x_rad );
      ctx.bezierCurveTo(   5*z_rad,    10*x_rad,  10*z_rad,    0,         6*z_rad,  -10*x_rad );
      ctx.bezierCurveTo(   0,         -10*x_rad,   0,         -7*x_rad,   0,         -5*x_rad );
      ctx.bezierCurveTo(   0,         -7*x_rad,    0,         -10*x_rad, -6*z_rad,  -10*x_rad );
      ctx.fill();

      return this.moveSakura();
    };
    this.moveSakura = function() {
      if(this.phase === 2){
        if(this.gr > -3 ) this.gr += this.gr/10;
      }

      this.y_pos = this.y_pos + ((this.gr*this.scale) / 4);
      this.x_pos = this.x_pos + (this.wind / 4);
      this.direction.x += (this.rotate.x / 2);
      this.direction.y += (this.rotate.y / 2);
      this.direction.z += (this.rotate.z / 2);

      if(this.x_pos > SakuraCanvas.width) return true;
      return this.y_pos > SakuraCanvas.height;
    };
  }

  return this;
}