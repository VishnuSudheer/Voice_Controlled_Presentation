const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition(); 
let array
let n,p
fetch('DATA.txt')
  .then(response => response.text())
  .then(text => {
    // Parse the text as JSON to convert it into an array
    array = JSON.parse(text);
    array = array.map(str => str.replace('D:/Mini-Project/Presentation/', ''));
    array = array.map(str => str.replace("\\", '/'))
 
    console.log(array);
    //console.log(array[0])
    //console.log(array.length)
    recognition.start()
  })
  .catch(error => {
    console.error('Error:', error);
  });

recognition.continuous = true;
recognition.interimResults = false;
const next = document.querySelector('.carousel-control-next');
const prev =document.querySelector('.carousel-control-prev');
let i=0  
var img =document.getElementById('ki')
var FS = document.getElementById('carouselExampleFade')

function handleClickN() {
  if(FS.requestFullscreen){
    FS.requestFullscreen()
  }
  if(p){
    i=i+2
    if(i>=array.length){
      i=0
    }
    p=false
  }
  console.log('Button clicked next!');
  img.setAttribute('style', 'content: url("'+array[i]+'")!important; height:100vh ;');
  i++
  if(i>=array.length){
    i=0
  }
  if(i<0){
    i=(array.length-1)
  }
  n = true
}

function handleClickP() {
  if(FS.requestFullscreen){
    FS.requestFullscreen()
  }
  if(n){
    i=i-2
    if(i<0){
      i=(array.length-1)
    }
    n=false
  }
  console.log('Button clicked prev!');
  img.setAttribute('style', 'content: url("'+array[i]+'")!important; height:100vh ;');
  i--
  if(i<0){
    i=(array.length-1)
  }
  if(i>=array.length){
    i=0
  }
  p = true
}

recognition.addEventListener('result', (e) => {
    var text = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .pop()

    console.log(text)
    a = text.endsWith("next")
    b = text.endsWith("previous")
 

    if(a){
      console.log("yes");
      next.click();
      a = false;
    } 
     
    if(b){
      console.log("no");
      console.log(i)
      prev.click(); 
      b = false;
    }
    
    })
    

