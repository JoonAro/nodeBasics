'use strict';
//automatic function
(function () {
    let resultset;
    let resultarea;
    let key;
    let search;
    let messagearea;

    const serverPath = '/persons';

    const showResultSet = () => resultset.removeAttribute('class', 'hidden');
    const hideResultSet = () => resultset.setAttribute('class', 'hidden');
    const showMessageArea = () => messagearea.classList.remove('hidden');
    const hideMessageArea = () => messagearea.classList.add('hidden');
    //DOMContentLoaded needs to be written exactly like this
    document.addEventListener('DOMContentLoaded', init);
    //this waits until every element is loaded
    //you can have script for update.js in head this way
    //we need to wait until elements are loaded or they are null
    //getelementbyid is a slow process so don't use in some cases
    function init() {
        resultset = document.getElementById('resultset');
        resultarea = document.getElementById('resultarea');
        console.log(resultarea);
        key = document.getElementById('key');
        search = document.getElementById('search');
        messagearea = document.getElementById('messagearea');
        //id:s in home.html
        //if i want to change text of the button i need to get it here also but now we wont
        document.getElementById('submit').addEventListener('click', submit);

        key.addEventListener('focus', clear);
        key.addEventListener('change', () => search.focus());
        search.addEventListener('change', submit);

        clear();
    }//end of init

    function clear() {
        key.value = '';
        search.value = '';
        hideMessageArea();
        hideResultSet();
        key.focus();
    }//end of clear
    //you can't use await if function is not defined async
    async function submit() {
        const searchKey = key.value;
        const searchValue = search.value;
        // ? yes : no
        const url = searchKey ?
            `${serverPath}/${searchKey}?value=${searchValue}` : serverPath;
        //console.log('url', url);
        const result = await fetch(url);
        //JSON data coming so 
        //use trycatch to get possible errormessages showing
        const personData = await result.json();
        //console.log(personData);
        updatePage(personData);
    }//end of submit

    function showMessage(message) {
        messagearea.textContent = message;
        hideResultSet();
        showMessageArea();
        //p in html
    }
    function updatePage(searchResult) {
        //if result area has message
        if (searchResult.message) {
            showMessage(searchResult.message);
        }
        else if (searchResult.length === 0) {
            showMessage('No person found');
        }
        else {
            let htmlString = '';
            for (const person of searchResult) {
                htmlString += `<tr>
                    <td>${person.firstname}</td>
                    <td>${person.lastname}</td>
                    <td>${person.age}</td>
                    </tr>\n`
            }
            resultarea.innerHTML = htmlString;
            showResultSet();
            hideMessageArea();
            //this doesn't clear the screen so in next version maybe do that
        }
    }
})();