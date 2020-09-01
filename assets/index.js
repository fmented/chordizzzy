var chord;

var t = document.getElementById("txt");

var alt = document.getElementById("alt");

var nav = document.getElementById('navbar')

var lo, hi;

var midisupport;

var tm;

var played = [];

var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

var p;

var inputDev = [];

const synth = new Tone.PolySynth({
  polyphony:2,
  voice: Tone.Synth,
}).toDestination();

const synth2 = new Tone.PolySynth({
  polyphony:2,
  voice: Tone.Synth,
}).toDestination();

nav.onclick=function(){
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
}
else{
  Tone.start()
}
}

var chords = [
  { name: "M", keys: [0, 4, 7] },
  { name: "-5", keys: [0, 4, 6] },
  { name: "Aug", keys: [0, 4, 8] },
  
  { name: "(add2)", keys: [0, 2, 4, 7] },
  { name: "(add4)", keys: [0, 4, 5, 7] },
  { name: "(add-5)", keys: [0, 4, 6, 7] },
  { name: "(add+5)", keys: [0, 4, 7, 8] },
  { name: "(add9)", keys: [0, 4, 7, 14] },
  { name: "(add11)", keys: [0, 4, 7, 17] },
  { name: "(add13)", keys: [0, 4, 7, 21] },
  
  { name: "-5(add2)", keys: [0, 2, 4, 6] },
  { name: "-5(add4)", keys: [0, 4, 5, 6] },
  { name: "-5(add+5)", keys: [0, 4, 6, 8] },
  { name: "-5(add9)", keys: [0, 4, 6, 14] },
  { name: "-5(add11)", keys: [0, 4, 6, 17] },
  { name: "-5(add13)", keys: [0, 4, 6, 21] },
  
  { name: "Aug(add2)", keys: [0, 2, 4, 8] },
  { name: "Aug(add4)", keys: [0, 4, 5, 8] },
  { name: "Aug(add-5)", keys: [0, 4, 6, 8] },
  { name: "Aug(add9)", keys: [0, 4, 8, 14] },
  { name: "Aug(add11)", keys: [0, 4, 8, 17] },
  { name: "Aug(add13)", keys: [0, 4, 8, 21] },
  
  { name: "6", keys: [0, 4, 7, 9] },
  { name: "M7", keys: [0, 4, 7, 11] },
  { name: "M9", keys: [0, 4, 7, 11, 14] },
  { name: "M11", keys: [0, 4, 7, 11, 14, 17] },
  { name: "M13", keys: [0, 4, 7, 11, 14, 17, 21] },
  
  { name: "M6-5", keys: [0, 4, 6, 9] },
  { name: "M7-5", keys: [0, 4, 6, 11] },
  { name: "M9-5", keys: [0, 4, 6, 11, 14] },
  { name: "M11-5", keys: [0, 4, 6, 11, 14, 17] },
  { name: "M13-5", keys: [0, 4, 6, 11, 14, 17, 21] },
  
  { name: "M6+5", keys: [0, 4, 8, 9] },
  { name: "M7+5", keys: [0, 4, 8, 11] },
  { name: "M9+5", keys: [0, 4, 8, 11, 14] },
  { name: "M11+5", keys: [0, 4, 8, 11, 14, 17] },
  { name: "M13+5", keys: [0, 4, 8, 11, 14, 17, 21] },
  
  { name: "7", keys: [0, 4, 7, 10] },
  { name: "9", keys: [0, 4, 7, 10, 14] },
  { name: "11", keys: [0, 4, 7, 10, 14, 17] },
  { name: "13", keys: [0, 4, 7, 10, 14, 17, 21] },
  
  { name: "7-5", keys: [0, 4, 6, 10] },
  { name: "9-5", keys: [0, 4, 6, 10, 14] },
  { name: "11-5", keys: [0, 4, 6, 10, 14, 17] },
  { name: "13-5", keys: [0, 4, 6, 10, 14, 17, 21] },
  
  { name: "7+5", keys: [0, 4, 8, 10] },
  { name: "9+5", keys: [0, 4, 8, 10, 14] },
  { name: "11+5", keys: [0, 4, 8, 10, 14, 17] },
  { name: "13+5", keys: [0, 4, 8, 10, 14, 17, 21] },
  
  
  { name: "m", keys: [0, 3, 7] },
  { name: "m+5", keys: [0, 3, 8] },
  
  { name: "m(add2)", keys: [0, 2, 3, 7] },
  { name: "m(add4)", keys: [0, 3, 5, 7] },
  { name: "m(add-5)", keys: [0, 3, 6, 7] },
  { name: "m(add+5)", keys: [0, 3, 7, 8] },
  { name: "m(add9)", keys: [0, 3, 7, 14] },
  { name: "m(add11)", keys: [0, 3, 7, 17] },
  { name: "m(add13)", keys: [0, 3, 7, 21] },
  
  { name: "m-5(add2)", keys: [0, 2, 3, 6] },
  { name: "m-5(add4)", keys: [0, 3, 5, 6] },
  { name: "m-5(add+5)", keys: [0, 3, 6, 8] },
  { name: "m-5(add9)", keys: [0, 3, 6, 14] },
  { name: "m-5(add11)", keys: [0, 3, 6, 17] },
  { name: "m-5(add13)", keys: [0, 3, 6, 21] },
  
  { name: "m+5(add2)", keys: [0, 2, 3, 8] },
  { name: "m+5(add4)", keys: [0, 3, 5, 8] },
  { name: "m+5(add-5)", keys: [0, 3, 6, 8] },
  { name: "m+5(add9)", keys: [0, 3, 8, 14] },
  { name: "m+5(add11)", keys: [0, 3, 8, 17] },
  { name: "m+5(add13)", keys: [0, 3, 8, 21] },
  
  { name: "m6", keys: [0, 3, 7, 9] },
  { name: "mM7", keys: [0, 3, 7, 11] },
  { name: "mM9", keys: [0, 3, 7, 11, 14] },
  { name: "mM11", keys: [0, 3, 7, 11, 14, 17] },
  { name: "mM13", keys: [0, 3, 7, 11, 14, 17, 21] },
  
  { name: "mM6-5", keys: [0, 3, 6, 9] },
  { name: "mM7-5", keys: [0, 3, 6, 11] },
  { name: "mM9-5", keys: [0, 3, 6, 11, 14] },
  { name: "mM11-5", keys: [0, 3, 6, 11, 14, 17] },
  { name: "mM13-5", keys: [0, 3, 6, 11, 14, 17, 21] },
  
  { name: "mM6+5", keys: [0, 3, 8, 9] },
  { name: "mM7+5", keys: [0, 3, 8, 11] },
  { name: "mM9+5", keys: [0, 3, 8, 11, 14] },
  { name: "mM11+5", keys: [0, 3, 8, 11, 14, 17] },
  { name: "mM13+5", keys: [0, 3, 8, 11, 14, 17, 21] },
  
  { name: "m7", keys: [0, 3, 7, 10] },
  { name: "m9", keys: [0, 3, 7, 10, 14] },
  { name: "m11", keys: [0, 3, 7, 10, 14, 17] },
  { name: "m13", keys: [0, 3, 7, 10, 14, 17, 21] },
  
  { name: "m7-5", keys: [0, 3, 6, 10] },
  { name: "m9-5", keys: [0, 3, 6, 10, 14] },
  { name: "m11-5", keys: [0, 3, 6, 10, 14, 17] },
  { name: "m13-5", keys: [0, 3, 6, 10, 14, 17, 21] },
  
  { name: "m7+5", keys: [0, 3, 8, 10] },
  { name: "m9+5", keys: [0, 3, 8, 10, 14] },
  { name: "m11+5", keys: [0, 3, 8, 10, 14, 17] },
  { name: "m13+5", keys: [0, 3, 8, 10, 14, 17, 21] },
  
  { name: "sus2", keys: [0, 2, 7] },
  { name: "sus4", keys: [0, 5, 7] },
  { name: "°", keys: [0, 3, 6] },
  { name: "°7", keys: [0, 3, 6, 9] },
  { name: "°9", keys: [0, 3, 6, 9, 14] },
  { name: "°11", keys: [0, 3, 6, 9, 14, 17] },
  { name: "°13", keys: [0, 3, 6, 9, 14, 17, 21] },
  
  { name: "𝆩7", keys: [0, 3, 6, 10] },
  { name: "𝆩9", keys: [0, 3, 6, 10, 14] },
  { name: "𝆩11", keys: [0, 3, 6, 10, 14, 17] },
  { name: "𝆩13", keys: [0, 3, 6, 10, 14, 17, 21] },
  
  { name: "6/9", keys: [0, 4, 7, 9, 14] },
  { name: "6/11", keys: [0, 4, 7, 9, 17] },
  { name: "6/13", keys: [0, 4, 7, 9, 21] },
  
  { name: "m6/9", keys: [0, 3, 7, 9, 14] },
  { name: "m6/11", keys: [0, 3, 7, 9, 17] },
  { name: "m6/13", keys: [0, 3, 7, 9, 21] },
  
  
  
  //incomplete
  
  { name: "M(no5)", keys: [0, 4] },
  
  { name: "6(no5)", keys: [0, 4, 9] },
  { name: "M7(no5)", keys: [0, 4, 11] },
  { name: "M9(no5)", keys: [0, 4, 11, 14] },
  { name: "M11(no5)", keys: [0, 4, 11, 14, 17] },
  { name: "M13(no5)", keys: [0, 4, 11, 14, 17, 21] },
  
  { name: "7(no5)", keys: [0, 4, 10] },
  { name: "9(no5)", keys: [0, 4, 10, 14] },
  { name: "11(no5)", keys: [0, 4, 10, 14, 17] },
  { name: "13(no5)", keys: [0, 4, 10, 14, 17, 21] },
  
  
  { name: "m(no5)", keys: [0, 3] },
  
  { name: "m6(no5)", keys: [0, 3, 9] },
  { name: "mM7(no5)", keys: [0, 3, 11] },
  { name: "mM9(no5)", keys: [0, 3, 11, 14] },
  { name: "mM11(no5)", keys: [0, 3, 11, 14, 17] },
  { name: "mM13(no5)", keys: [0, 3, 11, 14, 17, 21] },
  
  { name: "m7(no5)", keys: [0, 3, 10] },
  { name: "m9(no5)", keys: [0, 3, 10, 14] },
  { name: "m11(no5)", keys: [0, 3, 10, 14, 17] },
  { name: "m13(no5)", keys: [0, 3, 10, 14, 17, 21] },
  
  { name: "sus2(no5)", keys: [0, 2] },
  { name: "sus4(no5)", keys: [0, 5] },
  
  { name: "6/9(no5)", keys: [0, 4, 9, 14] },
  { name: "6/11(no5)", keys: [0, 4, 9, 17] },
  { name: "6/13(no5)", keys: [0, 4, 9, 21] },
  
  { name: "m6/9(no5)", keys: [0, 3, 9, 14] },
  { name: "m6/11(no5)", keys: [0, 3, 9, 17] },
  { name: "m6/13(no5)", keys: [0, 3, 9, 21] },
  
  
  { name: "M9(no7)", keys: [0, 4, 7, 14] },
  { name: "M11(no7)", keys: [0, 4, 7, 14, 17] },
  { name: "M13(no7)", keys: [0, 4, 7, 14, 17, 21] },
  
  { name: "M9-5(no7)", keys: [0, 4, 6, 14] },
  { name: "M11-5(no7)", keys: [0, 4, 6, 14, 17] },
  { name: "M13-5(no7)", keys: [0, 4, 6, 14, 17, 21] },
  
  { name: "M9+5(no7)", keys: [0, 4, 8, 14] },
  { name: "M11+5(no7)", keys: [0, 4, 8, 14, 17] },
  { name: "M13+5(no7)", keys: [0, 4, 8, 14, 17, 21] },
  
  { name: "mM9(no7)", keys: [0, 3, 7, 14] },
  { name: "mM11(no7)", keys: [0, 3, 7, 14, 17] },
  { name: "mM13(no7)", keys: [0, 3, 7, 14, 17, 21] },
  
  { name: "mM9-5(no7)", keys: [0, 3, 6, 14] },
  { name: "mM11-5(no7)", keys: [0, 3, 6, 14, 17] },
  { name: "mM13-5(no7)", keys: [0, 3, 6, 14, 17, 21] },
  
  { name: "mM9+5(no7)", keys: [0, 3, 8, 14] },
  { name: "mM11+5(no7)", keys: [0, 3, 8, 14, 17] },
  { name: "mM13+5(no7)", keys: [0, 3, 8, 14, 17, 21] },
  
  { name: "M9(no5)(no7)", keys: [0, 4, 14] },
  { name: "M11(no5)(no7)", keys: [0, 4, 14, 17] },
  { name: "M13(no5)(no7)", keys: [0, 4, 14, 17, 21] },
  
  { name: "mM9(no5)(no7)", keys: [0, 3, 14] },
  { name: "mM11(no5)(no7)", keys: [0, 3, 14, 17] },
  { name: "mM13(no5)(no7)", keys: [0, 3, 14, 17, 21] },
  
  
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
          list[keys] = [name];
        }
        else{
          if(!list[keys].includes(name)){
            list[keys].push(name)
          }
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
                list[keys] = [name];
              }
              else{
                if(!list[keys].includes(name)){
                  list[keys].push(name)
                }
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
                list[keys] = [name];
              }
              else{
                if(!list[keys].includes(name)){
                  list[keys].push(name)
                }
                
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
        // setTimeout(() => {
          if (e<= hi && e>=lo) {
            t.innerHTML = notes[e% 12];
          }
          
          
        // }, 5);
        
      } else {

        p = played.sort(function (a, b) {
          return a - b;
        });
        if (chord[p.toString()] != undefined) {
          if(chord[p.toString()].length>1){
            // t.innerHTML = chord[p.toString()][0];
            t.innerHTML = filter(chord[p.toString()])
            alt.innerHTML=render(t.innerHTML, chord[p.toString()])

          }
          else{
            t.innerHTML = chord[p.toString()][0];

          }
          
        }
      }
    }
  } else {
    release(e)
    played.splice(played.indexOf(e), 1);
    if (hi != undefined && lo != undefined) {
      t.innerHTML = "";
      alt.innerHTML ='';


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
    synth2.triggerAttack(notes[note%12]+(Math.floor(note/12)-1), 0)

  }
  
}

function release(note) {
  if(note>=lo && note <=hi){
    synth.triggerRelease(notes[note%12]+Math.floor(note/12), 1)
    synth2.triggerRelease(notes[note%12]+(Math.floor(note/12)-1), 1)

  }
  
}

function smallest(list){
  var ss
  var hh
  for(var z=0; z<list.length; z++){
    if(z==0){ss=list[z].length; hh=list[z]}
    else{
      if(list[z].length<ss){ss=list[z].length; hh=list[z]}
    }
  }
  return hh
}

function render(small, list){
  var g = '<ul><li><b>Alt :</b></li>'
  for(var z=0; z<list.length; z++){
    if(list[z]!=small){
      if(z==list.length-1){
        g+='<li><b>'+list[z]+'</b></li>'

      }
      else{
        g+='<li><b>'+list[z]+',</b></li>'
        
      }
      
    }
  }
  g+='</ul>'
  return g
}

function filter(list) {
  var cl = []
  var il = []
  var sl = []
  for(var z=0; z<list.length; z++){
    
      if(list[z].includes('/')){
        sl.push(list[z])
    }
    else if(list[z].includes('(no')){
      il.push(list[z])
    }
    else if(list[z].includes('(no')&&list[z].includes('/')){
      sl.push(list[z])
    }
    else{
      cl.push(list[z])
    }
  }
  if (cl.length>0){
    return smallest(cl)
  }
  else{
    if(il.length>0){
      return smallest(il)
    }
    else{
      return smallest(sl)
    }
  }
  
  
}