
var setTimePoint = function() {
    releaseMus();
    mus.setTimePoint(!mus.isTimePoint());
    if (mus.isTimePoint()) {
        document.getElementById("timePoint").innerHTML = "Disable time point";
    } else {
        document.getElementById("timePoint").innerHTML = "Enable time point";
    }
};
var setConsoleData = function() {
    var textarea = document.getElementById("console");
    textarea.innerHTML = JSON.stringify(mus.getData());
    textarea.scrollTop = textarea.scrollHeight;
};
var releaseMus = function() {
    mus.release();
    setConsoleData();
};
var toggleRecord = function() {
    if (mus.isPlaying()) return;
    if (!mus.isRecording()) {
        document.getElementById("status").innerHTML = "Recording";
        document.getElementById("recording").innerHTML = "Stop recording";
        mus.record(setConsoleData);
    } else {
        document.getElementById("status").innerHTML = "Stand by";
        document.getElementById("recording").innerHTML = "Start recording";
        mus.stop();
        setConsoleData();
    }
};
var play = function() {
    if (mus.isRecording()) return;
    if (mus.isPlaying()) {
        document.getElementById("play").innerHTML = "Play";
        document.getElementById("status").innerHTML = "Stand by";
        mus.pause();
    } else {
        document.getElementById("play").innerHTML = "Pause";
        document.getElementById("status").innerHTML = "Playing";
        mus.play(function() {
            document.getElementById("play").innerHTML = "Play";
            document.getElementById("status").innerHTML = "Stand by";
        });
    }
};
var setSpeed = function(speed) {
    mus.setPlaybackSpeed(speed);
    if (speed == mus.speed.SLOW) {
        document.getElementById("speed").innerHTML = "Slow";
    } else if (speed == mus.speed.NORMAL) {
        document.getElementById("speed").innerHTML = "Normal";
    } else {
        document.getElementById("speed").innerHTML = "Fast";
    }
};
setConsoleData();