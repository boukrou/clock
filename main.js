function handleStyle(s, t, o) {
  if (s === 0) {
    document.getElementById(o.fillBack).classList.remove("barBack");
    document.getElementById(o.slice).classList.remove("sliceBack");
  }
  if (s >= t / 2) {
    document.getElementById(o.slice).classList.add("sliceBack");
    document.getElementById(o.fillBack).classList.add("barBack");
  }
  for (var j = 0; j <= s; j++) {
    document.getElementById(o.fill).style.transform =
      "rotate(" + Math.ceil((s * 360) / t) + "deg)";
  }
}

function resetStyle(t, o, f) {
  var i = 0;
  document.getElementById(o.reset).style.display = "block";

  var j = setInterval(function() {
    if (Math.ceil((i * 100) / t) <= 50) {
      document.getElementById(o.reset).style.backgroundImage =
        "linear-gradient(90deg, " +
        o.color +
        " 50%, transparent 50%), linear-gradient(" +
        (90 + Math.ceil((i * 360) / t)) +
        "deg, #424242 50%, " +
        o.color +
        " 50%)";
    } else {
      document.getElementById(o.reset).style.backgroundImage =
        "linear-gradient(" +
        (-270 + Math.ceil((i * 360) / t)) +
        "deg, #424242 50%, transparent 50%, transparent), linear-gradient(270deg, #424242 50%, " +
        o.color +
        " 50%, " +
        o.color +
        ")";
    }
    if (i >= t) {
      document.getElementById(o.fillBack).classList.remove("barBack");
      document.getElementById(o.slice).classList.remove("sliceBack");
      document.getElementById(o.fill).style.transform = "rotate(0deg)";

      clearInterval(j);
      document.getElementById(o.reset).style.display = "none";
    }
    i = i + 0.8;
  }, f);
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var month = today.getMonth();
  var day = today.getDate();

  var sO = {
    fill: "secondsFill",
    fillBack: "secondsFillBack",
    slice: "secondsSlice",
    reset: "secondsReset",
    color: "#29b6f6"
  };
  var mO = {
    fill: "minutesFill",
    fillBack: "minutesFillBack",
    slice: "minutesSlice",
    reset: "minutesReset",
    color: "#ffca28"
  };
  var hO = {
    fill: "hoursFill",
    fillBack: "hoursFillBack",
    slice: "hoursSlice",
    reset: "hoursReset",
    color: "#ef5350"
  };

  if (s === 0) {
    setTimeout(function() {
      resetStyle(60, sO, 10);
      if (m === 0) {
        resetStyle(60, mO, 10);
        if (h === 12 || h === 0) {
          resetStyle(12, hO, 50);
        }
      }
    }, 100);
  } else if (s > 0) {
    handleStyle(s, 60, sO);
    handleStyle(m, 60, mO);
    handleStyle(h % 12 ? h % 12 : 0, 12, hO);
  }

  document.getElementById("seconds").innerHTML = s < 10 ? "0" + s : s;
  document.getElementById("minutes").innerHTML = m < 10 ? "0" + m : m;
  document.getElementById("hours").innerHTML = h < 10 ? "0" + h : h;

  day = day < 10 ? "0" + day : day;
  month = month + 1 < 10 ? "0" + (month + 1) : month + 1;
  document.getElementById("date").innerHTML = day + "/" + month;

  setTimeout(startTime, 1000);
}

window.onload = startTime();
