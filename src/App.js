import { useEffect, useState } from 'react';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Mus from './vendor/mus.js';

function App() {
  const [mus, setMus] = useState({});

  useEffect(() => {
    console.log(typeof Mus);
    const mus = new Mus();
    mus.setPlaybackSpeed(mus.speed.SLOW);

    setMus(mus);

    console.log('initial Mus{} ', mus);
  }, []);

  const setTimePoint = () => {
    restartMus();
    mus.setTimePoint(!mus.isTimePoint());
    if (mus.isTimePoint()) {
        document.getElementById("timePoint").innerHTML = "Disable time point";
    } else {
        document.getElementById("timePoint").innerHTML = "Enable time point";
    }
  }

  const setConsoleData = () => {
    var textarea = document.getElementById("console");
    textarea.innerHTML = JSON.stringify(mus.getData());
    textarea.scrollTop = textarea.scrollHeight;
  }

  const restartMus = () => {
    mus.restart();
    setConsoleData();
  }

  const toggleRecord = () => {
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
        console.log("mus.getData() > ", mus.getData());
    }
  }

  const play = () => {
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
  }

  const setSpeed = speed => {
    mus.setPlaybackSpeed(speed);
    if (speed == mus.speed.SLOW) {
        document.getElementById("speed").innerHTML = "Slow";
    } else if (speed == mus.speed.NORMAL) {
        document.getElementById("speed").innerHTML = "Normal";
    } else {
        document.getElementById("speed").innerHTML = "Fast";
    }
  }

  return (
    <div className="App">
      {/* <header className="App-header">
      mus.js
      </header> */}
      <div className="controls">
        <h1>Mus.js</h1>
        <p>Status: <span id="status"></span></p>
        <p>Speed: <span id="speed">Normal</span></p>
        <br/>
        <button id="recording" onClick={toggleRecord}>Start recording</button>
        <button id="play" onClick={play}>Playback</button>
        <br/>
        <button onClick={() => mus.setPlaybackSpeed(mus.speed.SLOW)}>Slow</button>
        <button onClick={() => mus.setPlaybackSpeed(mus.speed.NORMAL)}>Normal</button>
        <button onClick={() => mus.setPlaybackSpeed(mus.speed.FAST)}>Fast</button>
        <br/>
        <button id="timePoint" onClick={setTimePoint}>Enable time point</button>
        <br/>
        <button onClick={restartMus}>Restart</button>

        <h2>Data console (JSON.stringify())</h2>
        <textarea id="console" rows="12" cols="100"></textarea>
      </div>

      <div className="guide">
        <div className="move-mouse-here">Move mouse here!</div>
        <div className="click-here">Click here!</div>
        <div className="scroll-here">Scroll here!</div>
      </div>

    </div>
  );
}

export default App;
