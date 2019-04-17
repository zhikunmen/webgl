///<reference path="../../libs/cuon-utils.js">
///<reference path="../../libs/cuon-matrix.js">
///<reference path="../../libs/webgl-utils.js">
///<reference path="../../libs/webgl-debug.js">

/**顶点着色器程序 */
var VSHADER_SOURCE =
    `attribute vec4 a_Position;\n` +
    `attribute float a_PointSize;\n` +
    `void main(){\n` +
    `gl_Position = a_Position;\n` +//设置坐标
    `gl_PointSize = a_PointSize;\n` +//设置尺寸
    `}\n`;
/**片元着色器 */
var FSHADER_SOURCE =
    // `attribute vec4 f_Color;\n` +
    `void main(){ \n` +
    `gl_FragColor = vec4(1.0,1.0,0.0,1.0);\n` +
    `}\n`;
function main() {
    var canvas = $("canvas")[0];
    var gl = getWebGLContext(canvas);
    if (!gl) {
        alert("no gl")
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        return;
    }
    var a_Position = gl.getAttribLocation(gl.program, `a_Position`);
    if (a_Position < 0) {
        console.error("failed to get storage location of a_Position");
        return;
    }
    //设置顶点位置传输给attribute变量
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    var a_PointSize = gl.getAttribLocation(gl.program, `a_PointSize`);
    if (a_PointSize < 0) {
        console.error("failed to get storage location of a_PointSize");
        return;
    }
    //设置顶点位置
    gl.vertexAttrib1f(a_PointSize, 50.0);
    // var a_Color = gl.getAttribLocation(gl.program, `a_Color`);
    // if (a_Color < 0) {
    //     console.error("failed to get storage location of a_Color");
    //     return;
    // }
    // gl.vertexAttrib4f(a_Color, 1.0, 1.0, 0.0, 1.0);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
}