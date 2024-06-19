
attribute vec3 devColors;

varying vec2 vUv;
varying vec3 vColor;

void main() {	
  vec4 localPosition = vec4(position, 1.0);

  gl_Position = projectionMatrix * modelViewMatrix * localPosition;

  //varyings
  vUv = uv;
  vColor = devColors;

}