function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values : new Float32Array([
           // Add your list vertex positions here
		   //1
		   0.0, 0.0, 0.0, // Vertex 0
		   0.5, 0.0, 0.0, // Vertex 1
		   0.5, 0.5, 0.0, // Vertex 2
		   0.0, 0.5, 0.0, // Vertex 3
		   
		   //2
		   0.5, 0.0, 0.0, // Vertex 4
		   0.5, 0.5, 0.0, // Vertex 5
		   0.5, 0.5, 0.5, // Vertex 6
		   0.5, 0.0, 0.5, // Vertex 7
		   
		   //3
		   0.5, 0.0, 0.5, // Vertex 8
		   0.0, 0.0, 0.5, // Vertex 9
		   0.0, 0.5, 0.5, // Vertex 10
		   0.5, 0.5, 0.5, // Vertex 11
		   
		   //4
		   0.0, 0.0, 0.5, // Vertex 12
		   0.0, 0.0, 0.0, // Vertex 13
		   0.0, 0.5, 0.0, // Vertex 14
		   0.0, 0.5, 0.5, // Vertex 15
		   
		   //5
		   0.0, 0.5, 0.0, // Vertex 16
		   0.5, 0.5, 0.0, // Vertex 17
		   0.5, 0.5, 0.5, // Vertex 18
		   0.0, 0.5, 0.5, // Vertex 19
		   
		   //6
		   0.0, 0.0, 0.5, // Vertex 20
		   0.5, 0.0, 0.5, // Vertex 21
		   0.0, 0.0, 0.0, // Vertex 22
		   0.5, 0.0, 0.0, // Vertex 23
		   
		 
            ]),
        numComponents : 3
    };
    

	
	this.colors = {
		values : new Float32Array([
		//1
		1.0, 0.0, 0.0, // 0
		1.0, 0.0, 0.0, // 1
		1.0, 0.0, 0.0, // 2
		1.0, 0.0, 0.0, // 3
		
		//2
		1.0, 1.0, 0.0, // 4
		1.0, 1.0, 0.0, // 5
		1.0, 1.0, 0.0, // 6
		1.0, 1.0, 0.0, // 7
		
		//3
		0.0, 1.0, 0.0, // 8
		0.0, 1.0, 0.0, // 9
		0.0, 1.0, 0.0, // 10
		0.0, 1.0, 0.0, // 11
		
		//4
		1.0, 1.0, 1.0, // 12
		1.0, 1.0, 1.0, // 13
		1.0, 1.0, 1.0, // 14
		1.0, 1.0, 1.0, // 15
		
		//5
		0.0, 1.0, 1.0, // 16
		0.0, 1.0, 1.0, // 17
		0.0, 1.0, 1.0, // 18
		0.0, 1.0, 1.0, // 19
		
		//6
		0.0, 0.0, 1.0, // 20
		0.0, 0.0, 1.0, // 22
		0.0, 0.0, 1.0, // 23
		0.0, 0.0, 1.0, // 24
		
		]),
		numComponents : 3
	};
	
	
	
    this.indices = { 
        values : new Uint16Array([
            // Add your list of triangle indices here
			
			// 0, 1, 3, 
			// 3, 1, 2,
			// 1, 5, 2,
			// 2, 5, 6,
			// 5, 4, 6,
			// 6, 4, 7,
			// 4, 0, 7,
			// 7, 0, 3
			
			// 3, 2, 7,
			// 7, 2, 6,
			
			//4, 5, 0,
			//0, 5, 1,
			
			0, 1, 3, 
			3, 1, 2,
			
			7, 5, 4,
			6, 5, 7,
			
			8, 9, 11,
			11, 9, 10,
			
			12, 13, 15,
			15, 13, 14,
			
			16, 17, 19,
			19, 17, 18,
			
			20, 21, 22,
			22, 21, 23,
			
		
		
		
			
        ]),
    };
    this.indices.count = this.indices.values.length;

    // position
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );
	this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );
	
	// colors
	this.colors.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.colors.values, gl.STATIC_DRAW );
	this.colors.attributeLoc = gl.getAttribLocation( this.program, "vColor" );
	gl.enableVertexAttribArray( this.colors.attributeLoc );
	
	// indicies
    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );


    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
			
		
		gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
        gl.vertexAttribPointer( this.colors.attributeLoc, this.colors.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
		
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
