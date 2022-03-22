let input = document.querySelector('.input')
let span1 = document.querySelector('.span1')
let span2 = document.querySelector('.span2')
let btn = document.querySelector('.fa')

let voice = new webkitSpeechRecognition()
voice.lang = 'en-EN'

toLocal()

let arr = []

input.onkeyup = event=>{
    if(event.keyCode == 13 && input.value.length>=3){
        alpha(input.value)
        input.value = ''
    }
}

btn.onclick = () => {
    voice.start()
}

voice.onresult = result => {
    alpha(result.results[0][0].transcript)
}


function alpha(value){
    let word = value
    word = word.toLowerCase()
    let last = word[word.length-1]
    let first = word[0]
    let lastWord = arr[arr.length-1] ? arr[arr.length-1]:false

    if(arr.includes(word)){
        let res = "This word already used! You lost"
        Null()
        speechSynthesis.speak( new SpeechSynthesisUtterance(res) )
        return alert(res)
    }

    if(lastWord && first != lastWord[lastWord.length-1]){
        let res = "Uncorrect first letter! You lost"
        console.log(lastWord,first)
        Null()
        speechSynthesis.speak( new SpeechSynthesisUtterance(res))
        return alert(res)
    }

    if(Object.keys(words).includes(last)){
        span1.textContent = word
        span2.textContent = words[last][words[last].length-1]
        
        if(arr.includes(span2.textContent)){
            let res = "No words left! You win"
            Null()
            speechSynthesis.speak( new SpeechSynthesisUtterance(res) )
            return alert(res)
        }else{
            speechSynthesis.speak( new SpeechSynthesisUtterance(span2.textContent))
            arr.push(word,span2.textContent)
        }

    }

    if(!words[first].includes(word)){
        words[first].push(word)
    }

    let w = window.localStorage.getItem(first)
    if(!w.includes(word)){
        window.localStorage.setItem(first,words[first]) 
    }
}

function Null(){
    input.innerHTML = null
    span1.innerHTML = null
    span2.innerHTML = null
}

function toLocal(){
    if(!window.localStorage.getItem('a')){
        for(el in words){
            window.localStorage.setItem(el,words[el])
        }
    }    
}