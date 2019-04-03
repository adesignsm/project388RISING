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

	JJVIDEO1.load();
	JJVIDEO1.play();
	JJVIDEO2.load();
	JJVIDEO2.play();
	JJVIDEO3.load();
	JJVIDEO3.play();

	JJVIDEO1.muted = false;
}

var JJVIDEO1 = document.getElementById("JJVIDEO1");
var JJVIDEO2 = document.getElementById("JJVIDEO2");
var JJVIDEO3 = document.getElementById("JJVIDEO3");

var JJVIDEO1_TEXTURE = new THREE.VideoTexture(JJVIDEO1);
var JJVIDEO2_TEXTURE = new THREE.VideoTexture(JJVIDEO2);
var JJVIDEO3_TEXTURE = new THREE.VideoTexture(JJVIDEO3);

function createVideoMesh1(geom) {

	var material = new THREE.MeshBasicMaterial({map: JJVIDEO1_TEXTURE, side: THREE.DoubleSide});
	var actualMaterial = new THREE.Mesh(geom, material);

	return actualMaterial;
};

function createVideoMesh2(geom) {

	var material = new THREE.MeshBasicMaterial({map: JJVIDEO2_TEXTURE, side: THREE.DoubleSide});
	var actualMaterial = new THREE.Mesh(geom, material);

	return actualMaterial;
};

function createVideoMesh3(geom) {

	var material = new THREE.MeshBasicMaterial({map: JJVIDEO3_TEXTURE, side: THREE.DoubleSide});
	var actualMaterial = new THREE.Mesh(geom, material);

	return actualMaterial;
};

var JJVIDEO1_PLANE = createVideoMesh1(new THREE.PlaneGeometry(8, 5, 1));
var JJVIDEO2_PLANE = createVideoMesh2(new THREE.PlaneGeometry(8, 5, 1));
var JJVIDEO3_PLANE = createVideoMesh3(new THREE.PlaneGeometry(8, 5, 1));

scene.add(JJVIDEO1_PLANE, JJVIDEO2_PLANE, JJVIDEO3_PLANE);

var update = function() {

	JJVIDEO1_PLANE.position.x = -10;
	JJVIDEO1_PLANE.position.z = -4;
	JJVIDEO1_PLANE.rotation.y = 1;

	JJVIDEO2_PLANE.position.x = 10;
	JJVIDEO2_PLANE.position.z = -4;
	JJVIDEO2_PLANE.rotation.y = -1;

	JJVIDEO3_PLANE.position.y = -4;
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