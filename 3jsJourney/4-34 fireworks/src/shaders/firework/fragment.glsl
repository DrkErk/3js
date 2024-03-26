uniform sampler2D uTexture;


void main()
{

float textureAlpha = texture(uTexture, gl_PointCoord).r; // to get the grayscale
//vec4 textureColor = texture(uTexture, gl_PointCoord); if the texture wasn't only a grayscale

//final color
gl_FragColor = vec4(1.0, 1.0, 1.0, textureAlpha);
#include <tonemapping_fragment>
#include <colorspace_fragment>

}




