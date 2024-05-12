varying vec3 vColor;


void main()
{
    vec2 uv = gl_PointCoord;
    float distanceToCenter = length(uv - 0.5);
    float alpha = 0.05 / distanceToCenter - 0.1; //minus at end for edge alpha zero
    //alpha = smoothstep(0.05, 1.0, alpha); works but not the used one
    

    gl_FragColor = vec4(vColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}