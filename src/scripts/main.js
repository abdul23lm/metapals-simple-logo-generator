
import { gsap, Draggable } from "gsap/all";
import anime from 'animejs/lib/anime.es.js';
import html2canvas from 'html2canvas';

gsap.registerPlugin(Draggable); 


// Text Changer Function

const inputText = document.querySelector("#inputText");
const animateTypingSymbol = document.querySelector("#animateTypingSymbol");
const chars = document.querySelector(".chars");

inputText.addEventListener("input", textChanger);

function textChanger(event = null) {
    let text = "MetaPals Awesome".split("");
    if (event) {
        text = event.target.value.split("");
    }
    animateTypingSymbol.children[0].classList.add("animate-ping");
    chars.innerHTML = "";
    let reverse = true;
    text.forEach(t => {
        const char = document.createElement("span");
        char.style = "display: inline-block; touch-action: none; cursor: grab; user-select: none; opacity: 1; transform: translate3d(0px, 40px, 0px);";
        Draggable.create(char, {type:"x,y", edgeResistance:0.65, bounds:"body", inertia:true});
        if (t == " ") {
            char.innerHTML = "&nbsp;";
        } else {
            char.innerHTML = t;
        }
        chars.appendChild(char);
        if (reverse) {
            anime({
                targets: char,
                translateY: [20, 0],
                easing: 'easeOutExpo',
                duration: 500,
                opacity: [0, 1],
                easing: 'easeInOutSine',
                delay: (el, i) =>   30 * i
            });
        } else {
            anime({
                targets: char,
                translateY: [-20, 0],
                easing: 'easeOutExpo',
                duration: 500,
                opacity: [0, 1],
                easing: 'easeInOutSine',
                delay: (el, i) =>   30 * i
            });
        }
        reverse = !reverse;
    });
    setTimeout(function() {
        animateTypingSymbol.children[0].classList.remove("animate-ping");
    }, 500);
}


// Text Color Changer Function

const generatedTextContainer = document.querySelector("#generatedTextContainer");
const textColor = document.querySelector("#textColor");

textColor.addEventListener("click", textColorChanger);

function textColorChanger(event) {
    const backgroundColor = event.target.style.backgroundColor;
    for (let i=0; i<textColor.children.length; i++){
        textColor.children[i].style.borderColor = "white";
    }
    event.target.style.borderColor = "olivedrab";
    generatedTextContainer.style.color = backgroundColor;
}



// Text Size Changer Function

const generatedText = document.querySelector("#generatedText");
const inputSize = document.querySelector("#inputSize");
const textSize = document.querySelector("#size-text");

inputSize.addEventListener("input", textSizeChanger);

function textSizeChanger(event) {
    textSize.innerHTML = event.target.value+"px";
    generatedText.style.fontSize = event.target.value+"px";
}


// Font Family Changer Function

textStyle.addEventListener("change", fontFamilyChanger);

function fontFamilyChanger(){
var selection = document.getElementById("textStyle").value;
  generatedText.style.fontFamily = selection;
}


// Capture Image Function

const saveBtn = document.querySelector("#saveBtn");
const modalSaveBtn = document.querySelector("#modalSaveBtn");
const modalSaveContent = document.querySelector(".modal-save-content");

saveBtn.addEventListener("click", captureImage);

function captureImage() {
    modalSaveBtn.style.width = "max-content";
    modalSaveBtn.style.top = "10%";
    modalSaveContent.innerHTML = "";
    html2canvas(generatedText).then(canvas => {
        modalSaveContent.appendChild(canvas);
    });
}


// Download Image Function

const downloadBtn = document.querySelector("#downloadBtn");

downloadBtn.addEventListener("click", downloadImage);

function downloadImage() {
    html2canvas(generatedText)
        .then(canvas => {
            canvas.style.display = 'none'
            document.body.appendChild(canvas)
            return canvas
        })
        .then(canvas => {
            const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
            const a = document.createElement('a')
            a.setAttribute('download', 'My Logo.png')
            a.setAttribute('href', image)
            a.click()
            canvas.remove()
        })
}



// Modal Close Function

const modalCloseBtn = document.querySelector(".modal-close-button");

modalCloseBtn.addEventListener("click", closeModal);

function closeModal() {
    modalSaveBtn.style.top = "-100%"; 
}




textChanger();