#ifdef GL_ES
precision highp float;
#endif

varying vec4 coord;

uniform int delivers;

void main() {
    float lim = -0.6 + (1.2 / 5.0) * float(delivers);

    if (coord.x > lim)
        gl_FragColor = vec4(0.1, 0.1, 0.1, 1);
    else {
        gl_FragColor.rgb =  vec3(1.0 - (0.6 + coord.x / 0.6), 0.6 + coord.x / 0.6, 0);
        gl_FragColor.a = 1.0;
    }
}