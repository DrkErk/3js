
varying vec2 vUv;

uniform sampler2D diffuse;
uniform sampler2D overlay;

void main(void) {
  // vec4 overlayTexture = texture2D(overlay, vUv);

  vec2 uvs = vUv * 2.0; //without the repeat, it will just copy the edge pixel endlessly.
  vec4 sampleDiffuse = texture2D(diffuse, vUv);



}