//https://github.com/FarazzShaikh/THREE-CustomShaderMaterial?tab=readme-ov-file#output-variables
//
// Has weird shading issue if no 

//varying vec2 vUv;

uniform float uTime;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uStrength;

attribute vec4 tangent; // made from the geometery compute tangents

#include ../includes/simplexNoise4d.glsl

float getWobble(vec3 position)
{
    return simplexNoise4d(vec4(
    position * uPositionFrequency,   //xyz
    uTime * uTimeFrequency                           // w
)) * uStrength;
}

void main()
{
    vec3 biTangent = cross(normal, tangent.xyz);

    // neighbor positions
    float shift = 0.01;
    vec3 positionA = csm_Position + tangent.xyz * shift;
    vec3 positionB = csm_Position + biTangent  * shift;    

    //wobble
    float wobble = getWobble(csm_Position);
    csm_Position += wobble * normal;
    positionA += getWobble(positionA) * normal;
    positionB += getWobble(positionB) * normal;

    //compute normal
    vec3 toA = normalize(positionA - csm_Position);
    vec3 toB = normalize(positionB - csm_Position);
    csm_Normal = cross(toA, toB);

// Varying
//vUv = uv;   
}



