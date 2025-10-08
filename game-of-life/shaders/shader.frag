
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 pos;

uniform sampler2D filter_background;
uniform vec2 filter_res;

vec2 wrap(vec2 v) {
    return mod(v, 1.0);
}

void main() {
  vec2 normal_res = vec2(1.0/filter_res.x, 1.0/filter_res.y);
  vec4 col = texture2D(filter_background, pos);

  // make all positions wrap around the screen
  vec4 col_levo = texture2D(filter_background, wrap(pos + vec2(-normal_res.x, 0)));
  vec4 col_desno = texture2D(filter_background, wrap(pos + vec2(normal_res.x, 0)));
  vec4 col_gore = texture2D(filter_background, wrap(pos + vec2(0, -normal_res.y)));
  vec4 col_dole = texture2D(filter_background, wrap(pos + vec2(0, normal_res.y)));

  vec4 col_levo_gore = texture2D(filter_background, wrap(pos + vec2(-normal_res.x, -normal_res.y)));
  vec4 col_levo_dole = texture2D(filter_background, wrap(pos + vec2(-normal_res.x, normal_res.y)));
  vec4 col_desno_gore = texture2D(filter_background, wrap(pos + vec2(normal_res.x, -normal_res.y)));
  vec4 col_desno_dole = texture2D(filter_background, wrap(pos + vec2(normal_res.x, normal_res.y)));

  float levo = col_levo.r;
  float desno = col_desno.r;
  float gore = col_gore.r;
  float dole = col_dole.r;
  
  float levo_gore = col_levo_gore.r;
  float levo_dole = col_levo_dole.r;
  float desno_gore = col_desno_gore.r;
  float desno_dole = col_desno_dole.r;


  float sum = levo + desno + gore + dole + levo_gore + levo_dole + desno_gore + desno_dole;
  bool alive = col.r == 1.0;

  if (alive) {
    if (sum < 2.0) {
      alive = false;
    }
    if (sum > 3.0) {
      alive = false;
    }
  }

  if (!alive) {
    if (sum == 3.0) {
      alive = true;
    }
  }

  if (alive) {
    col = vec4(1.0, 1.0, 1.0, 1.0);
  }
  else {
    col = vec4(0.0, 0.0, 0.0, 1.0);
  }
  gl_FragColor = col;
}


