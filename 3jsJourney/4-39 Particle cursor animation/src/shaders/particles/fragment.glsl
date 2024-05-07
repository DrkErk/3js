
varying vec3 vColor;

void main()
{
    vec2 uv = gl_PointCoord;
    float distanceToCenter = distance(uv, vec2(0.5));

    if(distanceToCenter > 0.5)
        discard;
    //GETS RID OF EDGES w/O needing 3js transparent but can have impacts

    //float distanceToCenter = distance(uv, vec2(0.5));
    //float distanceToCenter = length(uv - vec2(0.5)); //Does the same as above

    gl_FragColor = vec4( vColor, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}