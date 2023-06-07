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

            gl_FragColor = vec4(vec3(str), 1.0);
        }