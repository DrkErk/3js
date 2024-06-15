uniform vec3 uColorWaterDeep;
uniform vec3 uColorWaterSurface;
uniform vec3 uColorSand; 
uniform vec3 uColorGrass;
uniform vec3 uColorSnow;
uniform vec3 uColorRock;

varying vec3 vPosition;
varying float vUpDot;

#include ../includes/simplexNoise2d.glsl

void main()
{

//color
vec3 color = vec3(1.0);

//water
float surfaceWaterMix = smoothstep(-1.0, -0.1, vPosition.y);
color = mix(uColorWaterDeep, uColorWaterSurface, surfaceWaterMix);

// sand
float sandmix = step(-0.1, vPosition.y);
color = mix( color, uColorSand, sandmix);

// grass
float grassmix = step(-0.06, vPosition.y);
color = mix( color, uColorGrass, grassmix);

//rock
float rockmix = vUpDot;
rockmix = 1.0 - step(0.8, rockmix); // make it so it happens on the almost vertical angles
rockmix *=  step(-0.06, vPosition.y); // make it so that the rock can only happen above the grass mix layer
color = mix(color, uColorRock, rockmix);

// snow
float snowThreshold = 0.45;
snowThreshold += simplexNoise2d(vPosition.xz * 15.0)* 0.1;
float snowmix = step(snowThreshold, vPosition.y);
color = mix( color, uColorSnow, snowmix);


// final color
csm_DiffuseColor = vec4(color, 1.0);

    
}



