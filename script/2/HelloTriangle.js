///<reference path="../../libs/cuon-utils.js">
///<reference path="../../libs/cuon-matrix.js">
///<reference path="../../libs/webgl-utils.js">
///<reference path="../../libs/webgl-debug.js">
var VSHADER_SOURCE =
    `attribute vec4 a_Position;\n` +
    `void main(){\n` +
    `gl_Position = a_Position;\n` +
    `}\n`;

var FSHADER_SOURCE =
    `precision mediump float; \n` +
    `uniform vec4 u_Color;\n` +
    `void main(){ \n` +
    `gl_FragColor = u_Color;\n` +
    `}\n`;
var a_Position;
var gl;
function main() {
    var canvas = $("canvas").get(0);
    gl = getWebGLContext(canvas);
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        
    }
    a_Position = gl.getAttribLocation(gl.program, "a_Position");
    var u_Color = gl.getUniformLocation(gl.program, "u_Color");
    gl.uniform4f(u_Color, 1.0, 0.0, 0.0, 1.0);
    var n = init();
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}


function init() {
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ])

    var n = 3;
    var buffer = gl.createBuffer();
    if (!buffer) {

    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;

}