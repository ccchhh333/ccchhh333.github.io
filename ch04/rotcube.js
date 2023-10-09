"use strict";

var canvas;
var gl;
var sx=1;var sy=1;var sz=1;
var fx=0;var fy=0;var fz=0;
var points = [];
var colors = [];
var suofang = [
	glMatrix.vec4.fromValues(sx,0,0,0),
	glMatrix.vec4.fromValues(0,sy,0,0),
	glMatrix.vec4.fromValues(0,0,sz,0),
	glMatrix.vec4.fromValues(0,0,0,1)
];
var ping = [
	glMatrix.vec4.fromValues(1,0,0,0),
	glMatrix.vec4.fromValues(0,1,0,0),
	glMatrix.vec4.fromValues(0,0,1,0),
	glMatrix.vec4.fromValues(fx,fy,fz,1)
];
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [0, 0, 0];

var thetaLoc;

window.onload = function initCube() {
    canvas = document.getElementById("rtcb-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
	document.getElementById("xsuo").onclick = function () {
		sx=parseFloat(document.getElementById("xa").value);
		suofang=[];
		suofang = [
			glMatrix.vec4.fromValues(sx,0,0,0),
			glMatrix.vec4.fromValues(0,sy,0,0),
			glMatrix.vec4.fromValues(0,0,sz,0),
			glMatrix.vec4.fromValues(0,0,0,1)
		];
		makeCube();
	}
	
	document.getElementById("ysuo").onclick = function () {
	    sy=parseFloat(document.getElementById("ya").value);
		suofang=[];
		suofang = [
			glMatrix.vec4.fromValues(sx,0,0,0),
			glMatrix.vec4.fromValues(0,sy,0,0),
			glMatrix.vec4.fromValues(0,0,sz,0),
			glMatrix.vec4.fromValues(0,0,0,1)
		];
		makeCube();
	}
	
	document.getElementById("zsuo").onclick = function () {
	    sz=parseFloat(document.getElementById("za").value);
		suofang = [
			glMatrix.vec4.fromValues(sx,0,0,0),
			glMatrix.vec4.fromValues(0,sy,0,0),
			glMatrix.vec4.fromValues(0,0,sz,0),
			glMatrix.vec4.fromValues(0,0,0,1)
		];
		makeCube();
	}
	document.getElementById("xp").onclick = function () {
	    fx=parseFloat(document.getElementById("xb").value);
		ping = [
			glMatrix.vec4.fromValues(1,0,0,0),
			glMatrix.vec4.fromValues(0,1,0,0),
			glMatrix.vec4.fromValues(0,0,1,0),
			glMatrix.vec4.fromValues(fx,fy,fz,1)
		];
		makeCube();
	}
	
	document.getElementById("yp").onclick = function () {
	    fy=parseFloat(document.getElementById("yb").value);
		ping = [
			glMatrix.vec4.fromValues(1,0,0,0),
			glMatrix.vec4.fromValues(0,1,0,0),
			glMatrix.vec4.fromValues(0,0,1,0),
			glMatrix.vec4.fromValues(fx,fy,fz,1)
		];
		makeCube();
	}
	
	document.getElementById("zp").onclick = function () {
	    fz=parseFloat(document.getElementById("zb").value);
		ping = [
			glMatrix.vec4.fromValues(1,0,0,0),
			glMatrix.vec4.fromValues(0,1,0,0),
			glMatrix.vec4.fromValues(0,0,1,0),
			glMatrix.vec4.fromValues(fx,fy,fz,1)
		];
		makeCube();
	}
	
    makeCube();

    

    document.getElementById("xbutton").onclick = function () {
        axis = xAxis;
    }

    document.getElementById("ybutton").onclick = function () {
        axis = yAxis;
    }

    document.getElementById("zbutton").onclick = function () {
        axis = zAxis;
    }
	
	
    render();
}

function makeCube() {
    var vertices = [
        glMatrix.vec4.fromValues(-0.5, -0.5, 0.5, 1.0),
        glMatrix.vec4.fromValues(-0.5, 0.5, 0.5, 1.0),
        glMatrix.vec4.fromValues(0.5, 0.5, 0.5, 1.0),
        glMatrix.vec4.fromValues(0.5, -0.5, 0.5, 1.0),
        glMatrix.vec4.fromValues(-0.5, -0.5, -0.5, 1.0),
        glMatrix.vec4.fromValues(-0.5, 0.5, -0.5, 1.0),
        glMatrix.vec4.fromValues(0.5, 0.5, -0.5, 1.0),
        glMatrix.vec4.fromValues(0.5, -0.5, -0.5, 1.0),
    ];

    var vertexColors = [
        glMatrix.vec4.fromValues(0.0, 0.0, 0.0, 1.0),
        glMatrix.vec4.fromValues(1.0, 0.0, 0.0, 1.0),
        glMatrix.vec4.fromValues(1.0, 1.0, 0.0, 1.0),
        glMatrix.vec4.fromValues(0.0, 1.0, 0.0, 1.0),
        glMatrix.vec4.fromValues(0.0, 0.0, 1.0, 1.0),
        glMatrix.vec4.fromValues(1.0, 0.0, 1.0, 1.0),
        glMatrix.vec4.fromValues(0.0, 1.0, 1.0, 1.0),
        glMatrix.vec4.fromValues(1.0, 1.0, 1.0, 1.0)
    ];
	vertices=matrixMul(vertices,suofang);
	vertices=matrixMul(vertices,ping);
    var faces = [
        1, 0, 3, 1, 3, 2, //正
        2, 3, 7, 2, 7, 6, //右
        3, 0, 4, 3, 4, 7, //底
        6, 5, 1, 6, 1, 2, //顶
        4, 5, 6, 4, 6, 7, //背
        5, 4, 0, 5, 0, 1  //左		
    ];
	points=[];
	colors=[];
    for (var i = 0; i < faces.length; i++) {
        points.push(vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2]);

        colors.push(vertexColors[Math.floor(i / 6)][0], vertexColors[Math.floor(i / 6)][1], vertexColors[Math.floor(i / 6)][2], vertexColors[Math.floor(i / 6)][3]);
    }
}

function render() {
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	
	gl.enable(gl.DEPTH_TEST);
	
	// load shaders and initialize attribute buffer
	var program = initShaders(gl, "rtvshader", "rtfshader");
	gl.useProgram(program);
	
	var cBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);
	
	var vBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	
	thetaLoc = gl.getUniformLocation(program, "theta");
	gl.uniform3fv(thetaLoc, theta);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta[axis] += 0.1;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);

    requestAnimFrame(render);
}

function matrixMul(a,b){
	var c=new Array(a.length);
	for(var i=0;i<a.length;i++)
	{
		c[i]=new Array(b[0].length);
		for(var j=0;j<b[0].length;j++)
		{
			c[i][j]=0;
			for(var k=0;k<b.length;k++)
			{
				c[i][j]+=a[i][k]*b[k][j];
			}
		}
	}
	return c;
}