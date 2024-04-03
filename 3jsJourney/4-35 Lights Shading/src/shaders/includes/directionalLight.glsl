vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower)
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