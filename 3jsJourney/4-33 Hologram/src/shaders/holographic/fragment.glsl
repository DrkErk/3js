uniform

varying vec3 vPosition;

void main()
{


//stripes
float stripes = mod(vPosition.y * 20.0, 1.0 );
stripes = pow(stripes, 3.0) //sharper curve, so darker to black and to pure white before reset

//final color
gl_FragColor = vec4(stripes, stripes, stripes, 1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>

}


