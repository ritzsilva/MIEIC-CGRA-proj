attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D uSampler1;
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;

    vec3 off = aVertexNormal * texture2D(uSampler1, vec2(0,0.1)+vTextureCoord).b*0.35;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + off , 1.0);

	
}