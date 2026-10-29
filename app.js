// StudentOS Simple JS File
// Priyanshu - CS101 Project

var topZ = 10;
var timerSecs = 25 * 60;
var timerRunning = false;
var timerInterval = null;

// Clock
function updateClock() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;
  var el = document.getElementById("clockBox");
  if (el) el.innerText = h + ":" + m + ":" + s;
}
setInterval(updateClock, 1000);
updateClock();

// Window Show / Hide
function openWin(id) {
  var w = document.getElementById(id);
  if (!w) return;
  w.style.display = "flex";
  topZ++;
  w.style.zIndex = topZ;
}

function closeWin(id) {
  var w = document.getElementById(id);
  if (w) w.style.display = "none";
}

// Simple Drag Function
function dragStart(e, id) {
  var win = document.getElementById(id);
  topZ++;
  win.style.zIndex = topZ;

  var startX = e.clientX;
  var startY = e.clientY;
  var initL = win.offsetLeft;
  var initT = win.offsetTop;

  function doDrag(ev) {
    win.style.left = (initL + ev.clientX - startX) + "px";
    win.style.top = (initT + ev.clientY - startY) + "px";
  }

  function stopDrag() {
    document.removeEventListener("mousemove", doDrag);
    document.removeEventListener("mouseup", stopDrag);
  }

  document.addEventListener("mousemove", doDrag);
  document.addEventListener("mouseup", stopDrag);
}

// Timer
function updateTimer() {
  var m = Math.floor(timerSecs / 60);
  var s = timerSecs % 60;
  if (s < 10) s = "0" + s;
  var el = document.getElementById("timerDisplay");
  if (el) el.innerText = m + ":" + s;
}

function toggleTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
  } else {
    timerRunning = true;
    timerInterval = setInterval(function() {
      if (timerSecs > 0) {
        timerSecs--;
        updateTimer();
      } else {
        clearInterval(timerInterval);
        timerRunning = false;
        alert("Pomodoro timer finished! Take a break.");
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerSecs = 25 * 60;
  updateTimer();
}

// Calculator
var calcVal = "0";
function cPress(k) {
  var scr = document.getElementById("calcScr");
  if (k === "C") {
    calcVal = "0";
  } else if (k === "=") {
    try {
      calcVal = String(eval(calcVal));
    } catch (e) {
      calcVal = "Error";
    }
  } else {
    if (calcVal === "0" || calcVal === "Error") calcVal = k;
    else calcVal += k;
  }
  scr.value = calcVal;
}

// Terminal Command Runner
function runCmd() {
  var inp = document.getElementById("termIn");
  var log = document.getElementById("termLog");
  var cmd = inp.value.trim();
  inp.value = "";
  if (!cmd) return;

  log.innerHTML += "student@os:~$ " + cmd + "<br>";

  if (cmd === "help") {
    log.innerHTML += "Commands: help, ls, whoami, date, clear, echo [msg]<br>";
  } else if (cmd === "ls") {
    log.innerHTML += "homework.cpp  lab_report.txt  notes.txt  study_guide.pdf<br>";
  } else if (cmd === "whoami") {
    log.innerHTML += "student (priyanshu)<br>";
  } else if (cmd === "date") {
    log.innerHTML += new Date().toString() + "<br>";
  } else if (cmd === "clear") {
    log.innerHTML = "";
    return;
  } else if (cmd.indexOf("echo ") === 0) {
    log.innerHTML += cmd.substring(5) + "<br>";
  } else {
    log.innerHTML += "bash: command not found: " + cmd + "<br>";
  }
  log.scrollTop = log.scrollHeight;
}

// Notes
function newNote() {
  document.getElementById("noteTitle").value = "New Note";
  document.getElementById("noteContent").value = "";
}

// Wallpaper
function changeBg(url) {
  document.getElementById("desktop").style.backgroundImage = "url('" + url + "')";
}

// Sticky note local storage
var memo = document.getElementById("memo");
if (memo) {
  memo.value = localStorage.getItem("my_memo") || "CS homework due Friday 11:59PM\nRead chapter 4 of Math book";
  memo.oninput = function() {
    localStorage.setItem("my_memo", memo.value);
  };
}

// Keep cursor active & prevent idle timeout for HackaTime tracking
window.addEventListener("load", function() {
  var termIn = document.getElementById("termIn");
  if (termIn) termIn.focus();
});

// Periodic heartbeat so browser/tracker registers active session
setInterval(function() {
  window.dispatchEvent(new Event("focus"));
}, 25000);

