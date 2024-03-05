uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main()
{

//scale and animate
vec2 smokeUv = vUv;
smokeUv.x *= 0.5;
smokeUv.y *= 0.3;
smokeUv.y -= uTime * 0.03;
//smoke
float smoke = texture(uPerlinTexture, smokeUv).r;

//remap
smoke = smoothstep(0.4, 1.0, smoke);

//smoke edges
smoke *= smoothstep(0.0, 0.2, vUv.x);
smoke *= smoothstep(1.0, 0.8, vUv.x);
smoke *= smoothstep(0.0, 0.1, vUv.y);
smoke *= smoothstep(1.0, 0.4, vUv.y);

// Final color
gl_FragColor = vec4(0.6, 0.3, 0.2, smoke);
#include <tonemapping_fragment>  //adds support for tonemapping from the renderer
#include <colorspace_fragment>   //adds support for Color spaces (it will convert colors to comply w colorspace)


}

  