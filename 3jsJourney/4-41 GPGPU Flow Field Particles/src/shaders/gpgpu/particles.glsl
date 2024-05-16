//uniform sampler2D uParticles; already done by gpu comp renderer


void main()
{

vec2 uv = gl_FragCoord.xy / resolution.xy;
vec4 particle = texture(uParticles, uv);
particle.x += 0.01;
gl_FragColor = particle;

}




