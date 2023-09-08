let speech = new SpeechSynthesisUtterance();
let voices=[];

let voiceSelect=document.getElementById('selectLang');

window.speechSynthesis.onvoiceschanged=()=>{
    voices=window.speechSynthesis.getVoices();
    speech.voice=voices[0];
    voices.forEach((voice,i)=>(
        voiceSelect.options[i]=new Option(voice.name, i)
    ))
}

voiceSelect.addEventListener("change",()=>{
    speech.voice=voices[voiceSelect.value];
})


document.getElementById('play-btn').addEventListener("click",()=>{
    speechSynthesis.cancel();
    speech.text=document.getElementById("textArea").value;
    window.speechSynthesis.speak(speech)
})

document.getElementById('stop-btn').addEventListener("click",()=>{
    speechSynthesis.pause();
})

