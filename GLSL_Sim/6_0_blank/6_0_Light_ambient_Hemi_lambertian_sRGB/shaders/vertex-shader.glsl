

varying vec3 vNormal;
varying vec3 vPosition;

void main() {	
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
  // change lighting from local space to world space through the model matrix
  // 0.0 in the w component since we dont need to use translation, just rotation
  // we need to renormalize the normal, that happens in the frag shader
  // this is done because middle values of normal are interpolated

  vPosition = (modelMatrix * vec4(position, 1.0)).xyz  // Direction from this camera to the fragment. so need world pos

}