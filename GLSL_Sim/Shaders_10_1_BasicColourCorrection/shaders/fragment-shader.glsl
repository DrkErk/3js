
varying vec2 vUvs;
uniform vec2 resolution;
uniform float time;
uniform sampler2D diffuse1;
uniform sampler2D diffuse2;
uniform sampler2D vignette;


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

vec3 saturate(vec3 x) {
  return clamp(x, vec3(0.0), vec3(1.0));
}

float saturate(float x) {
  return clamp(x, 0.0, 1.0);
}

float ColourDistance(vec3 c1, vec3 c2) {
  float rm = (c1.x + c2.x) * 0.5 * 256.0;
  vec3 d = (c1 - c2) * 256.0;

  float r = (2.0 + rm / 256.0) * d.x * d.x;
  float g = 4.0 * d.y * d.y;
  float b = (2.0 + (255.0 - rm) / 256.0) * d.z * d.z;
  return sqrt(r + g + b) / 256.0;
}

void main() {
  vec2 coords = fract(vUvs * vec2(2.0, 1.0)); // dupes the texture side by side. Fract sets it up to deal with the same numbers on both sides
  coords.x = remap(coords.x, 0.0, 1.0, 0.25, 0.75); // show the center fo the photo so that the photo isnt as distorted
  vec3 colour = texture2D(diffuse2, coords).xyz; // get texture and apply on the coords

  if (vUvs.x > 0.5) {
    // the color on the right gets the after effects.


    // Tinting
    vec3 tintColour = vec3(1.0, 0.5, 0.5); // set tint colors' color
    // colour *= tintColour; // mul color to final color to adj by the mul

    // Brightness
    float brightnessAmount = 0.1; // a brightness add
    // colour += brightnessAmount; // add brightness here

    // Saturation
    
    float luminance = dot(colour, vec3(0.2126, 0.7152, 0.0722)); // With article on relative luminence, the numbers are adjsted
                                                                // dot(colour, vec3(1.0 / 3.0)) ; unbalanced saturation
    float saturationAmount = 0.0; // 0.0, is gray scale // 1.0 is normal // 2.0 is saturated
    // colour = mix(vec3(luminance), colour, saturationAmount);



    // Contrast
    float contrastAmount = 1.0;
    float midpoint = 0.5;
    // colour = saturate((colour - midpoint) * contrastAmount + midpoint); // This is a remap of range of 0.0, 1.0 now to -0.5, 0.5
                // So saturate is used to set the range from 0 - 1 like a specific clamp

    // colour = smoothstep(vec3(0.0), vec3(1.0), colour); // any thing that pushes color away/towards the mid point would be a contrast
                // This  makes middle steeper and pushes the outer values out towards zero and one
                // The issue is that there is no control here

    vec3 sg = sign(colour - midpoint);

    // Crafted with demos*
    //
    //
    // colour = sg * pow(
    //     abs(colour - midpoint) * 2.0,
    //     vec3(1.0 / contrastAmount)) * 0.5 + midpoint;

    // adding the matrix color to the image
    // The Matrix
    // colour = pow(colour, vec3(1.5, 0.8, 1.5));


    //
    //
    // ON WIKI as color spaces and perceptive differences *****************
    //
    //

    // Colour Boost
    // (thinking of a color as if it was in 3d space. and getting the)
    //
    vec3 refColour = vec3(0.72, 0.25, 0.25);              // mainly red color to be highlighted
    // float colourWeight = 1.0 - distance(colour, refColour);  // a number that is 1 - distance from color to the ref color
                                                            // Distance isnt the best measurement in this case
    // colourWeight = smoothstep(0.45, 1.0, colourWeight);  //(basically a contrast) Drop the lower end and pick up the higher end
    
    float colourWeight = dot(normalize(colour), normalize(refColour)); // The logic is based on the xyz being rgb. so the distance
    colourWeight = pow(colourWeight, 32.0);                            // is less effective to be compared vs angle, so dot vs distance
    // colour = mix(vec3(luminance), colour, colourWeight);   // Now, mix between the grayscale of the img and the full color by the
                                                          // weight of it.



    vec2 vignetteCoords = fract(vUvs * vec2(2.0, 1.0));  // fract coords is like x - floor(x) so towards edge from center is reset
    // vec3 vignetteAmount = texture2D(vignette, vignetteCoords).xyz;

    float v1 = smoothstep(0.5, 0.2, abs(vignetteCoords.x - 0.5)); //horz vin
    float v2 = smoothstep(0.5, 0.2, abs(vignetteCoords.y - 0.5)); // verti vin
    float vignetteAmount = v1 * v2;                               // combo vin
    vignetteAmount = pow(vignetteAmount, 0.25);                   // vin intensity
    vignetteAmount = remap(vignetteAmount, 0.0, 1.0, 0.5, 1.0);   // add vin

    // colour *= vignetteAmount;




    // Pixelation
    vec2 dims = vec2(128.0, 128.0);
    vec2 texUV = floor(coords * dims) / dims;
    vec3 pixelated = texture2D(diffuse2, texUV).xyz;
    // colour = pixelated;




    // Ripples
    // vec2 pushedCoords = coords;
    // float pushedSign = sign(pushedCoords.y - 0.5);
    // pushedCoords.y = pushedSign * pow(
    //     abs(pushedCoords.y - 0.5) * 2.0,
    //     0.7) * 0.5 + 0.5;
    // colour = texture2D(diffuse2, pushedCoords).xyz;


 

    float distToCenter = length(coords - 0.5);
    float d = sin(distToCenter * 50.0 - time * 2.0);
    vec2 dir = normalize(coords - 0.5);
    vec2 rippleCoords = coords + d * dir * 0.05;
    colour = texture2D(diffuse2, rippleCoords).xyz;
  }

  gl_FragColor = vec4(colour, 1.0);
}




