///<reference path="../../libs/cuon-utils.js">
///<reference path="../../libs/cuon-matrix.js">
///<reference path="../../libs/webgl-utils.js">
///<reference path="../../libs/webgl-debug.js">

/**顶点着色器程序 */
var VSHADER_SOURCE =
    `void main(){\n` +
    `gl_Position = vec4(0.0,0.0,0.0,1.0);\n` +//设置坐标
    `gl_PointSize=10.0;\n` +//设置尺寸
    `}\n`;
/**片元着色器 */
var FSHADER_SOURCE =
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

    }
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
}