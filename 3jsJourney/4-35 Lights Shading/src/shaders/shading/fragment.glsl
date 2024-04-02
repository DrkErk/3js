//for directional light lightPosition: we want the direction and not the position. The difference is that direction is normalized.

uniform vec3 uColor;

varying vec3 vNormal;

#include ../includes/ambientLight.glsl

vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition)
{
    vec3 lightDirection = normalize(lightPosition);

    //shading
    float shading = dot(normal, lightDirection);

    //return lightColor * lightIntensity 
    return vec3(shading);
}

void main()
{
    vec3 color = uColor;

    vec3 light = vec3(0.0);

    // light += ambientLight( 
        // vec3(1.0, 0.0, 0.0), //light color
        // 0.2);                // Light intensity
    light += directionalLight( 
        vec3(0.1, 0.1, 1.0),    // Light Color
        1.0,                    // Light Intensity
        vNormal,                // normal
        vec3(0.0, 0.0, 3.0)     // Light Position

        );

    color *= light;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}