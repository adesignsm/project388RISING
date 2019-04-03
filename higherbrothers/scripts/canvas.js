// window.onload = function() {

// 	alert("1 on the keyboard mutes/unmutes video on the left 2 on the keyboard mutes/unmutes video on the right3 on the keybaord mutes/unmutes video in the center");
// }

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.shadowMapEnabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function() {

	var width = window.innerWidth;
	var height = window.innerHeight;

	renderer.setSize(width, height);

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
});

var controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 10;

var HBVIDEO1 = document.getElementById("HBVIDEO1");
var HBVIDEO2 = document.getElementById("HBVIDEO2");
var HBVIDEO3 = document.getElementById("HBVIDEO3");

HBVIDEO1.load();
HBVIDEO1.play();
HBVIDEO2.load();
HBVIDEO2.play();
HBVIDEO3.load();
HBVIDEO3.play();

var HBVIDEO1_TEXTURE = new THREE.VideoTexture(HBVIDEO1);
var HBVIDEO2_TEXTURE = new THREE.VideoTexture(HBVIDEO2);
var HBVIDEO3_TEXTURE = new THREE.VideoTexture(HBVIDEO3);

var HBVIDEO1_COUNTER = 0;
var HBVIDEO2_COUNTER = 0;
var HBVIDEO3_COUNTER = 0;

document.onkeydown = function(event) {

	//VIDEO1
	if (event.keyCode == 49) {

		if (HBVIDEO1_COUNTER == 0) {

			HBVIDEO1.muted = true;

			HBVIDEO1_COUNTER++;
		
		} else if (HBVIDEO1_COUNTER == 1) {

			HBVIDEO1.muted = false;

			HBVIDEO1_COUNTER--;
		}
	}

	//VIDEO2
	if (event.keyCode == 50) {

		if (HBVIDEO2_COUNTER == 0) {

			HBVIDEO2.muted = false;

			HBVIDEO2_COUNTER++;
		
		} else if (HBVIDEO2_COUNTER == 1) {

			HBVIDEO2.muted = true;

			HBVIDEO2_COUNTER--;
		}
	}

	//VIDEO3
	if (event.keyCode == 51) {

		if (HBVIDEO3_COUNTER == 0) {

			HBVIDEO3.muted = false;

			HBVIDEO3_COUNTER++;
		
		} else if (HBVIDEO3_COUNTER == 1) {

			HBVIDEO3.muted = true;

			HBVIDEO3_COUNTER--;
		}
	}

}

function createVideoMesh1(geom) {

	var material = new THREE.MeshBasicMaterial({map: HBVIDEO1_TEXTURE, side: THREE.DoubleSide});
	var actualMaterial = new THREE.Mesh(geom, material);

	return actualMaterial;
}

function createVideoMesh2(geom) {

	var material = new THREE.MeshBasicMaterial({map: HBVIDEO2_TEXTURE, side: THREE.DoubleSide});
	var actualMaterial = new THREE.Mesh(geom, material);

	return actualMaterial;
}

function createVideoMesh3(geom) {

	var material = new THREE.MeshBasicMaterial({map: HBVIDEO3_TEXTURE, side: THREE.DoubleSide});
	var actualMaterial = new THREE.Mesh(geom, material);

	return actualMaterial;
}

var HBVIDEO1_PLANE = createVideoMesh1(new THREE.PlaneGeometry(8, 5, 1));
var HBVIDEO2_PLANE = createVideoMesh2(new THREE.PlaneGeometry(8, 5, 1));
var HBVIDEO3_PLANE = createVideoMesh3(new THREE.PlaneGeometry(8, 5, 1));

scene.add(HBVIDEO1_PLANE, HBVIDEO2_PLANE, HBVIDEO3_PLANE);

var update = function() {

	HBVIDEO1_PLANE.position.x = -10;
	HBVIDEO1_PLANE.position.z = -4;
	HBVIDEO1_PLANE.rotation.y = 1;

	HBVIDEO2_PLANE.position.x = 10;
	HBVIDEO2_PLANE.position.z = -4;
	HBVIDEO2_PLANE.rotation.y = -1;

	HBVIDEO3_PLANE.position.y = -4;
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