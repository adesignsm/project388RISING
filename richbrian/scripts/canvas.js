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

	RBVIDEO1.load();
	RBVIDEO1.play();
	RBVIDEO2.load();
	RBVIDEO2.play();
	RBVIDEO3.load();
	RBVIDEO3.play();

	RBVIDEO1.muted = false;
}

var RBVIDEO1 = document.getElementById("RBVIDEO1");
var RBVIDEO2 = document.getElementById("RBVIDEO2");
var RBVIDEO3 = document.getElementById("RBVIDEO3");

var RBVIDEO1_TEXTURE = new THREE.VideoTexture(RBVIDEO1);
var RBVIDEO2_TEXTURE = new THREE.VideoTexture(RBVIDEO2);
var RBVIDEO3_TEXTURE = new THREE.VideoTexture(RBVIDEO3);

function createVideoMesh1(geom) {

	var material = new THREE.MeshBasicMaterial({map: RBVIDEO1_TEXTURE, side: THREE.DoubleSide});
	var actualMaterial = new THREE.Mesh(geom, material);

	return actualMaterial;
};

function createVideoMesh2(geom) {

	var material = new THREE.MeshBasicMaterial({map: RBVIDEO2_TEXTURE, side: THREE.DoubleSide});
	var actualMaterial = new THREE.Mesh(geom, material);

	return actualMaterial;
};

function createVideoMesh3(geom) {

	var material = new THREE.MeshBasicMaterial({map: RBVIDEO3_TEXTURE, side: THREE.DoubleSide});
	var actualMaterial = new THREE.Mesh(geom, material);

	return actualMaterial;
};

var RBVIDEO1_PLANE = createVideoMesh1(new THREE.PlaneGeometry(8, 5, 1));
var RBVIDEO2_PLANE = createVideoMesh2(new THREE.PlaneGeometry(8, 5, 1));
var RBVIDEO3_PLANE = createVideoMesh3(new THREE.PlaneGeometry(8, 5, 1));

scene.add(RBVIDEO1_PLANE, RBVIDEO2_PLANE, RBVIDEO3_PLANE);

var update = function() {

	RBVIDEO1_PLANE.position.x = -10;
	RBVIDEO1_PLANE.position.z = -4;
	RBVIDEO1_PLANE.rotation.y = 1;

	RBVIDEO2_PLANE.position.x = 10;
	RBVIDEO2_PLANE.position.z = -4;
	RBVIDEO2_PLANE.rotation.y = -1;

	RBVIDEO3_PLANE.position.y = -4;
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