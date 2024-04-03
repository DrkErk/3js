//for directional light lightPosition: we want the direction and not the position. The difference is that direction is normalized.
// //
// Specular is the light reflection
// //

 //camera position built in uniform from 3js

uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl
#include ../includes/directionalLight.glsl

vec3 pointLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower)
{

    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(- lightDirection, normal); //light direction is opposite, corrected with -

    //shading
    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading); //Clamp the normal value so when shading is less then zero in cases where it is facing away, it cant go
                                 // below zero and mess with any other shadings.

    //specular
    float specular = - dot(lightReflection, viewDirection); //to fix specular on wrong side, minus in front.
    specular = max(0.0, specular); // fix for below
    specular = pow(specular, specularPower); // even powers has white behind, odd has black. This is an issue with the DOT giving negatives

    //return lightColor * lightIntensity ;
    //return lightColor * lightIntensity * shading;
    //return lightColor * lightIntensity * shading + specular; // will add a white light spec instead, although it looks good.
    //return lightColor * lightIntensity * shading + (lightColor * lightIntensity * specular); // BOTH ARE SEPERATE FACTORS BEING MULTI
                                                                                               // BY LIGHTCOLOR/INTENSITY, BELOW IS REFACTOR
    return lightColor * lightIntensity * (shading + specular);

}

void main()
{
    vec3 normal = normalize(vNormal); // un normalize in order to get rid of interpolation errors.
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 color = uColor;

    vec3 light = vec3(0.0);

    light += ambientLight( 
        vec3(0.1, 0.1, 0.1), //light color
        0.2);                // Light intensity
    light += directionalLight( 
        vec3(0.1, 0.1, 1.0),    // Light Color
        1.0,                    // Light Intensity
        normal,                 // normal. vNormal can give interp issues
        vec3(0.0, 0.0, 3.0),    // Light Position
        viewDirection,          // view direction
        20.0                    // Specular Power
        );

    color *= light;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}