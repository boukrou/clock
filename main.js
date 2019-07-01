function handleStyle(s, t, o) {
  if (s === 1) {
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
  var j = setInterval(function() {
    handleStyle(i, t, o);
    if (i > t) {
      document.getElementById(o.fillBack).classList.remove("barBack");
      document.getElementById(o.slice).classList.remove("sliceBack");
      document.getElementById(o.fill).style.transform = "rotate(0deg)";
      clearInterval(j);
    }
    i++
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
    slice: "secondsSlice"
  };
  var mO = {
    fill: "minutesFill",
    fillBack: "minutesFillBack",
    slice: "minutesSlice"
  };
  var hO = {
    fill: "hoursFill",
    fillBack: "hoursFillBack",
    slice: "hoursSlice"
  };

  handleStyle(s, 60, sO);
  handleStyle(m, 60, mO);
  handleStyle(h % 12 ? h % 12 : 0, 12, hO);

  if (s === 0) {
    setTimeout(function() {
      resetStyle(60, sO, 10);
      if (m === 0) {
        resetStyle(60, mO, 10);
        if (h === 12 || h === 0) {
          resetStyle(12, hO, 50);
        }
      }
    }, 150)
  }

  document.getElementById("seconds").innerHTML = s < 10 ? "0" + s : s;
  document.getElementById("minutes").innerHTML = m < 10 ? "0" + m : m;
  document.getElementById("hours").innerHTML = h < 10 ? "0" + h : h;
  document.getElementById("date").innerHTML = day + "/" + (month + 1);

  setTimeout(startTime, 1000);
}

window.onload = startTime;
