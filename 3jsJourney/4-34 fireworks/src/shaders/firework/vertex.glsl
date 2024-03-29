uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

attribute float aSize;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax)
{
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main()
{

vec3 newPosition = position;

//exploding the progress\
float explodingProgress = remap(uProgress, 0.0, 0.1, 0.0, 1.0); // remap the input function to work as we want it.
explodingProgress = clamp(explodingProgress, 0.0, 1.0); // keep it from zero to 1
explodingProgress = 1.0 - pow(1.0 - explodingProgress, 3.0); // 1-(1-x)^a makes a fast growth that decays and caps at 1
newPosition *= explodingProgress;

//Falling
float fallingProgress = remap(uProgress, 0.1, 1.0, 0.0, 1.0);
fallingProgress = clamp(fallingProgress, 0.0, 1.0);
fallingProgress = 1.0 - pow(1.0 - fallingProgress, 3.0);
newPosition.y -= fallingProgress * 0.2;

//scaling
float sizeOpeningProgress = remap(uProgress, 0.0, 0.125, 0.0, 1.0);
float sizeClosingProgress = remap(uProgress, 0.125, 1.0, 1.0, 0.0);
float sizeProgress = min(sizeOpeningProgress, sizeClosingProgress);
sizeProgress = clamp(sizeProgress, 0.0, 1.0);

//twinkling
float twinklingProgress = remap(uProgress, 0.2, 0.8, 0.0, 1.0);
twinklingProgress = clamp(twinklingProgress, 0.0, 1.0);
float sizeTwinkling = sin(uProgress * 30.0) * 0.5 + 0.5;


//final position
vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
vec4 viewPosition = viewMatrix * modelPosition;

gl_Position = projectionMatrix * viewPosition;
// One line version of above ( gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); )

//final size
gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling; // modern builds make it so that it only needs to resize y when it gets smaller not x
gl_PointSize *= 1.0 / - viewPosition.z; // makes the particles grow and shrink based on how far they are
//Dont forget, pixel ratio will affect the size

}

