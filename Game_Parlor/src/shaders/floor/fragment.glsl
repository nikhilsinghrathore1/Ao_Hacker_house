uniform sampler2D tBackground;
varying vec2 vUv;

void main()
{
    // Sample the texture color
    vec4 backgroundColor = texture(tBackground, vUv);

    // Create a gradient from white to green based on the UV coordinates
    vec4 gradientColor = mix(vec4(1.0, 1.0, 1.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vUv.y);

    // Blend the texture color with the gradient
    gl_FragColor = mix(backgroundColor, gradientColor, 0.5); // 50% texture, 50% gradient
}
