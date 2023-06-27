// MultiJointModel.js (c) 2012 matsuda and itami
// Vertex shader program

var g_jointNeeAngle = 0.0;
var g_jointNeeAngle1 = 0.0;
var g_joint2AngleToe = 90.0;
var g_joint2AngleToe1 = 90.0;
var bodyelevation = -1.5
var ANGLE_STEP0 = 20.0;
var ANGLE_STEP1 = 15.0;
var ANGLE_STEP2 = 10.0;
var ANGLE_STEP3 = 5.0;
var ANGLE_STEP4 = 0.0;
var ANGLE_STEP5 = -5.0;
var ANGLE_STEP6 = -10.0;
var ANGLE_STEP7 = -15.0;
var ANGLE_STEP8 = -20.0;
var GROUNGSPEED = 0.9
var viewX = 0
var viewY = -12
var viewZ = 70
var polWidth = 4
var polHight = 1
var polLength = 10

// The increments of rotation angle (degrees)
var g_arm1Angle = 180.0;   // The rotation angle of arm1 (degrees)

var g_arm1Angle = 180.0;


var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  //  'attribute vec4 a_Color;\n' + // Defined constant in main()
  'attribute vec4 a_Normal;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
  'uniform mat4 u_NormalMatrix;\n' +   // Transformation matrix of the normal
  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'void main() {\n' +
  '  vec4 color = vec4(1.0, 1.0, 1., 1.0);\n' + // Sphere color
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  // Calculate the vertex position in the world coordinate
  '  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
  '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '  v_Color = color;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform vec3 u_LightColor;\n' +     // Light color
  'uniform vec3 u_LightPosition;\n' +  // Position of the light source
  'uniform vec3 u_AmbientLight;\n' +
  'varying vec4 v_Color;\n' +
  'uniform vec3 u_Viewpoint;\n' +
  'uniform float u_PhongExponent;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'void main() {\n' +
  // Normalize the normal because it is interpolated and not 1.0 in length any more
  '  vec3 normal = normalize(v_Normal);\n' +
  // '  float nDotL = max(dot(u_LightDirection, normal), 0.0);\n' +
  // Calculate the light direction and make it 1.0 in length
  '  vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
  // The dot product of the light direction and the normal
  '  float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
  // Calculate the final color from diffuse reflection and ambient reflection
  '  vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;\n' +
  '  vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
  '  vec3 refl = 2.*nDotL*normal - lightDirection;\n' +
  '  vec3 view = normalize(u_Viewpoint - v_Position);\n' +
  '  float phong_dot = max(dot(refl, view), 0.0);\n' +
  '  vec3 phong = .45*pow(phong_dot, 6.0)*u_LightColor;\n' +
  '  gl_FragColor = vec4(diffuse + ambient + phong, v_Color.a);\n' +
  // '  gl_FragColor = vec4(diffuse + ambient, v_Color.a);\n' +
  '}\n';


// Author Khushnud Boqiev
var VSHADER_SOURCE2 =
  'attribute vec4 a_Position;\n' +
  'attribute float a_PointSize;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = a_PointSize;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE2 =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  // uniform変数
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';


var controlPointsUpperLeg = [
  [-0.9, 0],
  [-0.79, 0.1],
  [-0.6749999999999999, 0.19000000000000006],
  [-0.595, 0.2500000000000001],
  [-0.485, 0.27500000000000013],
  [-0.37, 0.23000000000000007],
  [-0.26499999999999996, 0.15500000000000003],
  [-0.175, 0.10500000000000001],
  [-0.06999999999999998, 0.04000000000000002],
  [0.030000000000000002, -0.02],
  [0.125, -0.06499999999999997],
  [0.2, -0.10000000000000003],
  [0.3, -0.14500000000000005],
  [0.395, -0.17500000000000007],
  [0.515, -0.18500000000000005],
  [0.615, -0.16500000000000006],
  [0.72, -0.13000000000000006],
  [0.8250000000000001, -0.065],
  [0.9, 0],
  [1, 0],
]


var controlPointsNee = [

  [-0.9, 0],
  [-0.785, -0.02],
  [-0.6799999999999999, -0.05500000000000003],
  [-0.58, -0.17000000000000004],
  [-0.48, -0.28500000000000003],
  [-0.30999999999999994, -0.245],
  [-0.20999999999999994, -0.245],
  [-0.11, -0.245],
  [0.04499999999999997, -0.24500000000000008],
  [0.14500000000000002, -0.24500000000000008],
  [0.24500000000000005, -0.24500000000000008],
  [0.35000000000000014, -0.21500000000000008],
  [0.4250000000000001, -0.18000000000000005],
  [0.5000000000000001, -0.14500000000000002],
  [0.5850000000000001, -0.11500000000000005],
  [0.655, -0.065],
  [0.725, -0.01500000000000001],
  [0.81, 0.04499999999999999],
  [0.9, 0],




]

var controlPointsToe = [
  [-0.9, 0],
  [-0.805, 0.07500000000000002],
  [-0.69, 0.040000000000000015],
  [-0.585, -0.025],
  [-0.48, -0.08999999999999997],
  [-0.385, 0.15000000000000005],
  [-0.305, 0.245],
  [-0.22499999999999998, 0.37],
  [-0.19, 0.7450000000000001],
  [-0.105, 0.79],
  [-0.019999999999999976, 0.8350000000000001],
  [0.175, 0.19],
  [0.305, 0.215],
  [0.405, 0.19],
  [0.505, 0.030000000000000013],
  [0.605, -0.085],
  [0.69, -0.18],
  [0.795, -0.07000000000000002],
  [0.9, 0],
]

var controlHights = [
  [-0.9, 0],
  [-0.795, 0.049999999999999996],
  [-0.645, 0.07999999999999999],
  [-0.555, 0.1],
  [-0.4600000000000001, 0.095],
  [-0.33, 0.07999999999999999],
  [-0.24, 0.04],
  [-0.14500000000000002, -0.02500000000000001],
  [-0.1, 0],
  [0, 0],
  [0.1, 0],
  [0.2, 0],
  [0.3, 0],
  [0.4, 0],
  [0.5, 0],
  [0.6, 0],
  [0.7, 0],
  [0.8, 0],
  [0.9, 0],
]






function beizerMain(controlPoints) {
  var canvas2 = document.getElementById('webgl2');
  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas2);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE2, FSHADER_SOURCE2)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  initEventHandlers(canvas2, gl, a_Position, controlPoints);

  // Specify the color for clearing <canvas2>
  gl.clearColor(.0, .0, .0, 1.0);

  // Clear <canvas2>
  gl.clear(gl.COLOR_BUFFER_BIT);
  draw_curve(gl, a_Position, controlPoints)
  draw_points_lines(gl, a_Position, controlPoints)

}

// EventHandlers
function initEventHandlers(canvas, gl, a_Position, controlPoints) {
  var dragging = false;         // Dragging or not
  var lastX = -1, lastY = -1, pos = 0;
  canvas.onmousedown = function (ev) {   // Mouse is pressed
    var x = ev.clientX, y = ev.clientY;
    // Start dragging if a moue is in <canvas>
    var rect = ev.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      lastX = x; lastY = y;
      posXcord = (lastX - 200) / 200;
      posYcord = -1 * (lastY - 200) / 200;
      for (var i = 0; i < controlPoints.length; i++) {
        if ((controlPoints[i][0] - 0.05 <= posXcord && posXcord <= controlPoints[i][0] + 0.05) && (controlPoints[i][1] - 0.05 <= posYcord && posYcord <= controlPoints[i][1] + 0.05)) {
          pos = i;
        }
      };

      dragging = true;
    }
  };

  canvas.onmouseup = function (ev) { dragging = false; }; // Mouse is released

  canvas.onmousemove = function (ev) { // Mouse is moved
    var x = ev.clientX, y = ev.clientY;
    if (dragging) {
      posXcord = (x - 200) / 200;
      posYcord = -1 * (y - 200) / 200;

      prevPos = controlPoints[pos]
      new_pos = [posXcord, posYcord]
      diffcords = [new_pos[0] - prevPos[0], new_pos[1] - prevPos[1]]

      controlPoints[pos] = [posXcord, posYcord];

      if ((pos) % 3 == 0 && pos != 0 && pos != controlPoints.length - 1) {
        controlPoints[pos + 1][0] += diffcords[0]
        controlPoints[pos + 1][1] += diffcords[1]

        controlPoints[pos - 1][0] += diffcords[0]
        controlPoints[pos - 1][1] += diffcords[1]
      }
      if ((pos + 1) % 3 == 0 && pos != 0 && pos != controlPoints.length - 2 && pos != controlPoints.length - 1) {
        controlPoints[pos + 2][0] += -diffcords[0]
        controlPoints[pos + 2][1] += -diffcords[1]
      }
      if ((pos - 1) % 3 == 0 && pos != 0 && pos != 1 && pos != controlPoints.length - 1) {
        controlPoints[pos - 2][0] += -diffcords[0]
        controlPoints[pos - 2][1] += -diffcords[1]
      }

      gl.clearColor(.0, .0, .0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      draw_curve(gl, a_Position, controlPoints)
      draw_points_lines(gl, a_Position, controlPoints)
      console.log(controlPoints)

    }
    lastX = x, lastY = y;
  };
}

function draw_curve(gl, a_Position, controlPoints) {
  var cPoints = generatePoints(controlPoints)
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if (a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize');
    return;
  }
  // pass data to floating point
  gl.vertexAttrib1f(a_PointSize, 1.0);

  var len = cPoints.length;

  var vertices = new Float32Array(cPoints);

  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }
  gl.uniform4f(u_FragColor, 1, 0, 0, 1);


  gl.drawArrays(gl.LINE_STRIP, 0, len / 2);
}

function draw_points_lines(gl, a_Position, controlPoints) {
  var cP = []
  for (let i = 0; i < controlPoints.length; i++) {
    cP.push(controlPoints[i][0])
    cP.push(controlPoints[i][1])
  }
  var con_li = new Float32Array(cP);
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if (a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize');
    return;
  }
  // pass data to floating point
  gl.vertexAttrib1f(a_PointSize, 10.0);

  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, con_li, gl.STATIC_DRAW);
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }
  gl.uniform4f(u_FragColor, 0, 1, 0, 1);
  // Draw Control Points
  gl.drawArrays(gl.POINTS, 0, 19);

  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }
  gl.uniform4f(u_FragColor, 1, 1, 1, 1);

  gl.drawArrays(gl.LINE_STRIP, 0, 19);
}

function main() {
  beizerMain(controlPointsUpperLeg);
  // Retrieve <canvas> elementf4
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Set the vertex information
  var n = initVertexBuffers(gl, 'cylinder');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Set the clear color and enable the depth test
  gl.clearColor(.2, .5, .9, 1.0);
  gl.enable(gl.DEPTH_TEST);



  // Get the storage locations of uniform variables 
  // Get the storage locations of uniform variables
  var u_PhongExponent = gl.getUniformLocation(gl.program, 'u_PhongExponent');
  var u_Viewpoint = gl.getUniformLocation(gl.program, 'u_Viewpoint');
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
  var u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
  var u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
  var u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');
  if (!u_ModelMatrix || !u_MvpMatrix || !u_NormalMatrix || !u_LightColor || !u_LightPosition || !u_AmbientLight) {
    console.log('Failed to get the storage location');
    return;
  }


  gl.vertexAttrib1f(u_PhongExponent, 6.0);

  gl.uniform3f(u_Viewpoint, viewX, viewY, viewZ);

  gl.uniform3f(u_LightColor, 1., 1., 1.);
  // Set the light direction (in the world coordinate)
  gl.uniform3f(u_LightPosition, 1.0, 10.0, 10.0);
  // Set the ambient light
  gl.uniform3f(u_AmbientLight, 0.2, 0.2, 0.2);

  var viewProjMatrix = new Matrix4();
  viewProjMatrix.setPerspective(30.0, canvas.width / canvas.height, 1.0, 100.0);
  viewProjMatrix.lookAt(viewX, viewY, viewZ, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Register the event handler to be called on key press
  document.onkeydown = function (ev) { keydown(ev, gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix); };

  frameNum = 0;
  direction = 20;

  var tick = function () {

    ANGLE_STEP1 -= GROUNGSPEED
    if (ANGLE_STEP1 <= -20) {
      ANGLE_STEP1 = 20
    }
    ANGLE_STEP2 -= GROUNGSPEED
    if (ANGLE_STEP2 <= -20) {
      ANGLE_STEP2 = 20
    }
    ANGLE_STEP3 -= GROUNGSPEED
    if (ANGLE_STEP3 <= -20) {
      ANGLE_STEP3 = 20
    }

    ANGLE_STEP4 -= GROUNGSPEED
    if (ANGLE_STEP4 <= -20) {
      ANGLE_STEP4 = 20
    }

    ANGLE_STEP5 -= GROUNGSPEED
    if (ANGLE_STEP5 <= -20) {
      ANGLE_STEP5 = 20
    }

    ANGLE_STEP6 -= GROUNGSPEED
    if (ANGLE_STEP6 <= -20) {
      ANGLE_STEP6 = 20
    }

    ANGLE_STEP7 -= GROUNGSPEED
    if (ANGLE_STEP7 <= -20) {
      ANGLE_STEP7 = 20
    }
    ANGLE_STEP8 -= GROUNGSPEED
    if (ANGLE_STEP8 <= -20) {
      ANGLE_STEP8 = 20
    }
    ANGLE_STEP0 -= GROUNGSPEED
    if (ANGLE_STEP0 <= -20) {
      ANGLE_STEP0 = 20
    }

    g_joint1Angle1 = getAngleFromBeizier(frameNum, controlPointsUpperLeg, 180, 120);
    g_joint1Angle = getAngleFromBeizier((frameNum + 299) % 600, controlPointsUpperLeg, 180, 120);


    g_jointNeeAngle = getAngleFromBeizier(frameNum, controlPointsNee, 0, 80);
    g_jointNeeAngle1 = getAngleFromBeizier((frameNum + 299) % 600, controlPointsNee, 0, 80);

    g_joint2AngleToe = getAngleFromBeizier(frameNum, controlPointsToe, 90, 40);
    g_joint2AngleToe1 = getAngleFromBeizier((frameNum + 299) % 600, controlPointsToe, 90, 40);

    bodyelevation = getAngleFromBeizier((frameNum % 300), controlHights, -1.55, 10);

    draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw the robot arm

    requestAnimationFrame(tick, canvas); // Request that the browser ?calls tick

    frameNum = (frameNum + direction) % 600

  };
  tick();
}


function generatePoints(controlPoints) {
  var cPoints = []
  for (let j = 0; j < (controlPoints.length / 4) + 1; j += 1) {
    let i = j * 3
    var cX = 3 * (controlPoints[i + 1][0] - controlPoints[i + 0][0]),
      bX = 3 * (controlPoints[i + 2][0] - controlPoints[i + 1][0]) - cX,
      aX = controlPoints[i + 3][0] - controlPoints[i + 0][0] - cX - bX;

    var cY = 3 * (controlPoints[i + 1][1] - controlPoints[i + 0][1]),
      bY = 3 * (controlPoints[i + 2][1] - controlPoints[i + 1][1]) - cY,
      aY = controlPoints[i + 3][1] - controlPoints[i + 0][1] - cY - bY;

    for (var k = 0; k < 1; k += .01) {
      var x = (aX * Math.pow(k, 3)) + (bX * Math.pow(k, 2)) + (cX * k) + controlPoints[i + 0][0];
      var y = (aY * Math.pow(k, 3)) + (bY * Math.pow(k, 2)) + (cY * k) + controlPoints[i + 0][1];
      cPoints.push(x);
      cPoints.push(y);
    }
  }
  return cPoints;
}

function getAngleFromBeizier(frameNum, controlPoints, initialAngle, movementAngle) {
  var points = []
  for (let j = 0; j < (controlPoints.length / 4) + 1; j += 1) {
    let i = j * 3
    var cX = 3 * (controlPoints[i + 1][0] - controlPoints[i + 0][0]),
      bX = 3 * (controlPoints[i + 2][0] - controlPoints[i + 1][0]) - cX,
      aX = controlPoints[i + 3][0] - controlPoints[i + 0][0] - cX - bX;

    var cY = 3 * (controlPoints[i + 1][1] - controlPoints[i + 0][1]),
      bY = 3 * (controlPoints[i + 2][1] - controlPoints[i + 1][1]) - cY,
      aY = controlPoints[i + 3][1] - controlPoints[i + 0][1] - cY - bY;

    for (var k = 0; k < 1; k += .01) {
      var x = (aX * Math.pow(k, 3)) + (bX * Math.pow(k, 2)) + (cX * k) + controlPoints[i + 0][0];
      var y = (aY * Math.pow(k, 3)) + (bY * Math.pow(k, 2)) + (cY * k) + controlPoints[i + 0][1];
      points.push([x, y]);
    }
  }

  if (points.length > frameNum) {
    return initialAngle + points[frameNum][1] * movementAngle;
  } else {
    return initialAngle;
  }
}

function keydown(ev, gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix) {
  switch (ev.keyCode) {
    case 49: // Down arrow key -> the positive rotation of joint1 around the z-axis
      beizerMain(controlPointsUpperLeg)
      break;
    case 50: // w key -> the positive rotation of joint1 around the z-axis leg 2
      beizerMain(controlPointsNee)
      break;
    case 51: // Down arrow key -> the negative rotation of joint1 around the z-axis
      beizerMain(controlPointsToe)
      break;
    case 52: // s key -> the negative rotation of joint1 around the z-axis leg 2
      beizerMain(controlHights)
      break;
    case 39: // Right arrow key -> the positive rotation of arm1 around the y-axis
      g_arm1Angle = (g_arm1Angle + 3) % 360;
      break;
    case 37: // Left arrow key -> the negative rotation of arm1 around the y-axis
      g_arm1Angle = (g_arm1Angle - 3) % 360;
      break;

    default: return; // Skip drawing at no effective action
  }
  // Draw the robot arm
  draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);
}

function initVertexBuffers(gl, shape) { // Create a sphere
  var indices = [];

  if (shape === "cylinder") {
    var SPHERE_DIV = 13;

    var i, ai, si, ci;
    var j
    var p1, p2;

    var positions = [];
    var normals = [];

    // Generate coordinates
    // Generate coordinates
    for (j = 0; j <= SPHERE_DIV; j++) {
      for (i = 0; i <= SPHERE_DIV; i++) {
        ai = i * 2 * Math.PI / SPHERE_DIV;
        si = Math.sin(ai);
        ci = Math.cos(ai);

        positions.push(si);  // X
        positions.push(j / SPHERE_DIV);       // Y
        positions.push(ci);  // Z

        normals.push(si);    // X
        normals.push(0);       // Y
        normals.push(ci);
      }
    }
    // Generate indices
    for (j = 0; j < SPHERE_DIV; j++) {
      for (i = 0; i < SPHERE_DIV + 10; i++) {
        p1 = j * (SPHERE_DIV + 1) + i;
        p2 = p1 + (SPHERE_DIV + 1);
        indices.push(p1);
        indices.push(p2);
        indices.push(p1 + 1);
        indices.push(p1 + 1);
        indices.push(p2);
        indices.push(p2 + 1);
      }
    }

    if (!initArrayBuffer(gl, 'a_Position', new Float32Array(positions), gl.FLOAT, 3)) return -1;
    if (!initArrayBuffer(gl, 'a_Normal', new Float32Array(normals), gl.FLOAT, 3)) return -1;
  } else if (shape === "sphere") {

    var SPHERE_DIV = 13;

    var i, ai, si, ci;
    var j, aj, sj, cj;
    var p1, p2;

    var positions = [];

    // Generate coordinates
    for (j = 0; j <= SPHERE_DIV; j++) {
      aj = j * Math.PI / SPHERE_DIV;
      sj = Math.sin(aj);
      cj = Math.cos(aj);
      for (i = 0; i <= SPHERE_DIV; i++) {
        ai = i * 2 * Math.PI / SPHERE_DIV;
        si = Math.sin(ai);
        ci = Math.cos(ai);

        positions.push(si * sj);  // X
        positions.push(cj);       // Y
        positions.push(ci * sj);  // Z
      }
    }

    // Generate indices
    for (j = 0; j < SPHERE_DIV; j++) {
      for (i = 0; i < SPHERE_DIV; i++) {
        p1 = j * (SPHERE_DIV + 1) + i;
        p2 = p1 + (SPHERE_DIV + 1);

        indices.push(p1);
        indices.push(p2);
        indices.push(p1 + 1);

        indices.push(p1 + 1);
        indices.push(p2);
        indices.push(p2 + 1);
      }
    }

    // Write the vertex property to buffers (coordinates and normals)
    // Same data can be used for vertex and normal
    // In order to make it intelligible, another buffer is prepared separately
    if (!initArrayBuffer(gl, 'a_Position', new Float32Array(positions), gl.FLOAT, 3)) return -1;
    if (!initArrayBuffer(gl, 'a_Normal', new Float32Array(positions), gl.FLOAT, 3)) return -1;



  }
  else {

    var vertices = new Float32Array([
      0.5, 1.0, 0.5, -0.5, 1.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0, 0.5, // v0-v1-v2-v3 front
      0.5, 1.0, 0.5, 0.5, 0.0, 0.5, 0.5, 0.0, -0.5, 0.5, 1.0, -0.5, // v0-v3-v4-v5 right
      0.5, 1.0, 0.5, 0.5, 1.0, -0.5, -0.5, 1.0, -0.5, -0.5, 1.0, 0.5, // v0-v5-v6-v1 up
      -0.5, 1.0, 0.5, -0.5, 1.0, -0.5, -0.5, 0.0, -0.5, -0.5, 0.0, 0.5, // v1-v6-v7-v2 left
      -0.5, 0.0, -0.5, 0.5, 0.0, -0.5, 0.5, 0.0, 0.5, -0.5, 0.0, 0.5, // v7-v4-v3-v2 down
      0.5, 0.0, -0.5, -0.5, 0.0, -0.5, -0.5, 1.0, -0.5, 0.5, 1.0, -0.5  // v4-v7-v6-v5 back
    ]);

    // Normal
    var normals = new Float32Array([
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, // v0-v1-v2-v3 front
      1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, // v0-v3-v4-v5 right
      0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // v0-v5-v6-v1 up
      -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
      0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, // v7-v4-v3-v2 down
      0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0  // v4-v7-v6-v5 back
    ]);

    // Indices of the vertices
    indices = new Uint8Array([
      0, 1, 2, 0, 2, 3,    // front
      4, 5, 6, 4, 6, 7,    // right
      8, 9, 10, 8, 10, 11,    // up
      12, 13, 14, 12, 14, 20,    // left
      16, 17, 18, 16, 18, 19,    // down
      20, 21, 22, 20, 22, 23     // back
    ]);

    // Write the vertex property to buffers (coordinates and normals)
    if (!initArrayBuffer(gl, 'a_Position', vertices, gl.FLOAT, 3)) return -1;
    if (!initArrayBuffer(gl, 'a_Normal', normals, gl.FLOAT, 3)) return -1;

  }
  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Write the indices to the buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, attribute, data, type, num) {
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  // Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  return true;
}

// Coordinate transformation matrix
var g_modelMatrix = new Matrix4(), g_mvpMatrix = new Matrix4();

function draw(gl, n, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix) {
  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  var n = initVertexBuffers(gl, 'sphere');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  var bodyHeight = 7.0;
  var neckLength = 2.5;
  var headHIght = 2.5;

  // Head
  g_modelMatrix.setTranslate(0.0, bodyelevation + bodyHeight + neckLength + 2, 0.0);     // Move onto the base
  g_modelMatrix.rotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  g_modelMatrix.rotate(190, 0.0, 0.0, 1.0);  // Rotate around the y-axis

  drawBox(gl, n, 1.8, headHIght, 1.8, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw


  var n = initVertexBuffers(gl, 'cylinder');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Neck
  g_modelMatrix.setTranslate(0.0, bodyelevation + bodyHeight + 1, 0.0);     // Move onto the base
  g_modelMatrix.rotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  drawBox(gl, n, 1.0, neckLength, 1.0, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw



  // Shoulders
  var n = initVertexBuffers(gl, 'sphere');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  g_modelMatrix.setTranslate(0.0, bodyelevation + bodyHeight, 0.0);     // Move onto the base
  g_modelMatrix.rotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  drawBox(gl, n, 2.0, 2, 3.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw

  var n = initVertexBuffers(gl, 'cylinder');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  //BODY
  g_modelMatrix.setTranslate(0.0, bodyelevation, 0.0);     // Move onto the base
  g_modelMatrix.rotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  drawBox(gl, n, 2.0, bodyHeight, 3.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw

  var n = initVertexBuffers(gl, 'sphere');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Butt
  g_modelMatrix.setTranslate(0.0, bodyelevation, 0.0);     // Move onto the base
  g_modelMatrix.rotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  drawBox(gl, n, 2.0, 2, 3.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw

  pushMatrix(g_modelMatrix);

  g_modelMatrix.translate(0.0, -1, 1.8);       // Move to joint1
  g_modelMatrix.rotate(0, 0.0, 0.0, 1.0);  // Rotate around the z-axis
  drawBox(gl, n, 1.8, 1.8, 1.8, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw

  var n = initVertexBuffers(gl, 'cylinder');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Leg 1 Upper part
  var arm2Length = 5.0;
  g_modelMatrix.translate(0.0, 0, 0, 0);       // Move to joint1
  g_modelMatrix.rotate(g_joint1Angle, 0.0, 0.0, 1.0);  // Rotate around the z-axis
  drawBox(gl, n, 1.5, arm2Length, 1.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw

  var n = initVertexBuffers(gl, 'sphere');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }
  g_modelMatrix.translate(0.0, arm2Length, 0.0);       // Move to palm
  g_modelMatrix.rotate(0, 0.0, 0.0, 3.0);  // Rotate around the y-axis
  drawBox(gl, n, 1.5, 1.5, 1.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);  // Draw

  var n = initVertexBuffers(gl, 'cylinder');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }
  // A Lower part Leg 1
  var palmLength = 4.0;
  g_modelMatrix.translate(0.0, 0, 0.0);       // Move to palm
  g_modelMatrix.rotate(g_jointNeeAngle, 0.0, 0.0, 3.0);  // Rotate around the y-axis
  drawBox(gl, n, 1.5, palmLength, 1.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);  // Draw

  var n = initVertexBuffers(gl, 'sphere');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }
  g_modelMatrix.translate(0.0, palmLength, 0.0);       // Move to palm
  g_modelMatrix.rotate(0, 0.0, 0.0, 3.0);  // Rotate around the y-axis
  drawBox(gl, n, 1.5, 1.5, 1.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);  // Draw

  var n = initVertexBuffers(gl, 'cylinder');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }


  // Toe Leg1
  var toeLength = 3.0;
  g_modelMatrix.translate(0, 0, 0.0);       // Move to palm
  g_modelMatrix.rotate(g_joint2AngleToe, 0.0, 0.0, 3.0);  // Rotate around the y-axis
  drawBox(gl, n, 1.5, toeLength, 1.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);  // Draw


  var n = initVertexBuffers(gl, 'sphere');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }
  g_modelMatrix.translate(0.0, 3, 0.0);       // Move to palm
  g_modelMatrix.rotate(0, 0.0, 0.0, 3.0);  // Rotate around the y-axis
  drawBox(gl, n, 1.5, 1.5, 1.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);  // Draw

  g_modelMatrix = popMatrix();

  // ANOTHER LEG

  g_modelMatrix.translate(0.0, -1, -1.8);       // Move to joint1
  g_modelMatrix.rotate(0, 0.0, 0.0, 1.0);  // Rotate around the z-axis
  drawBox(gl, n, 1.8, 1.8, 1.8, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw

  var n = initVertexBuffers(gl, 'cylinder');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Leg 2 Upper part
  g_modelMatrix.translate(0.0, 0, .0);       // Move to joint1
  g_modelMatrix.rotate(g_joint1Angle1, 0.0, 0.0, 1.0);  // Rotate around the z-axis
  drawBox(gl, n, 1.5, arm2Length, 1.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw


  var n = initVertexBuffers(gl, 'sphere');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }
  g_modelMatrix.translate(0.0, arm2Length, 0.0);       // Move to palm
  g_modelMatrix.rotate(0, 0.0, 0.0, 3.0);  // Rotate around the y-axis
  drawBox(gl, n, 1.5, 1.5, 1.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);  // Draw

  var n = initVertexBuffers(gl, 'cylinder');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // A Lower part Leg 2
  g_modelMatrix.translate(0.0, 0, 0.0);       // Move to palm
  g_modelMatrix.rotate(g_jointNeeAngle1, 0.0, 0.0, 1.0);  // Rotate around the y-axis
  drawBox(gl, n, 1.5, palmLength, 1.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);  // Draw


  var n = initVertexBuffers(gl, 'sphere');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }
  g_modelMatrix.translate(0.0, palmLength, 0.0);       // Move to palm
  g_modelMatrix.rotate(0, 0.0, 0.0, 3.0);  // Rotate around the y-axis
  drawBox(gl, n, 1.5, 1.5, 1.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);  // Draw

  var n = initVertexBuffers(gl, 'cylinder');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Toe Leg1
  g_modelMatrix.translate(0, 0, .0);       // Move to palm
  g_modelMatrix.rotate(g_joint2AngleToe1, 0.0, 0.0, 1.0);  // Rotate around the y-axis
  drawBox(gl, n, 1.5, toeLength, 1.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);  // Draw

  var n = initVertexBuffers(gl, 'sphere');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  g_modelMatrix.translate(0.0, 3, 0.0);       // Move to palm
  g_modelMatrix.rotate(0, 0.0, 0.0, 3.0);  // Rotate around the y-axis
  drawBox(gl, n, 1.5, 1.5, 1.5, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix);  // Draw

  var n = initVertexBuffers(gl, 'cylinder');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  var n = initVertexBuffers(gl, '3');
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }


  //Polygon
  g_modelMatrix.setRotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  g_modelMatrix.translate(ANGLE_STEP0, -14, .0);     // Move onto the base
  drawBox(gl, n, polWidth, polHight, polLength, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw
  //Polygon
  g_modelMatrix.setRotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  g_modelMatrix.translate(ANGLE_STEP1, -14, .0);     // Move onto the base
  drawBox(gl, n, polWidth, polHight, polLength, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw

  g_modelMatrix.setRotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  g_modelMatrix.translate(ANGLE_STEP2, -14, .0);     // Move onto the base
  drawBox(gl, n, polWidth, polHight, polLength, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw

  g_modelMatrix.setRotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  g_modelMatrix.translate(ANGLE_STEP3, -14, .0);     // Move onto the base
  drawBox(gl, n, polWidth, polHight, polLength, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw

  g_modelMatrix.setRotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  g_modelMatrix.translate(ANGLE_STEP4, -14, .0);     // Move onto the base
  drawBox(gl, n, polWidth, polHight, polLength, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw

  g_modelMatrix.setRotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  g_modelMatrix.translate(ANGLE_STEP5, -14, .0);     // Move onto the base
  drawBox(gl, n, polWidth, polHight, polLength, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw

  g_modelMatrix.setRotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  g_modelMatrix.translate(ANGLE_STEP6, -14, .0);     // Move onto the base
  drawBox(gl, n, polWidth, polHight, polLength, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw

  g_modelMatrix.setRotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  g_modelMatrix.translate(ANGLE_STEP7, -14, .0);     // Move onto the base
  drawBox(gl, n, polWidth, polHight, polLength, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw

  g_modelMatrix.setRotate(g_arm1Angle, 0.0, 1.0, 0.0);  // Rotate around the y-axis
  g_modelMatrix.translate(ANGLE_STEP8, -14, .0);     // Move onto the base
  drawBox(gl, n, polWidth, polHight, polLength, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix); // Draw



}
var g_matrixStack = []; // Array for storing a matrix
function pushMatrix(m) { // Store the specified matrix to the array
  var m2 = new Matrix4(m);
  g_matrixStack.push(m2);
}
function popMatrix() { // Retrieve the matrix from the array
  return g_matrixStack.pop();
}
var g_normalMatrix = new Matrix4();  // Coordinate transformation matrix for normals

// Draw rectangular solid
function drawBox(gl, n, width, height, depth, viewProjMatrix, u_MvpMatrix, u_NormalMatrix, u_ModelMatrix) {
  pushMatrix(g_modelMatrix);   // Save the model matrix
  // Scale a cube and draw
  g_modelMatrix.scale(width, height, depth);
  // Calculate the model view project matrix and pass it to u_MvpMatrix
  g_mvpMatrix.set(viewProjMatrix);
  g_mvpMatrix.multiply(g_modelMatrix);
  gl.uniformMatrix4fv(u_MvpMatrix, false, g_mvpMatrix.elements);
  // Calculate the normal transformation matrix and pass it to u_NormalMatrix

  gl.uniformMatrix4fv(u_ModelMatrix, false, g_modelMatrix.elements);

  g_normalMatrix.setInverseOf(g_modelMatrix);
  g_normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, g_normalMatrix.elements);
  // Draw
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
  g_modelMatrix = popMatrix();   // Retrieve the model matrix
}

