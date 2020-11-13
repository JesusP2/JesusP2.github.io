let container = document.getElementsByClassName('chat-box')[0]
let enviar = document.getElementsByClassName('button-enviar')[0]
let inp = document.getElementsByClassName('input-text')[0]
let isScrolled;
let currpos = 7;
Send('Muy buenos dias, en que puedo ayudarte?', 'bot')
inp.addEventListener('keyup', function(event){
    let textarea = document.getElementsByClassName('input-text')[0]
    if (textarea.scrollHeight != textarea.clientHeight){
        AdjustHeight()
    }
    if (event.keyCode == 13 && event.shiftKey){
        event.preventDefault();
        document.getElementsByClassName('input-text'[0]).value = document.getElementsByClassName('input-text')[0].value + '\n' 
    }
    else if (event.keyCode == 13){
        event.preventDefault();
        document.getElementsByClassName('button-enviar')[0].click()
        ReadjustHeight()
    }
})

enviar.addEventListener('click', () => { 
    let text_input = document.getElementsByClassName('input-text')[0].value
    text_input = text_input.replace(/(^\s*(?!.+)\n+)|(\n+\s+(?!.+)$)/g, "")
    text_input = text_input.replace(/\r\n|\r|\n/g,"<br />")
    if (text_input.length > 1){
        Send(text_input)
        Send('Por supuesto, dime en que puedo ayudarte? texto texto texto texto texto texto texto texto texto texto texto texo texto', 'bot')
        document.getElementsByClassName('input-text')[0].value = ''
        isScrolled = container.scrollHeight - container.clientHeight <= container.scrollTop + 1
        if (!isScrolled){
            container.scrollTop = container.scrollHeight - container.clientHeight
        }
    }    
    else{
        document.getElementsByClassName('input-text')[0].value = ''
    }
})

function AdjustHeight(){
    let container = 13.4
    let maxHeight = container - 2.5
    let currHeight = document.getElementsByClassName('input-text')[0].scrollHeight / window.screen.height * 100
    let normalHeight = document.getElementsByClassName('input-text')[0].clientHeight / window.screen.height * 100
    console.log(`currHeight: ${currHeight}    maxHeight: ${maxHeight}`)
    if (currHeight < maxHeight && normalHeight != currHeight){
        document.getElementsByClassName('input-text')[0].style.height = currHeight + 'vh'
        document.getElementsByClassName('input-text')[0].style.top = currpos -(currHeight - normalHeight + 0.65) + 'vh'
        document.getElementsByClassName('button-enviar')[0].style.top = currpos - 1 - (currHeight - normalHeight + 0.8) + 'vh'
        let temp = document.getElementsByClassName('input-text')[0].style.top
        currpos = parseFloat(temp.slice(0, temp.length - 2))
    }
}

function ReadjustHeight(){
    document.getElementsByClassName('input-text')[0].style.height = '4vh'
    document.getElementsByClassName('input-text')[0].style.top = '7vh'
    document.getElementsByClassName('button-enviar')[0].style.top = '5vh'
    currpos = 7
}
function CreateComment(text, snd = 'comentario'){
    let string = `<p>${text}</p>`
    const div = document.createElement('div')
    div.innerHTML = string;
    if (snd == 'bot'){
        div.classList.add('bot')
    }else{
        div.classList.add('comentario')
    }
    return div
}

function Send(text, snd = 'comentario'){
    container.appendChild(CreateComment(text, snd))
    setPosition(container, snd = snd)
    hour = getHour()
    container.lastElementChild.appendChild(hour)
}
function getHour(){
    let today = new Date()
    let sufix = 'am'
    hour_div = document.createElement('div')
    hour_div.classList.add('hora')

    if (today.getHours() > 11){
        sufix = 'pm'
    }
    if (today.getHours() > 12){
        if (today.getMinutes() < 10){
        hour_div.textContent = today.getHours() - 12 + ':0' + today.getMinutes() + sufix
        }else{
            hour_div.textContent = today.getHours() - 12 + ':' + today.getMinutes() + sufix
        }
    }else{
        if (today.getMinutes < 10){
            hour_div.textContent = today.getHours() + ':0' + today.getMinutes() + sufix
        }else{
            hour_div.textContent = today.getHours() + ':' + today.getMinutes()  + sufix
        }
        
    }
    return hour_div
}

function setPosition(container, snd){
    if (snd == 'bot'){
        let temp_width = container.children[container.children.length - 1].offsetWidth
        container.lastElementChild.style.display = 'block'
        temp_width = Math.floor(temp_width / container.offsetWidth * 100) + 5
        if (temp_width > 58){
            container.lastElementChild.style.width = 60 + '%'
            container.lastElementChild.style.marginLeft = 'auto'
        } else{
            container.lastElementChild.style.width = temp_width + '%'
            container.lastElementChild.style.marginLeft = 'auto'
        }
    }
    if (snd == 'comentario'){
        let temp_width = container.children[container.children.length - 1].offsetWidth
        container.children[container.children.length - 1].style.display = 'block'
        temp_width = Math.floor(temp_width / container.offsetWidth * 100) + 5
        container.children[container.children.length - 1].style.left = 1 + '%'
        if (temp_width > 58){
            container.children[container.children.length - 1].style.width = 62 + '%'
        }else {
            container.children[container.children.length - 1].style.width = temp_width + '%'
        }
    }
}
