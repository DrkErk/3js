

void main()
{
    // pos
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // final pos
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}


