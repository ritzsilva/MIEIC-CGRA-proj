#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler1;
uniform float timeFactor;
uniform float speedFactor;

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;
    vec3 off = vec3(0.0, 0.0, 0.0);

    off.z = 0.1*sin(aVertexPosition.x*speedFactor*100.0*timeFactor);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + off, 1.0);

}