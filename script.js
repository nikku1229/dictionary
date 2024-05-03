const input = document.querySelector('#input');
const answer = document.querySelector('#answer');
const list = document.querySelector('#history-list');
const historyDiv = document.querySelector('.history');

function search(){
    if(input.value === ""){
        alert("Please! type some word to find the meaning");
    }
    else{
        let value = input.value.toLowerCase(); 
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            const meaning = data[0].meanings[0].definitions[0].definition;
            const syn = data[0].meanings[0].synonyms;
            answer.innerHTML = `<h2>${input.value}</h2><p>${meaning}</p><p>${syn}</p>`;
        });

        store();
    }
    
    input.value = '';
}

input.addEventListener("keypress", function(e){
    if(e.key === 'Enter'){
        if(input.value === ""){
            alert("Please! type some word to find the meaning");
        }
        else{
            search();
        }
    }
});


function store(){
    let value = input.value;
    let li = document.createElement('li');
    li.innerHTML = value;
    list.append(li);

    saveData();
}


function toggle(){
    if(historyDiv.style.display === 'none'){
        historyDiv.style.display = 'flex';
    }
    else{
        historyDiv.style.display = 'none';
    }
}


function deleteList(){
    list.innerHTML = "";
    saveData(); 
}

// local storage

function saveData(){
    localStorage.setItem("list",list.innerHTML);
}

function getData(){
    if(localStorage.getItem("list") === null){
        list.innerHTML = "";
    }
    else{
        list.innerHTML = localStorage.getItem("list");
    }
}
getData();