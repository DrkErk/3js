varying vec2 vUv;

void main()
{

//smoke
vec4 smoke = texture(uPerlinTexture, vUv);

// Final color
gl_FragColor = vec4(vUv, 0.0, 1.0);
#include <tonemapping_fragment>  //adds support for tonemapping from the renderer
#include <colorspace_fragment>   //adds support for Color spaces (it will convert colors to comply w colorspace)


}

