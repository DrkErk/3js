//uniform sampler2D uParticles; already done by gpu comp renderer

#include ../includes/simplexNoise4d.glsl

void main()
{

vec2 uv = gl_FragCoord.xy / resolution.xy;
vec4 particle = texture(uParticles, uv);

//flow field
vec3 flowField = vec3(
    simplexNoise4d(vec4(particle.xyz + 0.0, 0.0)),
    simplexNoise4d(vec4(particle.xyz + 1.0, 0.0)),
    simplexNoise4d(vec4(particle.xyz + 2.0, 0.0))
)
flowField = normalize(flowField);
particle.xyz += flowField * 0.01;

gl_FragColor = particle;

}




