#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

//pattern 23, 24
float random(vec2 st)
{
   return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

//pattern 32
// vec2 rotate(vec2 uv, float rotation, vec2 mid)
// {
//     return vec2(
//       cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
//       cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
//     );
// }

// pattern 46 perlin noise
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}


void main()
{
    //pattern 1
    //gl_FragColor = vec4(vUv.x, vUv.y, .5, 1.0);

    //pattern 2
    //gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);

    //pattern 3
    //float str = vUv.x;
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 4
    //float str = vUv.y;
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 5
    //float str = 1 - vUv.y;
    //gl_FragColor = vec4(str, str, str, 1.0);
    
    //pattern 6
    //float str = vUv.y * 10;
    //gl_FragColor = vec4(str, str, str, 1.0);
    
    //pattern 7
    //float str = mod(vUv.y * 10.0 , 1.0);
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 8
    //float str = mod(vUv.y * 10.0 , 1.0);
    //str = step(0.5, str);
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 9
    //float str = mod(vUv.y * 10.0 , 1.0);
    //str = step(0.8, str);
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 10
    //float str = mod(vUv.x * 10.0 , 1.0);
    //str = step(0.8, str);
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 11
    //float str = step(0.8, mod(vUv.x * 10.0 , 1.0));
    //str += step(0.8, mod(vUv.y * 10.0 , 1.0));
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 12
    //float str = step(0.8, mod(vUv.x * 10.0 , 1.0));
    //str *= step(0.8, mod(vUv.y * 10.0 , 1.0));
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 13
    //float str = step(0.4, mod(vUv.x * 10.0 , 1.0));
    //str += step(0.8, mod(vUv.y * 10.0 , 1.0));
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 14
    //float barX = step(0.4, mod(vUv.x * 10.0 , 1.0));
    //barX += step(0.8, mod(vUv.y * 10.0 , 1.0));
    //
    //float barY = step(0.8, mod(vUv.x * 10.0 , 1.0));
    //barY += step(0.4, mod(vUv.y * 10.0 , 1.0));
    //
    //float str = barX + barY;
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 15
    //float barX = step(0.4, mod(vUv.x * 10.0 , 1.0));
    //barX += step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
    //
    //float barY = step(0.8, mod(vUv.x * 10.0 + 0.2 , 1.0));
    //barY += step(0.4, mod(vUv.y * 10.0 , 1.0));
    //
    //float str = barX + barY;
    //gl_FragColor = vec4(str, str, str, 1.0);
    
    //pattern 16
    //float str = abs(vUv.x - 0.5);
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 17
    //float str = min(abs(vUv.x - 0.5), abs(vUv.y - 5));
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 18
    //float str = max(abs(vUv.x - 0.5), abs(vUv.y - 5));
    //gl_FragColor = vec4(str, str, str, 1.0);
    
    //pattern 19
    //float str = step(0.2, min(abs(vUv.x - 0.5), abs(vUv.y - 5)));
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 20
    //float sq1 = step(0.2, min(abs(vUv.x - 0.5), abs(vUv.y - 5)));
    //float sq2 = 1 - step(0.2, min(abs(vUv.x - 0.5), abs(vUv.y - 5)));
    //float str = sq1 * sq2;
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 21
    //float str = floor(vUv.x * 10.0) / 10.0;
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 22
    //float str = floor(vUv.x * 10.0) / 10.0;
    //str += floor(vUv.y * 10.0) / 10.0;
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 23
    // float str = random(vUv);
    // gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 24
    //vec2 gridUV = vec2(
    //  floor(vUv.x * 10.0) / 10.0,
    //  floor(vUv.y * 10.0) / 10.0
    //);
    //float str = random(gridUV)
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 25
    //vec2 gridUV = vec2(
    //  floor(vUv.x * 10.0) / 10.0,
    //  floor((vUv.y + uVu.x * 0.5) * 10.0) / 10.0
    //);
    //float str = random(gridUV);
    //gl_FragColor = vec4(str, str, str, 1.0);
    
    //pattern 26
    //float str = length(vUv);
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 27
    //float str = distance(vUv, vec2(0.5);
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 28
    //float str = 1.0 - distance(vUv, vec2(0.5);
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 29
    //float str = 0.015 / distance(vUv, vec2(0.5);
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 30
    //vec2 lightUv = vec2(
    //  vUv.x * 0.1 + 0.45,
    //  vUv.y * 0.5 + 0.25
    //);
    //float str = 0.015 / distance(lightUv, vec2(0.5);
    //gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 31
    // vec2 lightUvX = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
    // float lightX = 0.015 / distance(lightUvX, vec2(0.5));
    //
    // vec2 lightUvY = vec2(vUv.y * 0.1 + 0.45, vUv.x * 0.5 + 0.25);
    // float lightY = 0.015 / distance(lightUvY, vec2(0.5));
    // float str = lightX * lightY;
    //
    // gl_FragColor = vec4(str, str, str, 1.0);

    //pattern 32
    // vec2 rotatedUV = rotate(vUv, PI * 0.25, vec2(0.5));
    //
    // vec2 lightUvX = vec2(rotatedUV.x * 0.1 + 0.45, rotatedUV.y * 0.5 + 0.25);
    // float lightX = 0.015 / distance(lightUvX, vec2(0.5));
    //
    // vec2 lightUvY = vec2(rotatedUV.y * 0.1 + 0.45, rotatedUV.x * 0.5 + 0.25);
    // float lightY = 0.015 / distance(lightUvY, vec2(0.5));
    //
    // float str = lightX * lightY;
    //
    // gl_FragColor = vec4(str, str, str, 1.0);

    // patter 33
    //
    // float str = step(0.25, distance(vUv, vec2(0.5)));
    //

    // patter 34
    //
    // float str = abs(distance(vUv, vec2(0.5)) - 0.25);
    //

    // patter 35
    //
    // float str = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));
    //

    // patter 36
    //
    // float str = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));
    //

    // patter 37
    // vec2 wavedUv = vec2(
    //     vUv.x,  
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    //);
    // float str = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
    //


    // patter 38
    // vec2 wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 30.0) * 0.1,  
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    //);
    // float str = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
    //

    // patter 39
    // vec2 wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 100.0) * 0.1,  
    //     vUv.y + sin(vUv.x * 100.0) * 0.1
    //);
    // float str = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));
    //

    //pattern 40
    //float angle = atan(vUv.x, vUv.y);
    //float str = angle;
    //

    //pattern 41
    //float angle = atan(vUv.x - 0.5, vUv.y -0.5);
    //float str = angle;
    //

    //pattern 42
    //float angle = atan(vUv.x - 0.5, vUv.y -0.5);
    //angle /= PI * 2.0;
    //angle += 0.5;
    //float str = angle;
    //

    //pattern 43
    //float angle = atan(vUv.x - 0.5, vUv.y -0.5);
    //angle /= PI * 2.0;
    //angle += 0.5;
    //angle *= 20.0;
    //angle = mod(angle, 1.0);
    //float str = angle;
    //

    //pattern 44
    //float angle = atan(vUv.x - 0.5, vUv.y -0.5);
    //angle /= PI * 2.0;
    //angle += 0.5;
    //float str = sin(angle * 20.0);
    //

    //pattern 45
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // float sinusoid = sin(angle * 100.0);
    //
    // float radius = 0.25 + sinusoid * 0.02;
    // float str = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));
    // gl_FragColor = vec4(str , str, str, 1.0);

    //pattern 46
    //float str = cnoise(vUv * 10.0);
    //gl_FragColor = vec4(str , str, str, 1.0);    

    //pattern 47
    //float str = step(0.0, cnoise(vUv * 10.0));
    //gl_FragColor = vec4(str , str, str, 1.0);

    //pattern 48
    //float str = 1.0 - abs(cnoise(vUv * 10.0));
    //gl_FragColor = vec4(str , str, str, 1.0);

    //pattern 49
    //float str = sin(cnoise(vUv * 10.0) * 20.0);
    //gl_FragColor = vec4(str , str, str, 1.0);    
    
    //pattern 50
    //float str = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));
    //gl_FragColor = vec4(str , str, str, 1.0);    
    
    //pattern 50 with color mixing
    // float str = step(0.9, sin(cnoise(vUv * 10.0 + 3.3) * 30.0));
    // vec3 blackColor = vec3(0.0);
    // vec3 uvColor = vec3(vUv, 1.0);
    // vec3 mixedColor = mix(blackColor, uvColor, str);
    // gl_FragColor = vec4(mixedColor, 1.0);

    //CLAMP THE STRENGTH or str using pattern 11 as the example
    //get the shape
    float str = step(0.8, mod(vUv.x * 10.0 , 1.0));
    str += step(0.8, mod(vUv.y * 10.0 , 1.0));
    //clamped
    str = clamp(str, 0.0, 1.0);
    //color mixer
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, str);
    gl_FragColor = vec4(mixedColor, 1.0);

}