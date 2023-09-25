 function initRotSquare(){


var canvas = document.getElementById( "rot-canvas" );
var gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );

if (!gl) {
    alert('Failed to init shaders');
}

gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var program = initShaders( gl, "rot-v-shader", "rot-f-shader" );
	gl.useProgram( program );

var N = 100;
var vertexData = [0.0, 0.0];
var r = 0.15;

for (var i = 0; i <= N; i++) {
    var theta = i * 2 * Math.PI / N;
    var x = r * Math.sin(theta)-0.25;
    var y = r * Math.cos(theta)-0.8;
    vertexData.push(x, y);
}
for (var i = 0; i <= N; i++) {
    var theta = i * 2 * Math.PI / N;
    var x = r * Math.sin(theta)+0.25;
    var y = r * Math.cos(theta)-0.8;
    vertexData.push(x, y);
}

var vertices = new Float32Array(vertexData);
var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	

gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_FAN, 1, vertices.length / 4+1);
gl.drawArrays(gl.TRIANGLE_FAN,  vertices.length / 4+1, vertices.length / 4);

vertices = [
		 -0.55,-0.75,0,
		 0.55,-0.75,0,
		 0.55,-0.3,0,
		 
		 -0.55,-0.75,0,
		 0.55,-0.3,0,
		 -0.55,-0.3,0
	];

	 bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	 vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 3 );
	gl.drawArrays( gl.TRIANGLE_STRIP, 3, 3 );
	
}
