
void main()
{

    float disToCen = distance(gl_PointCoord, vec2(0.5));
    float str = 0.1 / disToCen - 0.1 * 2.0;

    gl_FragColor = vec4(1.0, 1.0, 1.0, str);


}



