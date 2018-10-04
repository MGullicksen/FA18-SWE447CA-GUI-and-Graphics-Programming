var cube = undefined;
var gl = undefined;
var angle = 0;

var speed = 2;


var rotationAxis; 
var xAxis = [-1, 1, 1]; 
var yAxis = [1, 1, -1]; 
rotationAxis = yAxis;
//rotationAxis = xAxis;

function init() {
  var canvas = document.getElementById( "webgl-canvas" );

  gl = WebGLUtils.setupWebGL( canvas );

  if ( !gl ) {
    alert("Unable to setup WebGL");
    return;
  }

  gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
  gl.enable( gl.DEPTH_TEST );

  cube = new Cube();

  
  document.getElementById("xButton").onclick = function() {
	  rotationAxis = xAxis;   }
	  
  document.getElementById("yButton").onclick = function() {
	  rotationAxis = yAxis;   }
	  
  document.getElementById("slider").onchange = function() {
	speed = 100 - event.srcElement.value;     }
  
  render();
  
}

function render() {
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

  angle += 2.0; // degrees

  //cube.MV = rotate( angle, [1, 1, 0] );
  
  cube.MV = rotate( speed * angle, rotationAxis );

  cube.render();

  requestAnimationFrame( render ); // schedule another call to render()
  

}

window.onload = init;
