
varying vec2 vUv;
varying vec3 vColor;

uniform vec4 color1;
uniform vec4 color2;

void main() {
gl_FragColor = vec4(vColor, 1.0);

//  2 color mix vertically with the colors
/*  gl_FragColor = mix(
    color1,
    color2,
    vUv.x
  );
*/
}