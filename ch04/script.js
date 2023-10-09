 var canvas;
 var gl;
var funb;var funa;var func;var fund;
 var maxNumVertices = 500;
 var index = 0;
 var N=50;var t;
 var colors = [
 	0.0, 0.0, 0.0, 1.0, // black
 	1.0, 0.0, 0.0, 1.0 , // red
 	1.0, 1.0, 0.0, 1.0 , // yellow
 	0.0, 1.0, 0.0, 1.0 , // green
 	0.0, 0.0, 1.0, 1.0 , // blue
 	1.0, 0.0, 1.0, 1.0 , // magenta
 	0.0, 1.0, 1.0, 1.0  // cyan
 ];
 var cIndex=1;
 var direction = 1;
 var theta=0.0;
 var thetaLoc ;
 var points = [];
 var color = [];
 var xAxis = 0;
 var yAxis = 1;
 var zAxis = 2;
 
 var axis = 0;
 var thetad = [0, 0, 0];
 
 var thetaLocd;
 
 function initRotSquare(){


 canvas = document.getElementById( "rot-canvas" );
 gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );

if (!gl) {
    alert('Failed to init shaders');
}

gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	var m = document.getElementById( "cmenu" );
		m.addEventListener( "click", function(){
			cIndex = m.selectedIndex;
		});
		
	 
	  

//	drawCircle();
//	drawSqare();
}

function drawSqare(){
	var programb = initShaders( gl, "rot-v-shaderb", "rot-f-shaderb" );
	gl.useProgram( programb );
	var verticeb = [
			 0,  0.5,  0,
			-0.5,  0,  0,
			 0.5,  0,  0,
			 0, -0.5,  0
		];
		var c = cIndex;
		c = c * 4;
	var vb=[
		colors[c], colors[c+1], colors[c+2],
		colors[c], colors[c+1], colors[c+2],
		colors[c], colors[c+1], colors[c+2],
		colors[c], colors[c+1], colors[c+2]
	];
	var vcolorb=new Float32Array(vb);
		var bufferIdb = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdb );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( verticeb ), gl.STATIC_DRAW );
	
		var vPositionb = gl.getAttribLocation( programb, "vPosition" );
		gl.vertexAttribPointer( vPositionb, 3, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vPositionb );
		
		
		var cbufferb = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, cbufferb );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vcolorb ), gl.STATIC_DRAW );
		
		var aColorb = gl.getAttribLocation( programb, "vColor" );
		gl.vertexAttribPointer( aColorb, 3, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( aColorb );
		 thetaLoc = gl.getUniformLocation( programb, "theta" );
		
		 theta+= direction * 0.1;
			if( theta > 2 * Math.PI )
				theta -= (2 * Math.PI);
			else if( theta < -2 * Math.PI )
				theta += ( 2 * Math.PI );
		
			gl.uniform1f( thetaLoc, theta );
		
			gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
		
			// update and render
	  funb=setTimeout( function (){ requestAnimFrame( drawSqare ); }, 200 );
	  
		//requestAnimationFrame(drawSqare);
}
  let x = 0.1;    //x坐标的位置
  let y = 0.1;    //y坐标的位置
  let z = 0.0;    //z坐标的位置
  let w = 1.0;    //差值
  let s=1;
function drawCircle( ) {
	var programa = initShaders( gl, "rot-v-shader", "rot-f-shader" );
		gl.useProgram( programa );
	
	var vertexDataa = [0.0, 0.0];
	var vc=[0.0,0.0,0.0];
	var r = 0.15;
	var c = cIndex;
			c = c * 4;
	for (var i = 0; i <= N; i++) {
	    var theta = i * 2 * Math.PI / N;
	    var x = r * Math.sin(theta);
	    var y = r * Math.cos(theta);
	    vertexDataa.push(x, y);
		vc.push(colors[c], colors[c+1], colors[c+2]);
	}
	for (var i = 0; i <= N; i++) {
	    var theta = i * 2 * Math.PI / N;
	    var x = r * Math.sin(theta);
	    var y = r * Math.cos(theta);
	    vertexDataa.push(x, y);
		vc.push(colors[c], colors[c+1], colors[c+2]);
	}

	
	var vertice = new Float32Array(vertexDataa);
	var vcolor=new Float32Array(vc);
	
	var bufferIda = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, bufferIda );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertice ), gl.STATIC_DRAW );
	
		var vPositiona = gl.getAttribLocation( programa, "vPosition" );
		gl.vertexAttribPointer( vPositiona, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vPositiona );
	
	var cbuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cbuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vcolor ), gl.STATIC_DRAW );
	
	var aColor = gl.getAttribLocation( programa, "vColor" );
	gl.vertexAttribPointer( aColor, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( aColor );
	
	var matlocation = gl.getUniformLocation(programa,'mat');
	
	 x+=-0.5+Math.random();
	 y+=-0.5+Math.random();
	    var mat = new Float32Array([
	      1.0,0.0,0.0,0.0,
	      0.0,1.0,0.0,0.0,
	      0.0,0.0,1.0,0.0,
	      x,y,z,w
	    ]);
	
	    gl.uniformMatrix4fv(matlocation,false,mat);
	gl.drawArrays(gl.TRIANGLE_FAN, 1, vertice.length / 4+1);
	gl.drawArrays(gl.TRIANGLE_FAN,  vertice.length / 4+1, vertice.length / 4);
	if(funa) requestAnimationFrame(drawCircle);
	else clearScene();
	
}

// 清空画布
function clearScene() {
	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	clearTimeout(funb);
	func=0;funa=0;fund=0;
}
function changeCircleEdges(event) {
  // 获取选择的边数
  N = event.target.value;
 // drawCircle( )
}
function selectElement(element) {
  // 根据选择的元素调用相应的绘制函数
  switch (element) {
    case 'triangle':
	  func=1;
      drawTriangle();
      break;
    case 'square':
      drawSqare( );
      break;
    case 'cube':
	fund=1;
     initCube() ;
      break;
    case 'circle':
		funa=1;
      drawCircle( );
      break;
    default:
      break;
  }
}
let Tx = 0;    // x轴初始缩放
	let Ty = 0;    // y轴初始缩放
	let Tz = 1;                 // z轴固定为1
	let step = 0.06; // 每次的变化量
	let status = true
	
function drawTriangle(){

	var vertices = [
		-0.3, -0.3, 
		 0.3, -0.3, 
		 0.3,  0.3, 
	];
	var c = cIndex;
	c = c * 4;
	var vertcolors = [
		colors[c], colors[c+1], colors[c+2],
		colors[c], colors[c+1], colors[c+2],
		colors[c], colors[c+1], colors[c+2]
	];
	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	
	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
	
	// Associate external shader variables with data buffer
	var aPosition = gl.getAttribLocation( program, "aPosition" );
	gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( aPosition );
	
	var cbufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cbufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertcolors ), gl.STATIC_DRAW );
	
	var aColor = gl.getAttribLocation( program, "aColor" );
	gl.vertexAttribPointer( aColor, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( aColor );
	
	const matLocation = gl.getUniformLocation(program,'mat');
	
	
	  if (Tx >= 2) {
	    status = false
	  }
	  if (Tx <= 0) {
	    status = true
	  }
	  if (status) {
	    Tx += step;
	    Ty += step;
	  } else {
	    Tx -= step;
	    Ty -= step;
	  }
	
	  // 初始化一个旋转矩阵。
	  const mat = new Float32Array([
	    Tx,  0.0, 0.0, 0.0,
	    0.0,  Ty, 0.0, 0.0,
	    0.0, 0.0,  Tz, 0.0,
	    0.0, 0.0, 0.0, 1.0,
	  ]);
	  gl.uniformMatrix4fv(matLocation,false,mat);
	  
	
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
	if(func)
		requestAnimationFrame(drawTriangle);
	else
		clearScene();
}
function initCube() {
	
    makeCube();

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
	
    var faces = [
        1, 0, 3, 1, 3, 2, //正
        2, 3, 7, 2, 7, 6, //右
        3, 0, 4, 3, 4, 7, //底
        6, 5, 1, 6, 1, 2, //顶
        4, 5, 6, 4, 6, 7, //背
        5, 4, 0, 5, 0, 1  //左		
    ];
	points=[];
	color=[];
    for (var i = 0; i < faces.length; i++) {
        points.push(vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2]);

        color.push(vertexColors[Math.floor(i / 6)][0], vertexColors[Math.floor(i / 6)][1], vertexColors[Math.floor(i / 6)][2], vertexColors[Math.floor(i / 6)][3]);
    }
}

function render() {
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	
	gl.enable(gl.DEPTH_TEST);
	
	// load shaders and initialize attribute buffer
	var programd = initShaders(gl, "rtvshader", "rtfshader");
	gl.useProgram(programd);
	
	var cBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation(programd, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);
	
	var vBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(programd, "vPosition");
	gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	
	thetaLocd = gl.getUniformLocation(programd, "theta");
	gl.uniform3fv(thetaLocd, thetad);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    thetad[axis] += 0.1;
    gl.uniform3fv(thetaLocd, thetad);

    gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);

    if(fund) requestAnimFrame(render);
	else clearScene();
}