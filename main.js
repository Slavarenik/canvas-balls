const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const canvasHeight = 300
const canvasWidth = 600

// mouse speed vars
let timeLive = 0
let totalLength = 0

let isWallCollided = false

// Physics
let gacc = 0.1

const mousePos = {
  x: 0,
  y: 0
}

canvas.addEventListener('mousemove', function(e){
  mousePos.x = e.clientX - canvas.getBoundingClientRect().x
  mousePos.y = e.clientY - canvas.getBoundingClientRect().y
})

class Circle{
  constructor(x, y, isMain, vx, vy, color){
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.isMain = isMain
    this.color = color
  }

  draw = () => {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.strokeStyle = '#333'
    ctx.arc(this.x, this.y, 20, Math.PI*2, false)
    ctx.fill()
    ctx.stroke()
  }

  update = () => {
    if(this.isMain){
      this.x = mousePos.x
      this.y = mousePos.y
    } else {
      this.y += this.vy
      this.x += this.vx

      if((this.y > canvasHeight - 20 && isWallCollided == false) || (this.y < 20 && isWallCollided == false)){
        isWallCollided = true
        this.vy *= -0.8

        setTimeout(()=>{
          isWallCollided = false
        }, 50)
      }
      if((this.x > canvasWidth - 20 && isWallCollided == false) || (this.x < 20 && isWallCollided == false)){
        isWallCollided = true
        this.vx *= -0.8

        setTimeout(()=>{
          isWallCollided = false
        }, 50)
      }
    }

    this.draw()
  }
}

let circle = new Circle(0, 0, true, 0, 0, '#FF6556')
let circle2 = new Circle(300, 150, false, 0, 0, '#0078E1')

function collide(el1, el2){
  let range = (Math.abs(el1.x - el2.x) + Math.abs(el1.y - el2.y));

  if(range < 50){
    if(el1.y > el2.y){
      el2.vy = -(el2.vy+3)
      el2.vy -= gacc
    } else {
      el2.vy = el2.vy+3
      el2.vy += gacc
    }

    if(el1.x > el2.x){
      el2.vx = -(el2.vx+3)
      el2.vx -= gacc
    } else {
      el2.vx = el2.vx+3
      el2.vx += gacc
    }
  }
}

function animate(){
    timeLive++
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    circle.update()
    circle2.update()

    collide(circle, circle2)

    if(timeLive < 100){

    }

}

animate()



// $(document).ready(function(){
//
//     var pix_ratio = window.devicePixelRatio || 1;
//     var canvas = document.getElementById('bubbles-canvas');
//     var canvas_width = document.body.clientWidth;
//     var canvas_height = 300;
//     var orangeCircle = false;
//
//     canvas.width = canvas_width * pix_ratio;
//     canvas.height = canvas_height * pix_ratio;
//
//     canvas.style.width = canvas_width + 'px';
//     canvas.style.height = canvas_height + 'px';
//
//     var ctx = canvas.getContext('2d'),
//         bubblesArray = [];
//
//     ctx.scale(pix_ratio,pix_ratio);
//
//     function Bubble(x, y, dx, dy, radius, stroke, orange){
//         this.x = x;
//         this.y = y;
//         this.dx = dx;
//         this.dy = dy;
//         this.radius = radius;
//         this.color = 'rgba(255,255,255, 0.5)';
//         this.stroke = stroke;
//         this.orange = orange;
//
//         this.draw = function(){
//             ctx.beginPath();
//             ctx.fillStyle = this.color;
//             ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
//
//             if(stroke){
//                 ctx.strokeStyle = '#fff';
//                 ctx.fillStyle = 'rgba(255,255,255, 0.1)';
//                 ctx.stroke();
//             } else {
//                 ctx.fill();
//             }
//
//             if (orange) {
//                 ctx.strokeStyle = '#ff7414';
//                 ctx.fillStyle = '#ff7414';
//                 ctx.fill();
//             }
//         };
//
//         this.update = function(){
//             if(this.x>canvas_width-this.radius || this.x-this.radius<0){
//                 this.dx = -this.dx;
//             }
//             if(this.y>canvas_height-this.radius || this.y-this.radius<0){
//                 this.dy = -this.dy;
//             }
//
//             this.x += this.dx;
//             this.y += this.dy;
//
//             this.draw();
//         }
//     }
//
//     for (var i = 0; i < 30; i++){
//         var x = Math.random()*(canvas_width-radius*2) + radius,
//             y = Math.random()*(canvas_height-radius*2) + radius,
//             dx = (Math.random() - 0.5)/3,
//             dy = (Math.random() - 0.5)/3,
//             radius = Math.random() * 4 + 1,
//             stroke = Math.random(),
//             orange = false;
//
//         if(stroke > 0.5){
//             stroke = true;
//         } else {
//             stroke = false;
//         }
//
//         if (orangeCircle == false ){
//             orangeCircle = true;
//             orange = true;
//         }
//
//         bubblesArray.push(new Bubble(x, y, dx, dy, radius, stroke, orange));
//     }
//
//     function animate(){
//         requestAnimationFrame(animate);
//         ctx.clearRect(0, 0, canvas_width, canvas_height);
//
//         for (var i = 0; i < bubblesArray.length; i++) {
//             bubblesArray[i].update();
//         }
//     }
//
//     animate();
//
//     $(window).resize(function() {
//         canvas.style.width = document.body.clientWidth;
//     });
//
// });
