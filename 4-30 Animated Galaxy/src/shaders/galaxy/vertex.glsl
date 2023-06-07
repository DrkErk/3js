        uniform float uSize;

        attribute float aScale;
        
        void main()
        {
            /**
             * pos
             */
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            gl_Position = projectedPosition;

            /**
             * size
             */
            gl_PointSize = uSize * aScale ;
            gl_PointSize *= (1.0 /- viewPosition.z);
        }