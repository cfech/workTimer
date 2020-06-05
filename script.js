var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var status = "working"

getLocalTime()

function startTimer() {
  // set the time 
  setTime()

  // save to local storage 
  setTimeLocal()

  interval = setInterval(function () {
    secondsElapsed++
    renderTime()
  }, 1000)
}


function setTime() {
  // getting the correct minutes 

  var minutes;

  // choosing which minutes to start with 
  if (status === "working") {
    minutes = workMinutesInput.value
  } else {
    minutes = restMinutesInput.value
  }



  clearInterval(interval);

  totalSeconds = minutes * 60;
  console.log("setTime -> totalSeconds", totalSeconds)

  console.log(minutes)
}




function renderTime() {

  //to get minutes and seconds display 
  minutesDisplay.textContent = getFormattedMinutes()
  secondsDisplay.textContent = getFormattedSeconds()


  // if seconds elapsed is greater than total seconds alert it is done and stop the timer
  if (secondsElapsed >= totalSeconds) {
    if (status === "working") {
      alert("Time for a break")
    } else {
      alert("Time for work")
    }

    stopTimer()
  }

}

// to get minutes 
function getFormattedMinutes() {

// seconds left 
  var secondsLeft = totalSeconds - secondsElapsed;
  console.log("getFormattedMinutes -> secondsElapsed", secondsElapsed)
  console.log("getFormattedMinutes -> secondsLeft", secondsLeft)

  // minutes left 
  var minutesLeft = Math.floor(secondsLeft / 60);

  var formattedMinutes;

  if (minutesLeft < 10) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }

  return formattedMinutes;
}

//to get seconds 
function getFormattedSeconds() {

  // seconds left is how many seconds total seconds - seconds elapsed % 60 will be 
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;

  // declaring the variable
  var formattedSeconds;

  // if less than 10n display 0 + seconds
  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}

// function to stop the timer 
function stopTimer() {
  console.log("timer stopped")

  secondsElapsed = 0

  setTime()
  renderTime()
}


// function to pause timer
function pauseTimer() {
  clearInterval(interval);
  renderTime();
}

// function for registering toggle status
function toggleStatus(event) {
  console.log(event)

  let checked = event.target.checked
  console.log("toggleStatus -> checked", checked)

  if (checked) {
    status = "working"
  } else {
    status = "resting"
  }

  statusSpan.textContent = status

  secondsElapsed = 0

  setTime()
  renderTime()

}


// function for setting user preferences to local storage 
function setTimeLocal() {
  localStorage.setItem("preferences", JSON.stringify({
    workMinutes: workMinutesInput.value,
    restMinutes: restMinutesInput.value
  }))
}


function getLocalTime() {
  var localTime = JSON.parse(localStorage.getItem("preferences"))
  console.log("getLocalTime -> localTime", localTime)

  if (localTime) {
    if (localTime.workMinutes) {
      console.log("setting value ")
      workMinutesInput.value = localTime.workMinutes
    }

    if (localTime.restMinutes) {
      restMinutesInput.value = localTime.restMinutes
    }
  }

  setTime()
  renderTime()
}




// onclick/ change events 
playButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer)
pauseButton.addEventListener("click", pauseTimer)
statusToggle.addEventListener("change", toggleStatus)


// working on dark/ light mode 
var modeToggle = document.getElementById("mode-toggle")

modeToggle.addEventListener("change", changeMode)

function changeMode(event){

var setting = event.target.checked
console.log(event.target)
console.log("changeMode -> setting", setting)

  console.log("changing")

  if(setting){
    document.body.classList.add("dark")
    document.body.classList.remove("light")
  }else{
    document.body.classList.add("light")
    document.body.classList.remove("dark")
  }

}