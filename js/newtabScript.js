// Newtab javascript file

//David Peet

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
let weekdays = new Array(7);
weekdays[0] = "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";

let months = new Array(12);
months[0] = "January";
months[1] = "Febuary";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

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
let myName;
document.getElementById("Time").innerHTML = clockHour + ":" + twoDig(clockMin);
document.getElementById("Greet").innerHTML = "Good" + timeOfDay + "David";
document.getElementById("Date").innerHTML += Today + " " + sMonth + " " + DayNum + ", " + Year;

readFireBase();
document.getElementById('changeFocus').addEventListener('click', submitForm);

//news feed current temperature/weather

//================================================================================================================

function getTimeOfDay() {
	if (clockHour < 11) {
		return " Morning "
	} else if (clockHour < 17) {
		return " Afternoon ";
	} else {
		return " Evening ";
	}
}

function twoDig(num) {
	if (num < 10) {
		return "0" + num;
	} else { return num; }
}
function randBack() {
	let backgrounds = new Array(12);
	backgrounds[0] = "url(img/desk.JPG) no-repeat fixed center";
	backgrounds[1] = "url(img/desk2.JPG) no-repeat fixed center";
	backgrounds[2] = "url(img/stars.JPG) no-repeat fixed center";
	backgrounds[3] = "url(img/sunset.JPG) no-repeat fixed center";
	backgrounds[4] = "url(img/sunset2.JPG) no-repeat fixed center";
	backgrounds[5] = "url(img/watch.JPG) no-repeat fixed center";
	backgrounds[6] = "url(img/candle.JPG) no-repeat fixed center";
	backgrounds[7] = "url(img/minimalist.JPG) no-repeat fixed center";
	backgrounds[8] = "url(img/minimalist2.JPG) no-repeat fixed center";
	backgrounds[9] = "url(img/lightbulb.JPG) no-repeat fixed center";
	backgrounds[10] = "url(img/hotairbaloon.JPG) no-repeat fixed center";
	backgrounds[11] = "url(img/rocks.JPG) no-repeat fixed center";

	document.getElementById("main").style.background = backgrounds[Math.floor(Math.random() * 12)];
	document.getElementById("main").style.backgroundSize = "cover";
	document.getElementById("main").style.backgroundColor = "rgba(51, 51, 51, 0.8)";
	document.getElementById("main").style.backgroundBlendMode = "multiply";
}

function submitForm(e) {
	console.log('HI');
	e.preventDefault();
	let task = document.getElementById('focus').value;
	let newFireRef = fireRef.push();
	newFireRef.set({
		task: task,
		date: DayNum,
	});

	document.getElementById('TaskForm').reset();
}

function readFireBase() {
	fireRef.on('value', gotData, errorData);
}

function gotData(data) {
	if (data.val() != null) {
		console.log(data.val());
		let tasks = data.val();
		let keys = Object.keys(tasks);
		if (DayNum = tasks[keys[0]].date) {
			document.getElementById('FBtoDo').innerText = null;
			keys.forEach(el => {
				if (tasks[el].task != "") {
					document.getElementById('FBtoDo').innerHTML += tasks[el].task + ", ";
				}
			});
		}else{
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