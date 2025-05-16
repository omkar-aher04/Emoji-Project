import { emojiList } from "./emojiList.js";

const resultsDiv = document.querySelector("#results")
const form = document.querySelector("form");
const input = form.querySelector("input");
window.addEventListener("load" , () => displayEmoji(emojiList));

input.addEventListener("keyup",searchEmoji);
form.addEventListener("submit", searchEmoji);

function searchEmoji(e){
    e.preventDefault();
    const inputVal = input.value.toLowerCase();
    const filteredArray = emojiList.filter((obj) => {
        if(obj.description.includes(inputVal) || obj.tags.toString().includes(inputVal) || obj.aliases.toString().includes(inputVal)) return true; 
    });
    // console.log(filteredArray);
    displayEmoji(filteredArray);
}

function displayEmoji(arr){
    resultsDiv.innerHTML = "";
    const fragment = document.createDocumentFragment();
    arr.forEach((obj) => {
        const parent = document.createElement("div");
        const icon = document.createElement("p");
        const aliases = document.createElement("p");
        const desc = document.createElement("p");


        icon.classList.add("emojiIcon");
        icon.innerText = obj.emoji;

        icon.addEventListener("click", (e) => {
            navigator.clipboard.writeText(e.target.innerText)
                .then(() => alert("Copied to clipboard"))
                .catch(err => console.error("Copy failed", err));
        });  
        parent.append(icon);
         fragment.append(parent);
    });
   resultsDiv.append(fragment);
   
}

