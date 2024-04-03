varying vec3 vNormal;
varying vec3 vPosition; // frag pos from 

void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    //model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0); //once again, applying the model matrix on the normal, set the 4th value to 0.0
                                                        //and save it as a vec4 modelNormal

    //varying 
    vNormal = modelNormal.xyz;
    vPosition = modelPosition.xyz;

}