uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{

//normal 
vec3 normal = normalize(vNormal); //because the fresnel isnt normalized (some of the vertexs will not be )
if (!gl_FrontFacing)
    normal *= - 1.0;
//stripes
float stripes = mod((vPosition.y + uTime * -0.02) * 20.0, 1.0 );
stripes = pow(stripes, 3.0); //sharper curve, so darker to black and to pure white before reset

//fresnel
vec3 viewDirection = normalize(vPosition - cameraPosition);
float fresnel = dot(viewDirection, normal) + 1.0; //vNormal could be used, but if you want normalized normal, use normal
fresnel = pow(fresnel, 2.0); // to push the fresnel to the outside effect

//holographic
float holographic = stripes * fresnel;
holographic += fresnel * 1.25;

//final color
gl_FragColor = vec4(1.0, 1.0, 1.0, holographic);
#include <tonemapping_fragment>
#include <colorspace_fragment>

}


