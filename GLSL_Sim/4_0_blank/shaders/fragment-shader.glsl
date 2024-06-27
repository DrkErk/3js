
varying vec2 vUvs;

uniform vec2 resolution;

vec3 red = vec3(1.0, 0.0, 0.0);
vec3 blue = vec3(0.0, 0.0, 1.0);
vec3 white = vec3(1.0, 1.0, 1.0);
vec3 black = vec3(0.0, 0.0, 0.0);
vec3 yellow = vec3(1.0, 1.0, 0.0);

//--------------------------------------------------------------------------------------------------------------------------------
// MIN MAX STEP SMOOTH STEP
//--------------------------------------------------------------------------------------------------------------------------------
// void main() {
//   vec3 colour = vec3(0.0);

//   //colour = vec3(step(0.25, vUvs.x));             step function at 25% 
//   //colour = mix(red, blue, vUvs.x);               Mix color
//   //colour = vec3(vUvs.x);                         bw color scale on x. more gray
//   //colour = vec3(smoothstep(0.0, 1.0, vUvs.x));         similar bw color scale to above but more black and white on edges
//   //colour = mix(red, blue, smoothstep(0.0, 1.0 , vUvs.x));       combo of above

//   float value1 = vUvs.x;
//   float value2 = smoothstep(0.0, 1.0, vUvs.x);

//   float line = smoothstep(0.0, 0.005, abs(vUvs.y  - 0.5)); //makes a line appear half way
//   float linearLine = smoothstep(0.0, 0.0075, abs(vUvs.y  - mix(0.5, 1.0, value1))); // linear line for data on upper half
//   float smoothLine = smoothstep(0.0, 0.0075, abs(vUvs.y  - mix(0.0, 0.5, value2))); // smooth step line for below

//   if(vUvs.y > 0.5){          // THE COLORS APPEAR ABOVE AND BELOW THE 50% MARK
//     colour = mix(red, blue, vUvs.x);
//   }else{
//     colour = mix(red, blue, smoothstep(0.0, 1.0, vUvs.x)); 
//   }

//   colour = mix(white, colour, line); // add the line over the gradient in the back
//   colour = mix(white, colour, linearLine); // add linear line
//   colour = mix(white, colour, smoothLine); // add smooth line

//   gl_FragColor = vec4(colour, 1.0);
// }
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
// FRACT AND OTHERS
//--------------------------------------------------------------------------------------------------------------------------------
void main() {
  vec3 colour = vec3(0.0);

  vec2 center = vUvs - 0.5; // subtracts 0.5 from all vec components. so x -0.5 and y -0.5, putting 0,0 at the center of the screen

  vec2 cell = fract(center * resolution / 100.0); // allows for a grid like effect. Now making it resolution independent and setting it to 100px 
  cell = abs(cell - 0.5);         // distance from center of cell
  float distanceToCell = 1.0 - 2.0 * max(cell.x, cell.y); // max val on x and y. Mul by 2 to increase range from 0-0.5 to 0-1. and inverse

  float cellLine = smoothstep(0.0, 0.05, distanceToCell); // Only show the edges of the square

  colour = mix(black, colour, cellLine);

  gl_FragColor = vec4(colour, 1.0);
}
//--------------------------------------------------------------------------------------------------------------------------------









