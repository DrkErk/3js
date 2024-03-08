
varying vec3 vPosition;

void main()
{
    // pos
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // final pos
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    //varying
    vPosition = modelPosition.xyz;// lines follow the viewmodel, vs position.xyz would be static lines 
 
}


