// Newtab javascript file
// This code looks horrible - please disregard, written years ago, I don't really feel like fixing it

// David Peet

// Initialize Firebase
var config = {
	apiKey: configHIDDEN.apiKey,
	authDomain: configHIDDEN.authDomain,
	databaseURL: configHIDDEN.databaseURL,
	projectId: configHIDDEN.projectId,
	storageBucket: configHIDDEN.storageBucket,
	messagingSenderId: configHIDDEN.messagingSenderId
};
firebase.initializeApp(config);

let fireRef = firebase.database().ref('Tasks');

let TIME = new Date();
let weekdays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

let months = [
	"January",
	"Febuary",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

let clockHour = TIME.getHours();
let clockMin = TIME.getMinutes();
let Today = weekdays[TIME.getDay()];
let DayNum = TIME.getDate();
let sMonth = months[TIME.getMonth()];
let nMonth = TIME.getMonth();
let Year = TIME.getFullYear();


//================================================================================================================

//main
randBack();
let timeOfDay = getTimeOfDay();
document.getElementById("Greet").innerHTML = "Good" + timeOfDay + "David";
document.getElementById("Date").innerHTML += Today + " " + sMonth + " " + DayNum + ", " + Year;

FireBase();
document.getElementById('changeFocus').addEventListener('click', submitForm);
document.addEventListener('keydown', macros);
document.addEventListener('keyup', ctrlreset);

//================================================================================================================

// Determines greeting
function getTimeOfDay() {
	if (clockHour < 11) {
		return " Morning "
	} else if (clockHour < 17) {
		return " Afternoon ";
	} else {
		return " Evening ";
	}
}


//selects random background image for this session
function randBack() {
	let backgrounds = [
		"url(img/desk.jpg)",
		"url(img/desk2.jpg)",
		"url(img/stars.jpg)",
		"url(img/sunset.jpg)",
		"url(img/sunset2.jpg)",
		"url(img/watch.jpg)",
		"url(img/candle.jpg)",
		"url(img/minimalist.jpg)",
		"url(img/minimalist2.jpg)",
		"url(img/lightbulb.jpg)",
		"url(img/hotairbaloon.jpg)",
		"url(img/rocks.jpg)",
	];

	let el = document.getElementById("main").style;
	el.backgroundImage = backgrounds[Math.floor(Math.random() * 12)];
	el.backgroundColor = "rgba(51, 51, 51, 0.8)";
	el.backgroundBlendMode = "multiply";
}
// -------------------------------------------- FIREBASE -------------------------------------------------

function submitForm(e) {
	e.preventDefault();
	let task = document.getElementById('focus').value;
	let newFireRef = fireRef.push();
	newFireRef.set({
		task: task,
		Day: DayNum,
		Month: nMonth,
		Year: Year
	});

	document.getElementById('TaskForm').reset();
}


function FireBase() {
	fireRef.on('value', gotData, errorData); //like setting a listener
}


function gotData(data) {
	if (data.val() != null) {
		console.log(data.val());
		let tasks = data.val();
		let keys = Object.keys(tasks);
		if (DayNum === tasks[keys[0]].Day && nMonth === tasks[keys[0]].Month && Year === tasks[keys[0]].Year) {
			document.getElementById('FBtoDo').innerText = null;
			keys.forEach(el => {
				if (tasks[el].task != "") {
					document.getElementById('FBtoDo').innerHTML += tasks[el].task + ", ";
				}
			});
		} else {
			clearTasks();
		}
	}
}


function errorData(error) {
	console.log('error');
}


function clearTasks() {
	firebase.database().ref().child('Tasks').remove();
}

// ------------------------------------- MACROS ----------------------------------------------

let ctrl = false;

function ctrlreset(event) 
{
	if (event.keyCode == 17) 
	{
		console.log("crtl unpressed");
		ctrl = false;
	}
}

function goto(id)
{
	if (ctrl)
	{ 
		// Simulate a ctrl click
		document.getElementById(id).dispatchEvent(new MouseEvent('click', {ctrlKey: true, button: 0}));
		window.focus();
		return;
	}
	document.getElementById(id).dispatchEvent(new MouseEvent('click'));
}

function macros(event) {
	console.log(event.keyCode);
	if (document.activeElement != document.getElementById('focus')) {
		switch (event.keyCode) {
			case 17:
				console.log("Ctrl pressed");
				ctrl = true;
				break;

			case 71: // G
				console.log("Github");
				goto('github');
				break;

			case 81: // Q
				console.log("Quest");
				goto('quest');
				break;

			case 76: // L
				console.log("Learn");
				goto('learn');
				break;

			case 77: // M
				console.log("GMail");
				goto('mail');
				break;

			case 89: // Y
				console.log("Youtube");
				goto('youtube');
				break;

			case 68: // D
				console.log("Drive");
				goto('drive');
				break;

			case 65: // A
				console.log("Analytics");
				goto('analytics');
				break;

			case 73: // I
				console.log("LinkedIn");
				goto('linkedin');
				break;

			default: console.log("not a macro " + event.keyCode); break;
		}
	}
}


