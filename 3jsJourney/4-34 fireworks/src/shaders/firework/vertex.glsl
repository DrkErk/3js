uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

attribute float aSize;
attribute float aTimeMultiplier;

#include ../includes/remap.glsl

void main()
{
float progress = uProgress * aTimeMultiplier;
vec3 newPosition = position;

//exploding the progress\
float explodingProgress = remap(progress, 0.0, 0.1, 0.0, 1.0); // remap the input function to work as we want it.
explodingProgress = clamp(explodingProgress, 0.0, 1.0); // keep it from zero to 1
explodingProgress = 1.0 - pow(1.0 - explodingProgress, 3.0); // 1-(1-x)^a makes a fast growth that decays and caps at 1
newPosition *= explodingProgress;

//Falling
float fallingProgress = remap(progress, 0.1, 1.0, 0.0, 1.0);
fallingProgress = clamp(fallingProgress, 0.0, 1.0);
fallingProgress = 1.0 - pow(1.0 - fallingProgress, 3.0);
newPosition.y -= fallingProgress * 0.2;

//scaling
float sizeOpeningProgress = remap(progress, 0.0, 0.125, 0.0, 1.0);
float sizeClosingProgress = remap(progress, 0.125, 1.0, 1.0, 0.0);
float sizeProgress = min(sizeOpeningProgress, sizeClosingProgress);
sizeProgress = clamp(sizeProgress, 0.0, 1.0);

//twinkling
float twinklingProgress = remap(progress, 0.2, 0.8, 0.0, 1.0);
twinklingProgress = clamp(twinklingProgress, 0.0, 1.0);
float sizeTwinkling = sin(progress * 30.0) * 0.5 + 0.5;
//sizeTwinkling = sizeTwinkling * twinklingProgress; this would be wrong because when one is zero, they both are.
sizeTwinkling = 1.0 - sizeTwinkling * twinklingProgress;


//final position
vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
vec4 viewPosition = viewMatrix * modelPosition;

gl_Position = projectionMatrix * viewPosition;
// One line version of above ( gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); )

//final size
gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling; // modern builds make it so that it only needs to resize y when it gets smaller not x
gl_PointSize *= 1.0 / - viewPosition.z; // makes the particles grow and shrink based on how far they are
//Dont forget, pixel ratio will affect the size


// For a windows issue which is good to have in practice
// if the size is less then 1, it will always take up 1 pixel. so move it out of view
if (gl_PointSize < 1.0)
    gl_Position = vec4(0,0,0,9999.9);

}

