
varying vec3 vNormal;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

void main() {
  vec3 baseColour = vec3(0.5);
  vec3 lighting = vec3(0.0);
  vec3 normal = normalize(vNormal); // re normalized

  // Ambient
  vec3 ambient = vec3(0.5);

  // Hemi light        
  vec3 skyColour = vec3(0.0, 0.3, 0.6);
  vec3 groundColour = vec3(0.6, 0.3, 0.1);

  float hemiMix = remap(normal.y, -1.0, 1.0, 0.0, 1.0);
  vec3 hemi = mix(groundColour, skyColour, hemiMix);

  // diffuse lighting
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0)); // the point in which the light comes from
  vec3 lightColour = vec3(1.0, 1.0, 0.9);
  float dp = max(0.0, dot(lightDir, normal)); // max of dot product so there or no negative numbers

  vec3 diffuse = dp * lightColour;


  lighting = ambient * 0.0 + hemi * 0.0 + diffuse;

  vec3 colour = baseColour * lighting;

  gl_FragColor = vec4(colour, 1.0);
}