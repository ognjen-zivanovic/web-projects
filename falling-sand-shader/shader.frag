#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D filter_background;
uniform vec2 filter_res;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  
  float pos = texture2D(filter_background, uv).r;
  
  float pos_down        = texture2D(filter_background, uv + vec2(0,filter_res.y)).r;
  float pos_down_left   = texture2D(filter_background, uv + vec2(-filter_res.x,filter_res.y)).r;
  float pos_down_right  = texture2D(filter_background, uv + vec2(filter_res.x,filter_res.y)).r;
  
  float pos_up          = texture2D(filter_background, uv + vec2(0,-filter_res.y)).r;
  float pos_up_left     = texture2D(filter_background, uv + vec2(-filter_res.x,-filter_res.y)).r;
  float pos_up_right    = texture2D(filter_background, uv + vec2(filter_res.x,-filter_res.y)).r;
  
  float pos_left        = texture2D(filter_background, uv + vec2(-filter_res.x, 0)).r;
  float pos_right       = texture2D(filter_background, uv + vec2(filter_res.x, 0)).r;
  float pos_left_left   = texture2D(filter_background, uv + vec2(-2.0 * filter_res.x, 0)).r;
  float pos_right_right = texture2D(filter_background, uv + vec2(2.0 * filter_res.x, 0)).r;
  float a = pos;
  if (pos == 0.0 && pos_up == 1.0) {
    a = 1.0;
  }
  if (pos == 0.0 && pos_right == 1.0 && pos_up_right == 1.0) {
    a = 1.0;
  }
  if (pos == 0.0 && pos_left == 1.0 && pos_up_left == 1.0 && pos_left_left == 1.0) {
    a = 1.0;
  }
  if (pos == 1.0 && (pos_down == 0.0 || pos_down_left == 0.0 || pos_down_right == 0.0)) {
    if (uv.y + filter_res.y < 1.0)
      a = 0.0;
  }

  
  gl_FragColor = vec4(a, a, pos_up, 1.0);
}