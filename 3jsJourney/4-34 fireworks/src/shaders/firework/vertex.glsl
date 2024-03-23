uniform float uSize;


void main()
{

//final position
vec4 modelPosition = modelMatrix * vec4(position, 1.0);
vec4 viewPosition = viewMatrix * modelPosition;

gl_Position = projectionMatrix * viewPosition;
// One line version of above ( gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); )

//final size
gl_PointSize = uSize;
gl_PointSize *= 1.0 / - viewPosition.z; // makes the particles grow and shrink based on how far they are
//Dont forget, pixel ratio will affect the size

}

