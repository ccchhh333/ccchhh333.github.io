"use strict";

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// // Three Vertices task A
	// var vertices = [
	// 	/*-1.0, -1.0, 
	// 	 0.0,  1.0, 
	// 	 1.0, -1.0, 
	// 	*/
	// ];
	
	// square task B
	// var vertices = [
	// 	 0.0, -0.5,
	// 	 1.0, -0.5,
	// 	 1.0,  0.5,
	// 	 0.0,  0.5
	// ];
	
	// task C
	// var vertices = [
	// 	-1,-1,
	// 	0,-1,
	// 	-0.5,0,
	// 	0,0,
	// 	0,0.5,
	// 	-0.5,0.5
		
	// ];
	// task E
	var vertices1 = [
		-1,-1,
		0,-1,
		-0.5,0
	];
	
	var vertices2 = [

		-0.5,0,
		0,0,
		0,0.5,
		-0.5,0.5
		];
	var vertcolors = [
		1.0, 0.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 0.0, 1.0
	];
	// Configure WebGL
		gl.viewport( 0, 0, canvas.width, canvas.height );
		gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
		// Load shaders and initialize attribute buffers
		var program1 = initShaders( gl, "vertex-shader", "fragment1-shader" );
		gl.useProgram( program1 );
	
		// Load the data into the GPU
		var bufferId1 = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, bufferId1 );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices1 ), gl.STATIC_DRAW );
	
		// Associate external shader variables with data buffer
		var vPosition1 = gl.getAttribLocation( program1, "vPosition" );
		gl.vertexAttribPointer( vPosition1, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vPosition1 );
		
		
		var buffercolor = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, buffercolor );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertcolors ), gl.STATIC_DRAW );
			
		// Associate external shader variables with data buffer
		var vPcolor = gl.getAttribLocation( program1, "vPcolor" );
		gl.vertexAttribPointer( vPcolor, 3, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vPcolor );
		
		render();
		
		// var program2 = initShaders( gl, "vertex-shader", "fragment2-shader" );
		// gl.useProgram( program2 );
			
		// // Load the data into the GPU
		// var bufferId2 = gl.createBuffer();
		// gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
		// gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices2 ), gl.STATIC_DRAW );
			
		// // Associate external shader variables with data buffer
		// var vPosition2 = gl.getAttribLocation( program2, "vPosition" );
		// gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
		// gl.enableVertexAttribArray( vPosition2 );
		
		// render2();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	//task B
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	//task A D
	//gl.drawArrays( gl.TRIANGLES, 0, 3 );
	// task C 
	// gl.drawArrays( gl.TRIANGLES, 0, 3 );
	// gl.drawArrays( gl.TRIANGLE_FAN, 2, 4 );
	// task E
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
}
//TASK E
function render2(){
	
	//gl.drawArrays( gl.TRIANGLES, 0, 6 );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	}