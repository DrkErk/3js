uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{


//stripes
float stripes = mod((vPosition.y + uTime * -0.02) * 20.0, 1.0 );
stripes = pow(stripes, 3.0); //sharper curve, so darker to black and to pure white before reset

//fresnel
vec3 viewDirection = normalize(vPosition - cameraPosition);
float fresnel = dot(viewDirection, vNormal);

//final color
gl_FragColor = vec4(1.0, 1.0, 1.0, stripes);
#include <tonemapping_fragment>
#include <colorspace_fragment>

}


