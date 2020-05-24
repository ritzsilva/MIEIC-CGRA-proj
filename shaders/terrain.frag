#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler0;
uniform sampler2D uSampler1;

uniform float timeFactor;

void main() {
	vec4 col = texture2D(uSampler0, vTextureCoord);
	vec4 fil = texture2D(uSampler1, vec2(0.0,0.1)+vTextureCoord);
	gl_FragColor = col;
}
