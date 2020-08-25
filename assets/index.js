var chord;
var t = document.getElementById("txt");
var nav = document.getElementById('navbar')
var lo, hi;
var midisupport;
var tm;
var played = [];
var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var p;
var inputDev = [];

const synth = new Tone.PolySynth().toDestination();
var chords = [
  { name: "M", keys: [0, 4, 7] },
  { name: "Maj7", keys: [0, 4, 7, 11] },
  { name: "Maj9", keys: [0, 4, 7, 11, 14] },
  { name: "Maj9", keys: [0, 2, 4, 7, 11] },
  { name: "6", keys: [0, 4, 7, 9] },
  { name: "6/9", keys: [0, 4, 7, 9, 14] },
  { name: "6/9", keys: [0, 2, 4, 7, 9] },
  { name: "Maj7#11", keys: [0, 4, 6, 7, 11] },
  { name: "Maj7#11", keys: [0, 4, 7, 11, 18] },
  { name: "Maj13", keys: [0, 4, 7, 11, 21] },
  { name: "Maj13", keys: [0, 4, 7, 9, 11] },
  { name: "m", keys: [0, 3, 7] },

  { name: "minMaj7", keys: [0, 3, 7, 11] },
  { name: "min9", keys: [0, 3, 7, 11, 13] },
  { name: "min9", keys: [0, 2, 3, 7, 11] },
  { name: "m6", keys: [0, 3, 7, 9] },
  { name: "m6/9", keys: [0, 3, 7, 9, 13] },
  { name: "m6/9", keys: [0, 2, 3, 7, 9] },
  { name: "min7#11", keys: [0, 3, 6, 7, 11] },
  { name: "min7#11", keys: [0, 3, 7, 11, 18] },
  { name: "min13", keys: [0, 3, 7, 11, 21] },
  { name: "min13", keys: [0, 3, 7, 9, 11] },
  { name: "7", keys: [0, 4, 7, 10] },
  { name: "m7", keys: [0, 3, 7, 10] },
  { name: "sus2", keys: [0, 2, 7] },
  { name: "sus4", keys: [0, 5, 7] },

  { name: "add9", keys: [0, 4, 7, 14] },
  { name: "add9", keys: [0, 2, 4, 7] },
  { name: "5", keys: [0, 7] },
  { name: "Dim", keys: [0, 3, 6] },
  { name: "Aug", keys: [0, 4, 8] },

  { name: "M-5", keys: [0, 4, 6] },
  { name: "Maj7-5", keys: [0, 4, 6, 11] },
  { name: "Maj9-5", keys: [0, 4, 6, 11, 14] },
  { name: "Maj9-5", keys: [0, 2, 4, 6, 11] },
  { name: "6-5", keys: [0, 4, 6, 9] },
  { name: "6/9-5", keys: [0, 4, 6, 9, 14] },
  { name: "6/9-5", keys: [0, 2, 4, 6, 9] },

  { name: "Maj13-5", keys: [0, 4, 6, 11, 21] },
  { name: "Maj13-5", keys: [0, 4, 6, 9, 11] },
  { name: "m-5", keys: [0, 3, 6] },

  { name: "minMaj7-5", keys: [0, 3, 6, 11] },
  { name: "min9-5", keys: [0, 3, 6, 11, 13] },
  { name: "min9-5", keys: [0, 2, 3, 6, 11] },
  { name: "m6-5", keys: [0, 3, 6, 9] },
  { name: "m6/9-5", keys: [0, 3, 6, 9, 13] },
  { name: "m6/9-5", keys: [0, 2, 3, 6, 9] },

  { name: "min13-5", keys: [0, 3, 6, 11, 21] },
  { name: "min13-5", keys: [0, 3, 6, 9, 11] },
  { name: "7-5", keys: [0, 4, 6, 10] },
  { name: "m7-5", keys: [0, 3, 6, 10] },
  { name: "sus2-5", keys: [0, 2, 6] },
  { name: "sus4-5", keys: [0, 5, 6] },

  { name: "add9-5", keys: [0, 4, 6, 14] },
  { name: "add9-5", keys: [0, 2, 4, 6] },
  { name: "M+5", keys: [0, 4, 8] },
  { name: "Maj7+5", keys: [0, 4, 8, 11] },
  { name: "Maj9+5", keys: [0, 4, 8, 11, 14] },
  { name: "Maj9+5", keys: [0, 2, 4, 8, 11] },
  { name: "6+5", keys: [0, 4, 8, 9] },
  { name: "6/9+5", keys: [0, 4, 8, 9, 14] },
  { name: "6/9+5", keys: [0, 2, 4, 8, 9] },

  { name: "Maj13+5", keys: [0, 4, 8, 11, 21] },
  { name: "Maj13+5", keys: [0, 4, 8, 9, 11] },
  { name: "m+5", keys: [0, 3, 8] },

  { name: "minMaj7+5", keys: [0, 3, 8, 11] },
  { name: "min9+5", keys: [0, 3, 8, 11, 13] },
  { name: "min9+5", keys: [0, 2, 3, 8, 11] },
  { name: "m6+5", keys: [0, 3, 8, 9] },
  { name: "m6/9+5", keys: [0, 3, 8, 9, 13] },
  { name: "m6/9+5", keys: [0, 2, 3, 8, 9] },

  { name: "min13+5", keys: [0, 3, 8, 11, 21] },
  { name: "min13+5", keys: [0, 3, 8, 9, 11] },
  { name: "7+5", keys: [0, 4, 8, 10] },
  { name: "m7+5", keys: [0, 3, 8, 10] },
  { name: "sus2+5", keys: [0, 2, 8] },
  { name: "sus4+5", keys: [0, 5, 8] },

  { name: "add9+5", keys: [0, 4, 8, 14] },
  { name: "add9+5", keys: [0, 2, 4, 8] },

  //incomplete chords
  { name: "M(no5)", keys: [0, 4] },
  { name: "Maj7(no5)", keys: [0, 4, 11] },
  { name: "Maj9(no5)", keys: [0, 4, 11, 14] },
  { name: "Maj9(no5)", keys: [0, 2, 4, 11] },
  { name: "6(no5)", keys: [0, 4, 9] },
  { name: "6/9(no5)", keys: [0, 4, 9, 14] },
  { name: "6/9(no5)", keys: [0, 2, 4, 9] },

  { name: "Maj13(no5)", keys: [0, 4, 11, 21] },
  { name: "Maj13(no5)", keys: [0, 4, 9, 11] },
  { name: "m(no5)", keys: [0, 3] },

  { name: "minMaj7(no5)", keys: [0, 3, 11] },
  { name: "min9(no5)", keys: [0, 3, 11, 13] },
  { name: "min9(no5)", keys: [0, 2, 3, 11] },
  { name: "m6(no5)", keys: [0, 3, 9] },
  { name: "m6/9(no5)", keys: [0, 3, 9, 13] },
  { name: "m6/9(no5)", keys: [0, 2, 3, 9] },

  { name: "min13(no5)", keys: [0, 3, 11, 21] },
  { name: "min13(no5)", keys: [0, 3, 9, 11] },
  { name: "7(no5)", keys: [0, 4, 10] },
  { name: "m7(no5)", keys: [0, 3, 10] },
  { name: "sus2(no5)", keys: [0, 2] },
  { name: "sus4(no5)", keys: [0, 5] },
  { name: "add9(no5)", keys: [0, 4, 14] },
  { name: "add9(no5)", keys: [0, 2, 4] },

  { name: "M9(no7)", keys: [0, 4, 7, 14] },
  { name: "M9(no7)", keys: [0, 2, 4, 7] },
  { name: "Maj7#11(no7)", keys: [0, 4, 6, 7] },
  { name: "Maj7#11(no7)", keys: [0, 4, 7, 18] },
  { name: "Maj13(no7)", keys: [0, 4, 7, 21] },
  { name: "Maj13(no7)", keys: [0, 4, 7, 9] },
  { name: "m9(no7)", keys: [0, 3, 7, 14] },
  { name: "m9(no7)", keys: [0, 2, 3, 7] },
  { name: "min7#11(no7)", keys: [0, 3, 6, 7] },
  { name: "min7#11(no7)", keys: [0, 3, 7, 18] },
  { name: "min13(no7)", keys: [0, 3, 7, 21] },
  { name: "min13(no7)", keys: [0, 3, 7, 9] },
];

function setLow(n) {
  lo = n;
  t.innerHTML = "Press the highest note";
}

function setHigh(n) {
  t.className = 'txt'
  t.innerHTML = "Generating Chord list";
  nav.className = 'navbar-anim'
  setTimeout(function () {
    hi = n;
    chord = getChordList();
  }, 4000);
}

init()
navigator.permissions.query({ name: "midi" }).then((PermissionStatus) => {
  
  if (PermissionStatus.state == "granted") {
    navigator.requestMIDIAccess().then(onMIDISuccess, onFailed);
  }
});

function onFailed() {
  t.innerHTML = "This Browser Doesn't Support MIDI";
}
function compare(a, b) {
  if (a.toString() == b.toString()) {
    return true;
  } else {
    false;
  }
}

function onMIDISuccess(midiAccess) {

  
  var tm;
  for (var input of midiAccess.inputs.values()) {
    input.onstatechange = function () {
      init()
      if (this.connection == "open") {
        lo = undefined;
        hi = undefined;
        t.innerHTML = "Press the lowest note";
      } else {
        inputDev.splice(inputDev.indexOf(input.name), 1);
        tm = setTimeout(function () {
          if (inputDev.length < 1) {
            t.innerHTML = "No MIDI Device";
          }
        }, 100);
      }
    };
    input.onmidimessage = getMIDIMessage;
  }
}

function init(){
if(inputDev.length<1){
  t.innerHTML = "No MIDI Device";
}
else{
  t.innerHTML = "Press the lowest note";

}
}


function getChordList() {
  var name, keys, nm;
  var list = {};
  var pl, h1, h2, x1, x2, y1, y2;
  chords.forEach(function (x) {
    for (var i = lo; i < hi; i++) {
      var holder = add(x.keys, i);
      name = holder[1] + x.name;
      keys = holder[0];
      if (Math.max(...keys) <= hi) {
        if (list[keys] == undefined) {
          list[keys] = name;
        }
      }

      var k;
      for (var j = lo; j <= hi; j++) {
        if (j < i) {
          if (j % 12 != i % 12) {
            var holder = addSlash(x.keys, i, j);
            name = holder[1] + x.name + "/" + holder[2];
            keys = holder[0];
            if (Math.max(...keys) <= hi) {
              if (list[keys] == undefined) {
                list[keys] = name;
              }
            }
          }
          chords.forEach((poly) => {
            pl = poly.keys;
            h1 = add(pl, j);
            h2 = add(x.keys, i);
            x1 = h1[0];
            y1 = h1[1];
            x2 = h2[0];
            y2 = h2[1];
            keys = x1.concat(x2).sort(function (a, b) {
              return a - b;
            });
            name = y2 + x.name + "/" + y1 + poly.name;
            if (Math.max(...keys) <= hi) {
              if (list[keys] == undefined) {
                list[keys] = name;
              }
            }
          });
        }
      }
    }
  });
  t.className=''
  nav.className=''
  t.innerHTML = "Ready";
  return list;
}

nav.onclick=function(){
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
}
}

function getMIDIMessage(midiMessage) {
  var e = midiMessage.data[1];
  

  if (midiMessage.data[0] == 144) {
    if (lo == undefined && hi == undefined) {
      setLow(e);
    } else if (lo != undefined && hi == undefined) {
      setHigh(e);
    } else {
      played.push(e);

      play(e)
      

      if (played.length == 1) {
        setTimeout(() => {
          if (played[0] <= hi) {
            t.innerHTML = notes[played[0] % 12];
          }
          
          
        }, 5);
        
      } else {

        p = played.sort(function (a, b) {
          return a - b;
        });
        if (chord[p.toString()] != undefined) {
          t.innerHTML = chord[p.toString()];
          try {
            clearTimeout(tm);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  } else {
    release(e)
    played.splice(played.indexOf(e), 1);
    if (hi != undefined && lo != undefined) {
      t.innerHTML = "";

    }
  }
}

function add(l, num) {
  var a = [];
  for (var i = 0; i < l.length; i++) {
    a.push(l[i] + num);
  }
  return [
    a.sort(function (a, b) {
      return a - b;
    }),
    notes[Math.floor(num % 12)],
  ];
}

function addSlash(l, num, num2) {
  var a = [];
  for (var i = 0; i < l.length; i++) {
    a.push(l[i] + num);
  }
  a.sort(function (a, b) {
    return a - b;
  });
  a.unshift(num2);

  return [a, notes[Math.floor(num % 12)], notes[Math.floor(num2 % 12)]];
}

function play(note) {
  if(note>=lo && note <=hi){
    synth.triggerAttack(notes[note%12]+Math.floor(note/12), 0)
  }
  
}

function release(note) {
  if(note>=lo && note <=hi){
    synth.triggerRelease(notes[note%12]+Math.floor(note/12), 1)
  }
  
}