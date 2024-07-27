
varying vec2 vUvs;
uniform vec2 resolution;
uniform float time;


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

vec3 drawGrid(vec3 colour, vec3 lineColour, float cellSpacing, float lineWidth) {
  vec2 center = vUvs - 0.5;
  vec2 cellPosition = abs(fract(center * resolution / vec2(cellSpacing)) - 0.5);
  float distToEdge = (0.5 - max(cellPosition.x, cellPosition.y)) * cellSpacing;
  float lines = smoothstep(0.0, lineWidth, distToEdge);

  colour = mix(lineColour, colour, lines);

  return colour;
}

vec3 backgroundColor() {
  float distFromCenter = length(abs(vUvs));
  
  float vignette = 1.0 - distFromCenter;
  vignette = smoothstep(0.0, 0.7, vignette);
  vignette = remap(vignette, 0.0, 1.0, 0.3, 1.0);

  return vec3(vignette);
}

float sdfLine(vec2 p, vec2 a, vec2 b)
{
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa,ba) / dot(ba, ba), 0.0, 1.0);

  return length(pa - ba * h);
}

float sdfCircle(vec2 p, float r)
{
  return length(p) - r;
}

float sdfBox(vec2 p, vec2 b)
{
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdfHexagon( in vec2 p, in float r)
{
  const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
  p = abs(p);
  p -= 2.0 * min(dot(k.xy, p), 0.0) * k.xy;
  p -= vec2(clamp(p.x, -k.z * r, k.z * r), r);
  return length(p) * sign(p.y);
}

mat2 rotate2D(float angle)
{
  float s = sin(angle);
  float c = cos(angle);

  return mat2(c, -s, s, c);
  //ROTATION HAS TO BE APPLIED BACKWARDS AND IN THE REVERSE ORDER
  //so move then rotate would be offset then spin
  // unlike in the vertex shader which would be spin then offset
}


void main() {
  vec2 pixelCoords = (vUvs - 0.5) * resolution; // to work in pixel coords
  
  vec3 colour = backgroundColor(0.0);
  colour = drawGrid(colour, vec3(0.5), 10.0, 1.0);
  colour = drawGrid(colour, vec3(0.0), 100.0, 2.0);

 
  float d = sdfCircle(pixelCoords, 100.0);
  colour = mix(RED * 0.5, colour, smoothstep(-1.0, 1.0, d)); // circle
  colour = mix(RED, colour, smoothstep(-0.5, 0.0, d)); // outline

  //float d = sdfLine(pixelCoords, vec2(-100.0, -50.0), vec2(200.0, -75.0));

  // REMOVED FOR ANTIALIASING/ SHADING
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // vec2 pos = pixelCoords - vec2(200.0, 300.0); // pos to move to. 
  // pos *= rotate2D(time * 0.25); //rotate
  // float d = sdfBox(pos, vec2(200.0, 50.0));
  // colour = mix(RED, colour, step(0.0, d)); // step(0.0, d); for the circle // step(5.0, d)); for the line thickness

  gl_FragColor = vec4(colour, 1.0);
}