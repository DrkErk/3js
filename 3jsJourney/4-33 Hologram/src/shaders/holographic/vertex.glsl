
varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    // pos
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

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


