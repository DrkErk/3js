

varying vec3 vColor;


        void main()
        {
            // //disc
            // float str = distance(gl_PointCoord, vec2(0.5));
            // str = step(0.5, str);
            // str = 1.0 - str;

            // //diffuse point
            // float str = distance(gl_PointCoord, vec2(0.5));
            // str *= 2.0;
            // str = 1.0 - str;

            // Light Point
            float str = distance(gl_PointCoord, vec2(0.5));
            str = 1.0 - str;
            str = pow(str, 10.0);

            //final color
            vec3 color = mix(vec3(0.0), vColor, str);

            gl_FragColor = vec4(color, 1.0);
            // gl_FragColor = vec4(vColor, str);
            //can use above and skip color mixing if transparent is true
        }