uniform sampler2D uTexture;
uniform vec3 uColor;

void main()
{

float textureAlpha = texture(uTexture, gl_PointCoord).r; // to get the grayscale
//vec4 textureColor = texture(uTexture, gl_PointCoord); if the texture wasn't only a grayscale

//final color
gl_FragColor = vec4(uColor, textureAlpha);
#include <tonemapping_fragment>
#include <colorspace_fragment>

}




