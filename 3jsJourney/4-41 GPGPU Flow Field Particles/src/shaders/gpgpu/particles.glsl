//uniform sampler2D uParticles; already done by gpu comp renderer

#include ../includes/simplexNoise4d.glsl

uniform float uTime;
uniform float uDeltaTime;
uniform sampler2D uBase;

void main()
{
float time = uTime * 0.2;
vec2 uv = gl_FragCoord.xy / resolution.xy;
vec4 particle = texture(uParticles, uv);
vec4 base = texture(uBase, uv);
//dead
if(particle.a >= 1.0)
{
    particle.a = mod(particle.a, 1.0); // if it overflows for any reason, like clicking off, they will not all reset at the same time.
    particle.xyz = base.xyz;
}

//alive
else
{
//strength
float strength = simplexNoise4d(vec4(base.xyz * 0.2, time + 1.0)); // returns something from -1 to +1
strength = smoothstep(0.0, 1.0, strength); // will make it so that some parts move and others dont

//flow field
vec3 flowField = vec3(
    simplexNoise4d(vec4(particle.xyz + 0.0, time)),
    simplexNoise4d(vec4(particle.xyz + 1.0, time)),
    simplexNoise4d(vec4(particle.xyz + 2.0, time))
);
flowField = normalize(flowField);
particle.xyz += flowField * uDeltaTime * strength * 0.5; //How often you apply flowfield 

// decay
particle.a += uDeltaTime * 0.3; // how long it takes to get the particle to reset (framerate * 0.3)
}

gl_FragColor = particle;

}




