///<reference path="../../libs/cuon-utils.js">
///<reference path="../../libs/cuon-matrix.js">
///<reference path="../../libs/webgl-utils.js">
///<reference path="../../libs/webgl-debug.js">
var VSHADER_SOURCE =
    `attribute vec4 a_Position;\n` +
    `uniform mat4 u_Matrix; \n` +
    `void main(){\n` +
    `gl_Position = a_Position * u_Matrix;\n` +
    `}\n`;
var FSHADER_SOURCE =
    `precision mediump float;\n` +
    `uniform vec4 u_Color;\n` +
    `void main(){\n` +
    `gl_FragColor = u_Color;\n` +
    `}\n`;

var gl;
var a_Position;
function main() {
    var canvas = $(`canvas`).get(0);
    gl = getWebGLContext(canvas);
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    a_Position = gl.getAttribLocation(gl.program, `a_Position`);
    var u_Color = gl.getUniformLocation(gl.program, `u_Color`);
    gl.uniform4f(u_Color, 0.0, 0.0, 1.0, 1.0);
    let u_matrix = gl.getUniformLocation(gl.program, `u_Matrix`);
    var matrix = new Matrix4();
    matrix.setTranslate(0.5, 0.0, 0.0);
    matrix.rotate(30, 0, 0, 1);
    // matrix.translate(0.5, 0.0, 0.0);
    gl.uniformMatrix4fv(u_matrix, false, matrix.elements);
    let n = init();
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function init() {
    var ver = new Float32Array([
        0.0, 0.5, -0.5, 0.0, 0.5, 0.0
    ])
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, ver, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, false, 0);
    gl.enableVertexAttribArray(a_Position);
    return 3;
}