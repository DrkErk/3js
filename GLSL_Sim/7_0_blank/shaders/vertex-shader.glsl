
varying vec3 vNormal;
varying vec3 vPosition;

uniform float time;


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

//based on linear algebra for rotation of an obj requires use of a 3dmatrix
mat3 rotateY(float radians)
{
  float s = sin(radians);
  float c = cos(radians);

  return mat3(
    c, 0.0, s,
    0.0, 1.0, 0.0
    -s, 0.0, c
  );
}

void main() {	
  // THE RESULTS ARE NON COMMUNITATIVE, ORDER MATTERS!!!!!!
  // Everything starts at the origin!!!!!
  //
  vec3 localSpacePosition = position; // position is brought in from the obj itself
  //localSpacePosition.z += sin(time); // makes the obj move back and forth on the z
  // We then need the remap func for scaling
  //localSpacePosition.xz *= remap(sin(time), -1.0, 1.0, 0.5, 1.5);
  // ROTATION
  localSpacePosition = rotateY(time) * localSpacePosition; 

  gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0); // vec4 because w coord is like a scaling value
  // 1 would be positional coords and 0 would be coord vectors
  vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
  vPosition = (modelMatrix * vec4(localSpacePosition, 1.0)).xyz;
}