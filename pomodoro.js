var _counter = 0;
var _pomodoro = false;
var _pause = true;

var _timer = 0 * 60;
var countdown = setInterval(get_counter, 1000);

var il_work = document.getElementById("work");
var il_short_break = document.getElementById("short_break");
var il_long_break = document.getElementById("long_break");

var work_content;
var short_break_content;
var long_break_content;

function set_countdown() {
  if (!_pomodoro) {
    _counter = _counter + 1;
    _timer = 25 * 60;
    _pomodoro = true;
  } else if (_counter % 4 > 0) {
    _timer = 5 * 60;
    _pomodoro = false;
  } else {
    _timer = 15 * 60;
    _pomodoro = false;
  }
}

function update_status() {
  if (_counter === 0) {
    work_content = "<button>work</button>";
    short_break_content = "<button>short break</button>";
    long_break_content = "<button>long break</button>";
  } else if (_pomodoro) {
    work_content = '<button class="workActive">work</button>';
    short_break_content = "<button>short break</button>";
    long_break_content = "<button>long break</button>";
  } else {
    work_content = "<button>work</button>";
    if (_counter % 4 > 0) {
      short_break_content = '<button class="workActive">short break</button>';
    } else {
      long_break_content = '<button class="workActive">long break</button>';
    }
  }

  il_work.innerHTML = work_content;
  il_short_break.innerHTML = short_break_content;
  il_long_break.innerHTML = long_break_content;
}

function get_counter() {
  if (!_pause) {
    if (_timer === 0) {
      set_countdown();
    }
    _timer = _timer - 1;
  }
  let min = Math.floor(_timer / 60);
  let sec = _timer % 60;
  let sec_string = sec < 10 ? "0" + sec.toString() : sec.toString();

  update_status();
  document.getElementById("countdown").innerHTML =
    min.toString() + ":" + sec_string;

  document.getElementById("pause").innerHTML = _pause ? "START" : "PAUSE";

  document.getElementById("status_text").innerHTML =
    _counter == 0 ? "" : _pomodoro ? "It is time to focus!" : "Take a break!";

  document.getElementById("next_status").innerHTML = !_pomodoro
    ? "work"
    : _counter % 4 > 0
    ? "short break"
    : "long break";
}

function start_pause_pomodoro() {
  _pause = !_pause;
}

function reset() {
  _timer = 0;
  _counter = 0;
  _pomodoro = false;
  _pause = true;
}
