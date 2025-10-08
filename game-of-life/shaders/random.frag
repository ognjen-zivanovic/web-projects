
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 pos;

uniform sampler2D filter_background;
uniform vec2 filter_res;
uniform float time;

float rand(vec2 co){
    return fract(sin(dot(co * time, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float r = floor(rand(pos) + 0.5);
  vec4 col = texture2D(filter_background, pos);
  if (col.r >= 0.19 && col.r <= 0.21) {
    gl_FragColor = vec4(r, r, r, 1.0);
  } else {
    gl_FragColor = col;
  }
}


