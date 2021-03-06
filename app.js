

// UI Variables 
const itemForm = document.getElementById('item-form');
const itemList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-items');
const filter = document.getElementById('filter');
const itemInput = document.querySelector('#item');

// load all event listeners
// creating function
loadEventListeners();

function loadEventListeners(){
    //load existing items from the local storage
    document.addEventListener('DOMContentLoaded', getItems )
    //add item to item list
    itemForm.addEventListener('submit', addItem);
    //delete item from item list 
    //using item list to apply the function to all the items
    itemList.addEventListener('click', removeItem);
    // clear all the items form the list 
    clearBtn.addEventListener('click',clearItems);
    // filter items in the list
    filter.addEventListener('keyup', filterItems);
};


function getItems(event){

    let items = [];
    //check if storage is empty
    if(localStorage.getItem('items') === null){
        items = [];
    }
    else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    //create a DOM element
    items.forEach(function(item){
        //create il element. We will use it for the item to add to the list
        const li = document.createElement("li");
        // adding class for li, materialize
        li.className = 'collection-item';
        //create text node and append to li. It's coming from loop items
        li.appendChild(document.createTextNode(item));

        //create new link element which is delete bin
        const crossLink = document.createElement('a');
        //add materialize class to get delete item to the right
        crossLink.className = 'delete-item secondary-content';
        //create innerHTML to add a delete bin to the link
        crossLink.innerHTML = '<i class="material-icons red-text">delete</i>';
        // append link to li
        li.appendChild(crossLink);
        //append li to ul
        itemList.appendChild(li);
    });
}

function addItem(event){

    // if there is nothing added to item field and the button is submitted show alert
    if(itemInput.value === ''){
        alert('Nothing added. Add Item.');
    }

    //create il element. We will use it for the item to add to the list
    const li = document.createElement("li");
    // adding class for li, materialize
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(itemInput.value));

    //create new link element which is delete bin
    const crossLink = document.createElement('a');
    //add materialize class to get delete item to the right
    crossLink.className = 'delete-item secondary-content';
    //create innerHTML to add a delete bin to the link
    crossLink.innerHTML = '<i class="material-icons red-text">delete</i>';
    // append link to li
    li.appendChild(crossLink);
    //append li to ul
    itemList.appendChild(li);

    //Store item in local storage function 
    storeItemInLocalStorage(itemInput.value);

    //clear input value 
    itemInput.value = '';
    event.preventDefault();
};

//Store item in local storage function 
//taking itemInput.value, in add addItem function
function storeItemInLocalStorage(item){
    let items= [];

    //checking if thee are any tasks already in local storage
    if(localStorage.getItem('items') === null){
        items = [];
    }
    else {
        items = JSON.parse(localStorage.getItem('items'));
    }
 
    items.push(item)
    //set key 'items' and item input to stoer in the local storage
    localStorage.setItem('items', JSON.stringify(items))
    
    
}


//remove an item by clicking on the delete bin
//use li (parent of the target 'a')
//ask user if they are sure they want to delete the item
function removeItem(event){
    if(event.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure?")){
        event.target.parentElement.parentElement.remove();

        //remove from Local Storage
        //passing the element that needs to be removed
        removeTaskFromLocalStorage(event.target.parentElement.parentElement);
     }
    }
}


function removeTaskFromLocalStorage(itemMain){
    
    let items = [];
    //check if storage is empty
    
    if(localStorage.getItem('items') === null){
        items = [];
    }
    else {
        items = JSON.parse(localStorage.getItem('items'));
    } 
  
    // using textContent of firstChild becase of Materialize and the bin icon
    items.forEach(function(item, index){
        if(itemMain.firstChild.textContent === item){
            items.splice(index, 1);
        }
    }); 

    localStorage.setItem('items', JSON.stringify(items))
}

//clear all items in the list
function clearItems(){

    //faster option to remove items
    //while there is at least one element in itemList remove firstChild
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }

/* one option 
    itemList.innerHTML = "";
*/    
    // delete all items from loccal storage
    removeItemsFromLocalStorage();
};

//Delete Items from Local Storage Function
function removeItemsFromLocalStorage(){
    localStorage.clear();
}

//Filtering throught the items entered
function filterItems(event){
    //grabbing value of text entered into filter field
    //using toLowerCase in case the capslock in on so that it has no effect
    const text = event.target.value.toLowerCase();

    //grabbing all the list items
    //querySelector returns nodes so we can use forEach
    lis = document.querySelectorAll('.collection-item');
    //itemL, content of the firstChild
    //if there is no match of itemL and indexOf text it will return -1
    //it will be looking for any text containing the typed letters
    //if there is a match, display 'block', if there is not match, display 'none'.
    lis.forEach(function(item){
        const itemL = item.firstChild.textContent;
        if(itemL.toLowerCase().indexOf(text) != -1){
            item.style.display = 'block';
        } else{
            item.style.display = 'none'; 
        }
    })

}





    

