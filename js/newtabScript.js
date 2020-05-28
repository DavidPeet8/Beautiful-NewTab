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

let links = [
	'https://github.com/',
	'https://www.reddit.com',
	'https://mail.google.com/mail',
	'https://quest.pecs.uwaterloo.ca',
	'https://learn.uwaterloo.ca',
	'https://www.youtube.com/',
	'https://drive.google.com/drive/my-drive',
	'https://analytics.google.com/',
	'https://www.linkedin.com/in/dapeet/'
];



//================================================================================================================

//main
randBack();
let timeOfDay = getTimeOfDay();
document.getElementById("Greet").innerHTML = "Good" + timeOfDay + "David";
document.getElementById("Date").innerHTML += Today + " " + sMonth + " " + DayNum + ", " + Year;

FireBase();
document.getElementById('changeFocus').addEventListener('click', submitForm);
document.addEventListener('keydown', macros);
document.getElementById('github').addEventListener('click', () => {window.open(links[0], '_blank');});
document.getElementById('reddit').addEventListener('click', () => {window.open(links[1], '_blank');});
document.getElementById('mail').addEventListener('click', () => {window.open(links[2], '_blank');});
document.getElementById('quest').addEventListener('click', () => {window.open(links[3], '_blank');});
document.getElementById('learn').addEventListener('click', () => {window.open(links[4], '_blank');});
document.getElementById('youtube').addEventListener('click', () => {window.open(links[5], '_blank');});
document.getElementById('drive').addEventListener('click', () => {window.open(links[6], '_blank');});
document.getElementById('outlook').addEventListener('click', () => {chrome.tabs.create({ url: links[7] });});

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

function macros(event) {
	console.log(event.keyCode);
	if (document.activeElement != document.getElementById('focus')) {
		switch (event.keyCode) {

			case 71:
				console.log("Github");
				chrome.tabs.create({ url: links[0] });
				chrome.tabs.create({ url: links[8] });
				break;

			case 82:
				console.log("Reddit");
				document.location.href = links[1];
				break;

			case 81:
				console.log("Quest");
				document.location.href = links[3];
				break;

			case 76:
				console.log("Learn");
				document.location.href = links[4];
				break;

			case 77:
				console.log("GMail");
				document.location.href = links[2];
				break;

			case 89:
				console.log("Youtube");
				document.location.href = links[5];
				break;

			case 68:
				console.log("Drive");
				document.location.href = links[6];
				break;

			case 65:
				console.log("Analytics");
				chrome.tabs.create({ url: links[7] });
				break;

			default: console.log("not a macro " + event.keyCode); break;
		}
	}
}