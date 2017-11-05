export function sakura() {
    let canvas = document.getElementById('sakura');
    let canvasCtx;
    let width;
    let height;
    let children;

    let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    initSakura();

    function initSakura(){
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        canvasCtx = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;
        children = [];
        cancelAnimationFrame(window.sakuraReq);
        anim();
    }

    function rendering() {
        clear();

        let limit = children.length;
        for(let i = limit-1 ; i >= 0 ; i--){
            canvasCtx.save();
            let child = children[i];
            if(child.draw(canvasCtx)){
                removeChild(i);
            }
            canvasCtx.restore();
        }
    }

    function clear() {
        canvasCtx.clearRect(0,0,width,height);
    }

    function addChild(child) {
        children.push(child);
    }

    function removeChild(num) {
        children.splice(num, 1);
    }

    function anim() {
        if (Math.random() > 0.92 && children.length < 100)addSakura(1, 1, 1, width, 1);

        rendering();
        window.sakuraReq = requestAnimationFrame(anim);
    }

    function random(n, pOrm) {
        if (pOrm) {
            const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            return (Math.floor(Math.random()*n)+1) * plusOrMinus;
        } else {
            return Math.floor(Math.random()*n)+1;
        }
    }

    function addSakura(num,x1,y1,x2,y2) {
        for(let i = 0 ; i < num ; i++){
            let x_pos = Math.floor(Math.random()*(x2-x1)) + x1;
            let y_pos = Math.floor(Math.random()*(y2-y1)) + y1;
            addChild(new Sakura(
                x_pos,
                y_pos,
                Math.random() + 0.1,
                {x:random(360), y:random(360), z:random(360)},
                {x:random(10), y:random(10), z:random(10)},
                random(2, true)
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

            if(this.x_pos > width) return true;
            return this.y_pos > height;
        };
    }
}