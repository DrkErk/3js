
varying vec3 vNormal;
varying vec3 vPosition;
varying vec4 vColour;


// removed for varying in depth
//uniform float time;

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
  
  vec3 localSpacePosition = position;

  //-- REMOVED FOR VARYING IN MORE DEPTH
  //==
  // // THE RESULTS ARE NON COMMUNITATIVE, ORDER MATTERS!!!!!!
  // // Everything starts at the origin!!!!!
  // //
  // vec3 localSpacePosition = position; // position is brought in from the obj itself
  // //localSpacePosition.z += sin(time); // makes the obj move back and forth on the z
  // // We then need the remap func for scaling
  // //localSpacePosition.xz *= remap(sin(time), -1.0, 1.0, 0.5, 1.5);
  // // ROTATION
  // localSpacePosition = rotateY(time) * localSpacePosition; 

  float t = sin(localSpacePosition.y * 20.0 + time * 10.0);
  t = remap(t, -1.0, 1.0, 0.0, 0.2); // remaps the function so it doesnt go negative
  localSpacePosition += normal * t; // looks better but is pitched
  // localSpacePosition += t; // makes tubes

  gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0); // vec4 because w coord is like a scaling value
  // 1 would be positional coords and 0 would be coord vectors
  vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vColour = mix(vec3(0.0, 0.0, 0.5),  vec3(0.1, 0.5, 0.8), smoothstep(0.0, 0.2, t));

  //----------------------------- RM for warp sphere
  //-----------------------------
  // vec3 red = vec3(1.0, 0.0, 0.0);
  // vec3 blue = vec3(0.0, 0.0, 1.0);
  //
  // float t = remap(vPosition.x, -0.5, 0.5, 0.0, 1.0); // since screen goes from -0.5 to 0.5, a color remap is need to go from 0 to 1
  // t = pow(t, 2.0);  // THIS ADJUSTMENT RAN FOR EVERY PIXEL ON THE UPPER HALF OF THE SCREEN VS 
  //                   // BUT BECAUSE A VARYING IS RAN ACROSS EACH TRIANGLE, NOTHING IS CHANGED. IE a square is 2 TRIANGLES
  // // If you increase the tesalation, you get more triangles and thus would make this look better.
  //
  // vColour = vec4(mix(red, blue, t), t);
}