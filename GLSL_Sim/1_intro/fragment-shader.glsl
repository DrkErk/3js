/*
* - GLSL is on OPENGL shading lang. (Imperative, C Style, strongly typed) 
*
* - Vertex shader runs at each VERTEX, one triangle has 3 vertices.
* - Fragment shader runs at each PIXEL
*
* - the benefit of doing the in/out before the params is that you can have multiple out parameters
*
* ------------------------------------------------------------------------------------------------------------------------------
* - Math is done component-wise, that means that vec3(1.0, 2.0, 3.0) * vec3(4.0, 5.0, 6.0) = vec3(1.0*4.0, 2.0*5.0, 3.0*6.0)
* ^- unless its for matirices, then its normal unless you want it component-wise mul. then use matrixCompMult(m1, m2);
* 
* - supports if/else and switch
* ------------------------------------------------------------------------------------------------------------------------------
*
* ------------------------------------------------------------------------------------------------------------------------------
* - Local space (also called object space) ("Everything from your own perspective")
    to
* - World space (local space is transformed into world space or RELATIVE TO THE WORLD INSTEAD OF EACH OBJECT) ("GPS")
    to
* - View space (world space is transformed into view space) (EVERYTHING REALATIVE TO THE CAMERA)
    to
* - Clip space ( Expected to output from the vertex shader) (everything is done in OpenGL)
    to
* - NDC space (Normalized device coordinate space) (opengl handles perspective divide)
    to
* - Screen space (resolution and depth range are applied here to get final screen position)
*
* -- UNIFORMS
* ^- Like Setting a global read only variable where every vertex/ fragment shader instance reads the same value. (useful for setting
      global state ie textures/tinting/time/etc)
*
* -- ATTRIBUTES
* ^- per vertex data, like the model data itself (positions/ normals/ texture coords/ colors)
*
* -- VARYINGS
* ^- like a comm pipe between vertex shader and frag shader. (you output from a vertex shader and thos values are interpolated)
     frag shader receives the interpolated value.
* ^- used for sending per-vertex data like color and texture coords (or anything needed by the frag shader)
* ^- ADVANCED usage could be optimization/ doing per vertex work instead of per frag.
*------------------------------------------------------------------------------------------------------------------------------
*
*------------------------------------------------------------------------------------------------------------------------------
* --OVERVIEW
* 
* --vertex shader common responsibilities:
* ^- gl_Position: (usually projection * modelView * position)
* ^- supply varying vals for the frag shader
* 
* --fragment shader common responsibilities:
* ^- output gl_FragColor
*
* ------------------------------------------------------------------------------------------------------------------------------
*/


vec4 getColour() {
  return vec4(1.0);
}

void getColourUsingOut(in vec4 colour, out vec4 final) {
  final = colour * vec4(0.5);
}

void main() {
  vec4 final;
  getColourUsingOut(vec4(1.0), final);
  gl_FragColor = final; 
}