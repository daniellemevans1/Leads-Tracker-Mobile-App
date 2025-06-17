import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, 
        ref,
        push,
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-91d7c-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

console.log(app);
console.log(database);
// console.log(firebaseConfig.databaseURL);

// 91d7c

const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const ulEl = document.querySelector("#ul-el");
const deleteBtn = document.querySelector("#delete-btn");

function render(leads) {
    let listItems = "";
    for(let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
         `
    }
    ulEl.innerHTML = listItems;
}

onValue(referenceInDB, function(snapshot) {
    //console.log(snapshot.val());
    const snapshotDoesExist = snapshot.exists();
    if(snapshotDoesExist) {
        const snapshotValues = snapshot.val();
        const leads = Object.values(snapshotValues);
        render(leads);
    }
});

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB);
    ulEl.innerHTML = "";
});

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value);

    inputEl.value = "";
});