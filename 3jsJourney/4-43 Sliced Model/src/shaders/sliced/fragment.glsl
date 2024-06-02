uniform float uSliceStart;
uniform float uSliceArc;

varying vec3 vPosition;

void main()
{


float angle = atan(vPosition.y, vPosition.x);
angle -= uSliceStart;
angle = mod(angle, PI2); // PI * 2 (ALSO using MOD negative will have diff behaviours according to envs)

if(angle > 0.0 && angle < uSliceArc)
    discard;
    
}


