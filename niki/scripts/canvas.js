window.onload = function() {

	alert("1 on the keyboard mutes/unmutes video on the left 2 on the keyboard mutes/unmutes video on the right3 on the keybaord mutes/unmutes video in the center");
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function() {

	var width = window.innerWidth;
	var height = window.innerHeight;

	renderer.setSize(width, height);

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});

camera.position.z = 10;
var controls = new THREE.OrbitControls(camera, renderer.domElement);

window.onload = function() {

	NKVIDEO1.load();
	NKVIDEO1.play();
	NKVIDEO2.load();
	NKVIDEO2.play();
	NKVIDEO3.load();
	NKVIDEO3.play();
}

var NKVIDEO1 = document.getElementById("NKVIDEO1");
var NKVIDEO2 = document.getElementById("NKVIDEO2");
var NKVIDEO3 = document.getElementById("NKVIDEO3");

var NKVIDEO1_TEXTURE = new THREE.VideoTexture(NKVIDEO1);
var NKVIDEO2_TEXTURE = new THREE.VideoTexture(NKVIDEO2);
var NKVIDEO3_TEXTURE = new THREE.VideoTexture(NKVIDEO3);

function createVideoMesh1(geom) {

	var material = new THREE.MeshBasicMaterial({map: NKVIDEO1_TEXTURE, side: THREE.DoubleSide});
	var actualMaterial = new THREE.Mesh(geom, material);

	return actualMaterial;
};

function createVideoMesh2(geom) {

	var material = new THREE.MeshBasicMaterial({map: NKVIDEO2_TEXTURE, side: THREE.DoubleSide});
	var actualMaterial = new THREE.Mesh(geom, material);

	return actualMaterial;
};

function createVideoMesh3(geom) {

	var material = new THREE.MeshBasicMaterial({map: NKVIDEO3_TEXTURE, side: THREE.DoubleSide});
	var actualMaterial = new THREE.Mesh(geom, material);

	return actualMaterial;
};

var NKVIDEO1_PLANE = createVideoMesh1(new THREE.PlaneGeometry(8, 5, 1));
var NKVIDEO2_PLANE = createVideoMesh2(new THREE.PlaneGeometry(8, 5, 1));
var NKVIDEO3_PLANE = createVideoMesh3(new THREE.PlaneGeometry(8, 5, 1));

scene.add(NKVIDEO1_PLANE, NKVIDEO2_PLANE, NKVIDEO3_PLANE);

var update = function() {

	NKVIDEO1_PLANE.position.x = -10;
	NKVIDEO1_PLANE.position.z = -4;
	NKVIDEO1_PLANE.rotation.y = 1;

	NKVIDEO2_PLANE.position.x = 10;
	NKVIDEO2_PLANE.position.z = -4;
	NKVIDEO2_PLANE.rotation.y = -1;

	NKVIDEO3_PLANE.position.y = -4;
};

var render = function() {

	renderer.render(scene, camera);
};

var animate = function() {

	requestAnimationFrame(animate);

	update();
	render();
};

animate();