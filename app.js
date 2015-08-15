function createIcoGeo() {
  var geo = new THREE.IcosahedronGeometry(100, 0)

  geo.faceVertexUvs[0] = []
  geo.faces[0].materialIndex = 0
  for (var i = 1; i < geo.faces.length; i++) {
    geo.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 1)
    ])
    geo.faces[i].materialIndex = 1
  }

  return geo
}

var scene = new THREE.Scene()
var renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(300, 300)

var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
camera.position.z = 400
scene.add(camera)

var icoElement = document.getElementById('ico')
icoElement.appendChild(renderer.domElement)

var outlineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide })
var wireframeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, wireframeLinewidth: 5 })
var blackMat = new THREE.MeshBasicMaterial({ color: 0x000000 })
var faceMat = new THREE.MeshFaceMaterial([
  new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('face.png'), side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
])

var faceMesh = new THREE.Mesh(createIcoGeo(), faceMat)
var outlineMesh = new THREE.Mesh(createIcoGeo(), outlineMat)
var panelMesh = new THREE.Mesh(createIcoGeo(), blackMat)
var wireframeMesh = new THREE.Mesh(createIcoGeo(), wireframeMat)

faceMesh.scale.multiplyScalar(0.99)
outlineMesh.scale.multiplyScalar(1.1)
panelMesh.scale.multiplyScalar(0.99)

scene.add(faceMesh)
scene.add(outlineMesh)
scene.add(panelMesh)
scene.add(wireframeMesh)

function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)

  var zRot = 1 / 66
  var xRot = 2 / 50
  var yRot = 2 / 100

  faceMesh.rotation.x      += xRot
  faceMesh.rotation.y      += yRot
  faceMesh.rotation.z      += zRot
  outlineMesh.rotation.x   += xRot
  outlineMesh.rotation.y   += yRot
  outlineMesh.rotation.z   += zRot
  panelMesh.rotation.x     += xRot
  panelMesh.rotation.y     += yRot
  panelMesh.rotation.z     += zRot
  wireframeMesh.rotation.x += xRot
  wireframeMesh.rotation.y += yRot
  wireframeMesh.rotation.z += zRot
}

render()
