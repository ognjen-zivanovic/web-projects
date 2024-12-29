let width = 800;
let height = 800;
let grid = [];

let myShader;

function preload() {
  myShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(width, height, WEBGL);
  
  pixelDensity(1);
  noSmooth();
  background(0);
  stroke(255);
  
  shader(myShader);
  myShader.setUniform("normalRes", [1.0/width, 1.0/height]);
}

function update() {
  /*
   for (let i = hei - 2; i >= 0; i--) {
    for (let j = 0; j < grid_size; j++)  {
      if (grid[i][j] == 1) {
        if (grid[i + 1][j] == 0) {
          grid[i + 1][j] = 1;
          grid[i][j] = 0;
        }
        else if (grid[i + 1][j-1] == 0) {
          grid[i + 1][j-1] = 1;
          grid[i][j] = 0;
        }
         else if (grid[i + 1][j+1] == 0) {
          grid[i + 1][j+1] = 1;
          grid[i][j] = 0;
        }
    
      }
    }
   }
   */
}


function draw() {
  if(mouseIsPressed) {
    strokeWeight(20);
    line(
      pmouseX-width/2,
      pmouseY-height/2,
      mouseX-width/2,
      mouseY-height/2
    );
  }  
  myShader.setUniform('tex', get());
  
  rect(-width/2,-height/2,width,height);
}