uniform float uTime;


varying vec3 vPosition;
varying vec3 vNormal;


#include ../includes/random2D.glsl

void main()
{
    // pos
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    //glitch
    float glitchTime = uTime - modelPosition.y;
    float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime * 8.76); // built in desmos to get a more random feel
    glitchStrength /= 3.0; // reduce size of waves
    glitchStrength = smoothstep(0.3, 1.0, glitchStrength); // if under .3 it is zero
    glitchStrength *= 0.25; 
    modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength; //rand2d always returns 0 - 1 so an offset is needed
    modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;

    // final pos
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    //model normal.  to make sure the fresnel doesn't move with the rotation
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
    // When the forth positon(alpha) is 1.0, the vector is homogeneous and will apply all 3 transformation (translation, rotation, scale)
    // When the forth positon(alpha) is 0.0, the vector isn't homogeneous and all 3 transformation wont be applied
    // ^-- we dont want the translation to be applied because the normal isnt a position. It's a direction.
    
    
    //varying
    vPosition = modelPosition.xyz;// lines follow the viewmodel, vs position.xyz would be static lines 
    vNormal = modelNormal.xyz;
    
}


