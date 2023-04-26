'use strict';

// ///////////////////////////////////////////

// selectors
const heading = document.querySelector('#level-title');
const container = document.querySelector('.container');

// Variables
let userClickedPattern = [];
let increament = 0;
let nextSound = true;
let a = 0;
let n = 2;
let compare = 0;

// ///////////////////////////////////////
// functions

// Creating Patterns
const createPattern = function () {
	const arr = [];
	for (let i = 0; i < 50; i++) {
		const a = Math.round(Math.random() * 3 + 1);
		arr.push(a);
	}
	return arr;
};

// make Sound
const makeSound = function (curDiv, curSound) {
	const greenAudio = new Audio('sounds/green.mp3');
	const redAudio = new Audio('sounds/red.mp3');
	const yellowAudio = new Audio('sounds/yellow.mp3');
	const blueAudio = new Audio('sounds/blue.mp3');
	const wrongAudio = new Audio('sounds/wrong.mp3');

	if (curSound) {
		if (curDiv == '1') greenAudio.play();
		else if (curDiv == '2') redAudio.play();
		else if (curDiv == '3') yellowAudio.play();
		else if (curDiv == '4') blueAudio.play();
	} else {
		wrongAudio.play();
	}
};

// animation effect
const makeAnimation = function (curDiv) {
	document
		.querySelector(`div[data-number="${curDiv}"]`)
		.classList.add('pressed');
	// removing pressed efffect after 0.1 second
	setTimeout(function () {
		document
			.querySelector(`div[data-number="${curDiv}"]`)
			.classList.remove('pressed');
	}, 100);
};

// game over animation effect
const gameOverAnimation = function () {
	heading.innerHTML = 'Game over,Press any key to start';
	document.querySelector('body').classList.add('game-over');
	setTimeout(function () {
		document.querySelector('body').classList.remove('game-over');
	}, 100);
};

// /////////////////////////////////////////////////////
let pattern = createPattern();

// starting condition
document.addEventListener(
	'keydown',
	function (e) {
		heading.innerHTML = 'Level 1';
		nextSound = true;
		makeAnimation(pattern[0]);
		makeSound(pattern[0], nextSound);
	},
	{ once: true }
);

// click
// /////////////////////////////////////
container.addEventListener('click', function (e) {
	const clicked = e.target;

	// Guard Clause
	if (clicked.classList.contains('btn')) {
		if (nextSound) {
			userClickedPattern.push(Number(clicked.dataset.number));

			makeAnimation(clicked.dataset.number);
			makeSound(clicked.dataset.number, nextSound);

			userClickedPattern.forEach(function (el, i) {
				if (el !== pattern[i]) {
					nextSound = false;
					gameOverAnimation();

					// game over sequence
					// ////////////////////////////////////////////////////////
					document.addEventListener(
						'keydown',
						function (e) {
							heading.innerHTML = 'Level 1';
							nextSound = true;

							// updating pattern
							pattern = createPattern();

							makeAnimation(pattern[0]);
							makeSound(pattern[0], nextSound);

							// updating the variables to intial value
							userClickedPattern = [];
							increament = 0;
							a = 0;
							n = 2;
							compare = 0;
						},
						{ once: true }
					);
				}
			});

			if (a === compare) {
				if (nextSound) {
					setTimeout(function () {
						makeAnimation(pattern[increament]);
						makeSound(pattern[increament]);
					}, 500);
					increament += 1;
					userClickedPattern = [];
					compare = a + n;
					heading.innerHTML = `level ${n - 1}`;
					n++;
				}
			}
		} else {
			gameOverAnimation();
			makeSound(clicked.dataset.number, nextSound);
		}
	} else {
		return;
	}
	a++;
});
