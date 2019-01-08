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

let links = new Array(8);
links[0] = 'https://github.com/';
links[1] = 'https://www.reddit.com/explore';
links[2] = 'https://mail.google.com/mail';
links[3] = 'https://quest.pecs.uwaterloo.ca/psp/SS/ACADEMIC/SA/?cmd=login&languageCd=ENG';
links[4] = 'https://learn.uwaterloo.ca';
links[5] = 'https://www.youtube.com/';
links[6] = 'https://drive.google.com/drive/my-drive';
links[7] = 'chrome://extensions';


//================================================================================================================

//main
randBack();
let timeOfDay = getTimeOfDay();
let myName;
document.getElementById("Time").innerHTML = clockHour + ":" + twoDig(clockMin);
document.getElementById("Greet").innerHTML = "Good" + timeOfDay + "David";
document.getElementById("Date").innerHTML += Today + " " + sMonth + " " + DayNum + ", " + Year;

FireBase();
document.getElementById('changeFocus').addEventListener('click', submitForm);
document.addEventListener('keydown', macros);
document.getElementById('github').addEventListener('click', ()=> {window.open(links[0], '_blank');});
document.getElementById('reddit').addEventListener('click', ()=> {window.open(links[1], '_blank');});
document.getElementById('mail').addEventListener('click', ()=> {window.open(links[2], '_blank');});
document.getElementById('quest').addEventListener('click', ()=> {window.open(links[3], '_blank');});
document.getElementById('learn').addEventListener('click', ()=> {window.open(links[4], '_blank');});
document.getElementById('youtube').addEventListener('click', ()=> {window.open(links[5], '_blank');});
document.getElementById('drive').addEventListener('click', ()=> {window.open(links[6], '_blank');});
document.getElementById('extensions').addEventListener('click', ()=> {chrome.tabs.create({ url: links[7] });});

//news feed current temperature/weather

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


//weather to add a 0 or not to our time
function twoDig(num) {
	if (num < 10) {
		return "0" + num;
	} else { return num; }
}


//selects random background image for this session
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
// -------------------------------------------- FIREBASE -------------------------------------------------

function submitForm(e) {
	console.log('HI');
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
	console.log("keydown");
	console.log(event.keyCode);
	if (document.activeElement != document.getElementById('focus')) {
		switch (event.keyCode) {

			case 71:
				console.log("Github");
				window.open(links[0], '_blank');
				break;

			case 82:
				console.log("Reddit");
				window.open(links[1], '_blank');
				break;

			case 81:
				console.log("QUEST");
				window.open(links[3], '_blank');
				break;

			case 76:
				console.log("LEARN");
				window.open(links[4], '_blank');
				break;

			case 77:
				console.log("GMail");
				window.open(links[2], '_blank');
				break;

			case 89:
				console.log("Youtube");
				window.open(links[5], '_blank');
				break;

			case 68:
				console.log("Drive");
				window.open(links[6], '_blank');
				break;

			case 69:
				console.log("Extensions");
				chrome.tabs.create({ url: links[7] });
				break;

			default: console.log("not a macro " + event.keyCode); break;
		}
	}
}