//https://github.com/FarazzShaikh/THREE-CustomShaderMaterial?tab=readme-ov-file#output-variables
//
// Has weird shading issue if no 

//varying vec2 vUv;

#include ../includes/simplexNoise4d.glsl

void main()
{

float wobble = simplexNoise4d(vec4(
    csm_Position,   //xyz
    0.0             // w
));
csm_Position += wobble * normal;



// Varying
//vUv = uv;   
}




