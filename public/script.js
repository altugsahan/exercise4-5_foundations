let container = document.getElementsByClassName("container");
let inputArea = document.getElementById("inputArea");
let todoContainer = document.getElementById("todoContainer");
let addItem =  document.getElementById("addItem");

    addItem.addEventListener("click", () => {
        if (inputArea.value != ""){
            var paragraph = document.createElement("p");
            paragraph.innerText = inputArea.value 
            todoContainer.appendChild(paragraph);
        } else {
            alert("You have not added anything!")
        }
        inputArea.value  = "";
        paragraph.classList.add("todoParagraph");
        paragraph.addEventListener("click", () => {
            paragraph.style.textDecoration = "line-through";
        });
        paragraph.addEventListener("dblclick", () => {
            todoContainer.removeChild(paragraph);
        });
    });

    inputArea.addEventListener("keypress", function(event){
        if (event.key === "Enter" & inputArea.value != ""){
            var paragraph = document.createElement("p");
            paragraph.innerText = inputArea.value 
            todoContainer.appendChild(paragraph);
            inputArea.value = "";
            paragraph.classList.add("todoParagraph");
            paragraph.addEventListener("click", () => {
                paragraph.style.textDecoration = "line-through";
            });
            paragraph.addEventListener("dblclick", () => {
                todoContainer.removeChild(paragraph);
            });
        };
    });