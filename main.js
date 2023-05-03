import './style.css'

import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scaleFactor = 2000;

const clock = new THREE.Clock();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffffff, 1);
camera.position.setZ(50);
camera.position.setY(50);

let mixerJump;
let mixerSwim;

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

// Ribs and Forearms = frog.children[0];
// Left Forearm = frog.children[0].children[0];
// Right Forearm = frog.children[0].children[1];

// Skull = frog.children[1];
// Vertebrae = frog.children[i], i = 2, 3, 4, 5, 6, 7, 8;

// Hip and Hind Legs = frog.children[9];
// Left Hind Leg = frog.children[9].children[0];
// Left Hind Leg's shin + Toes = frog.children[9].children[0].children[0];

// Right Hind Leg = frog.children[9].children[1];
// Right Hind Leg's shin + Toes = frog.children[9].children[1].children[0];

// Left arms fingers = frog.children[10];
// Right arms fingers = frog.children[11];



let origX=0, origZ=0, origXRot=0, origZRot=0;


function scaleModel(model){
	model.scale.set(scaleFactor, scaleFactor, scaleFactor);
}
function moveForward(model,origModel){
	model.position.x += 0.5;
	origModel.position.x += 0.5;
	origX += 0.5;
}
function moveBackward(model, origModel){
	model.position.x -= 0.5;
	origModel.position.x -= 0.5;
	origX -= 0.5;
}
function moveLeft(model, origModel){
	model.position.z -= 0.5;
	origModel.position.z -= 0.5;
	origZ -= 0.5;
}
function moveRight(model, origModel){
	model.position.z += 0.5;
	origModel.position.z += 0.5;
	origZ += 0.5;
	
}
function rotateForward(model, origModel){
	model.rotation.z -= 0.2;
	origModel.rotation.z -= 0.2;
	origZRot -= 0.2;		
}
function rotateBackward(model, origModel){
	model.rotation.z += 0.2;
	origModel.rotation.z += 0.2;	
	origZRot += 0.2;
}	
function rotateLeft(model, origModel){
	model.rotation.x -= 0.2;
	origModel.rotation.x -= 0.2;
	origXRot -= 0.2;	
}	
function rotateRight(model, origModel){
	model.rotation.x += 0.2;
	origModel.rotation.x += 0.2;
	origXRot += 0.2;	
}	

function extendFrontLegs(model){
	model.children[0].children[0].rotation.x = 0.3 + origXRot/(scaleFactor*scaleFactor);
	model.children[0].children[0].rotation.y = 0.3;
	model.children[0].children[0].rotation.z = -0.3 + origZRot/(scaleFactor*scaleFactor);
	model.children[0].children[0].position.x = -0.0017 + origX/(scaleFactor*scaleFactor);
	model.children[0].children[0].position.y = 0.0018;
	model.children[0].children[0].position.z = 0.003 + origX/(scaleFactor*scaleFactor);

	model.children[0].children[1].rotation.x = 0.3 + origXRot/(scaleFactor*scaleFactor);
	model.children[0].children[1].rotation.y = -0.3;
	model.children[0].children[1].rotation.z = -0.3 + origZRot/(scaleFactor*scaleFactor);
	model.children[0].children[1].position.x = -0.0017 + origX/(scaleFactor*scaleFactor);
	model.children[0].children[1].position.y = 0.0018;
	model.children[0].children[1].position.z = -0.003 + origX/(scaleFactor*scaleFactor);

	model.children[10].position.x = 0.0045 + origX/(scaleFactor*scaleFactor);
	model.children[10].position.y = -0.0015;
	model.children[10].position.z = -0.0045 + origZ/(scaleFactor*scaleFactor);
	model.children[10].rotation.x = 0 + origX/(scaleFactor*scaleFactor);
	model.children[10].rotation.y = 2.5;
	model.children[10].rotation.z = 1.5 + origZRot/(scaleFactor*scaleFactor);

	model.children[11].position.x = 0.004 + origX/(scaleFactor*scaleFactor);
	model.children[11].position.y = -0.0012;
	model.children[11].position.z = 0.005 + origZ/(scaleFactor*scaleFactor);
	model.children[11].rotation.x = 0 + origX/(scaleFactor*scaleFactor);
	model.children[11].rotation.y = 3.5;
	model.children[11].rotation.z = 4.5 + origZRot/(scaleFactor*scaleFactor);
}

function extendRearLegs(model){
	model.children[9].children[0].rotation.x = -0.3 + origXRot/(scaleFactor*scaleFactor);
	model.children[9].children[0].rotation.y = 0.5;
	model.children[9].children[0].rotation.z = 0.3 + origZRot/(scaleFactor*scaleFactor);
	model.children[9].children[0].position.x = 0.004 + origX/(scaleFactor*scaleFactor);
	model.children[9].children[0].position.y = 0.004;
	model.children[9].children[0].position.z = -0.009 + origZ/(scaleFactor*scaleFactor);

	model.children[9].children[0].children[0].rotation.x = 3 + origXRot/(scaleFactor*scaleFactor);
	model.children[9].children[0].children[0].rotation.y = 0.5;
	model.children[9].children[0].children[0].rotation.z = 5.5 + origZRot/(scaleFactor*scaleFactor);
	model.children[9].children[0].children[0].position.x = 0.007 + origX/(scaleFactor*scaleFactor);
	model.children[9].children[0].children[0].position.y = -0.0004;
	model.children[9].children[0].children[0].position.z = -0.004 + origZ/(scaleFactor*scaleFactor);
	
	

	model.children[9].children[1].rotation.x = 0.3 + origXRot/(scaleFactor*scaleFactor);
	model.children[9].children[1].rotation.y = -0.5;
	model.children[9].children[1].rotation.z = -0.3 + origZRot/(scaleFactor*scaleFactor);
	model.children[9].children[1].position.x = -0.005 + origX/(scaleFactor*scaleFactor);
	model.children[9].children[1].position.y = 0.005;
	model.children[9].children[1].position.z = -0.008 + origZ/(scaleFactor*scaleFactor);

	model.children[9].children[1].children[0].rotation.x = 2.5 + origXRot/(scaleFactor*scaleFactor);
	model.children[9].children[1].children[0].rotation.y = 3;
	model.children[9].children[1].children[0].rotation.z = 2.5 + origZRot/(scaleFactor*scaleFactor);
	model.children[9].children[1].children[0].position.x = 0.005 + origX/(scaleFactor*scaleFactor);
	model.children[9].children[1].children[0].position.y = 0.0025;
	model.children[9].children[1].children[0].position.z = 0.003 + origZ/(scaleFactor*scaleFactor);
}

function lookLeft(model){
	model.children[1].rotation.x = -2 + origXRot/(scaleFactor*scaleFactor);
	model.children[1].rotation.z = -1 + origZRot/(scaleFactor*scaleFactor);
}

function lookRight(model){
	model.children[1].rotation.z = -2 + origZRot/(scaleFactor*scaleFactor);
	model.children[1].rotation.x = -1 + origXRot/(scaleFactor*scaleFactor);
}

var aniamtionDone = false;

function playAnimations(gltf, modelJ){
	mixerJump = new THREE.AnimationMixer( modelJ );
	const clips = gltf.animations;
	clips.forEach(function(clip){
		const action = mixerJump.clipAction( clip );
		action.setLoop(THREE.LoopOnce);
		action.clampWhenFinished = true;
		action.enable = true;
		action.play();
	});
	aniamtionDone = true;
}

function jump(model, origModel){
	scene.remove(model);
	const jumper = new GLTFLoader();
	jumper.load( 'Jump.glb', function ( gltf ) {
		var modelJ = gltf.scene;
		scaleModel(modelJ);
		scene.add( modelJ );
		playAnimations(gltf, modelJ);
		setTimeout(function(){
			scene.remove(modelJ);
		}
		, 2000);
	});
};

function swim(model, origModel){
	scene.remove(model);
	const jumper = new GLTFLoader();
	jumper.load( 'Swim.glb', function ( gltf ) {
		var modelS = gltf.scene;
		scaleModel(modelS);
		scene.add( modelS );
		playAnimations(gltf, modelS);
		setTimeout(function(){
			scene.remove(modelS);
		}
		, 2000);
	});
};

function vertexShader() {
	return `
		varying vec3 vec; 
	
		void main() {
			vec = position; 
	
			vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
			gl_Position = projectionMatrix * modelViewPosition; 
		}
		`
  }

function fragmentShader() {
	return `
		uniform vec3 colorA; 
		uniform vec3 colorB; 
		varying vec3 vUv;

		void main() {
			gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
		}
		`
}

let material =  new THREE.ShaderMaterial({
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
  })

const frog = new GLTFLoader();
frog.load( 'FrogFinal.glb', function ( gltf ) {
	var model = gltf.scene;
	model.ShaderMaterial = material;
	scaleModel(model);
	var origModel = model.clone();
	scene.add( model );

	document.addEventListener('keydown', event => {
		if(event.shiftKey && event.key === 'ArrowLeft'){
			rotateLeft(model, origModel);
			console.log('Shift + left arrow key');
		}
		if(event.shiftKey && event.key === 'ArrowUp'){
			rotateForward(model, origModel);
			console.log('Shift + up arrow key');
		}
		if(event.shiftKey && event.key === 'ArrowRight'){
			rotateRight(model, origModel);
			console.log('Shift + right arrow key');
		}
		if(event.shiftKey && event.key === 'ArrowDown'){
			rotateBackward(model, origModel);
			console.log('Shift + down arrow key');
		}
		if(event.key === 'ArrowLeft' && !event.shiftKey){
			moveLeft(model, origModel);
			console.log('Left arrow key');
		}
		if(event.key === 'ArrowUp' && !event.shiftKey){
			moveForward(model, origModel);
			console.log('Up arrow key');
		}
		if(event.key === 'ArrowRight' && !event.shiftKey){
			moveRight(model, origModel);
			console.log('Right arrow key');
		}
		if(event.key === 'ArrowDown' && !event.shiftKey){
			moveBackward(model, origModel);
			console.log('Down arrow key');
		}
	});

	document.addEventListener('keypress', event => {
		if (event.key === 'w') {
			// Extend front legs
			extendFrontLegs(model);
			console.log('w key');
		}
		if (event.key === 'a') {
			// Make frog turn left
			lookLeft(model);
			console.log('a key');
		}
		if (event.key === 's') {
			// Extend rear legs
			extendRearLegs(model);
			console.log('s key');
		}
		if (event.key === 'd') {
			// Make frog turn right
		    lookRight(model);
			console.log('d key');
		}
		if (event.key === 'q') {
			// Swim
			swim(model,origModel);
		}
		if (event.key === 'j') {
			// Jump
			jump(model,origModel);
		}
	});
	document.addEventListener('keyup', event => {
		if (event.key === 'q') {
			let temp = true;
			while(temp){
				setTimeout(function(){
					scene.remove(model);
					model = origModel.clone();
					scene.add(model);}, 
				1800);
				temp = false;
			}
		}
		if (event.key === 'j') {
			let temp = true;
			while(temp){
				setTimeout(function(){
					scene.remove(model);
					model = origModel.clone();
					scene.add(model);}, 
				2000);
				temp = false;
			}
		}
		if (event.key === 'w') {
			scene.remove(model);
			model = origModel.clone();
			scene.add(model);
		}
		if (event.key === 'a') {
			scene.remove(model);
			model = origModel.clone();
			scene.add(model);
		}
		if (event.key === 's') {
			scene.remove(model);
			model = origModel.clone();
			scene.add(model);
		}
		if (event.key === 'd') {
			scene.remove(model);
			model = origModel.clone();
			scene.add(model);
		}
	});

}, undefined, function ( e ) {
	console.error( e );
});

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(30,30,30);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(30,30,30);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);


function animate(){
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	controls.update();
	if(mixerJump){
		mixerJump.update(clock.getDelta());
	}
	if(mixerSwim){
		mixerJump.update(clock.getDelta());
	}
}
animate();
