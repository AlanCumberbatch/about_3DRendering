// draw a simple square untextured plane
function main() {
  const canvas = document.getElementById("glCanvas");

  const gl = canvas.getContext("webgl");

  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // Vertex shader program
  // Each time a shape is rendered, the vertex shader is run for each vertex in the shape.
  /* 作用：
     Its job is to transform the input vertex from its original coordinate system into the clip space coordinate system used by WebGL, 
     in which each axis has a range from -1.0 to 1.0, regardless of aspect ratio, actual size, or any other factors.
  */
  const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main(){
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

  // Vertex shader program:
  // The fragment shader is called once for every pixel on each shape to be drawn, 
  // after the shape's vertices have been processed by the vertex shader
  /* 
    Its job is to determine the color of that pixel by figuring out which texel (that is, the pixel from within the shape's texture) to apply to the pixel, 
    getting that texel's color, then applying the appropriate lighting to the color. 
    The color is then returned to the WebGL layer by storing it in the special variable gl_FragColor. 

    The color is then returned to the WebGL layer by storing it in the special variable gl_FragColor.
  */
  const fsSource = `
    void main(){
      gl_FragColor = vec(1.0,1.0,1.0,1.0);
    }
  `;

  // Initialize a shader program, so WebGL knows how to draw our data
  function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShder(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADERR, fsSource);

    // Create the shader program
    const shaderProgrm = gl.createProgram();
    gl.attachShader(shaderProgrm, vertexShader);//存储的是：转换成webGL内坐标系的点 的 顶点数据
    gl.attachShader(shaderProgrm, fragmentShader);//存储的是：顶点计算完之后的 纹素颜色的获取，以及当前元素的相关的光照信息
    gl.linkProgarm(shaderProgrm);

    //if creating the shader program failed , alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgrm));
      return null;
    }

    return shaderProgrm;
  }

  //
  // creates a shader of the given type, uploads the source and compiles it.
  //
  function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    //send the source to the shader object
    gl.shaderSource(shader, source);

    //compile the shader program
    gl.compileShader(shader);

    // see if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert("An error occured compiling the shaders: " + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  const programInfo = {
    program: shaderProgram,
    attribLocation: {
      vertexPosition: gl.getAttribLoacation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {// 这里为什么分为这两个属性？？？？
      projectionMatrix: gl.getUniformLoaction(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLoaction(shaderProgram, 'uModelViewMatrix'),
    }
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

}

window.onload = main;
