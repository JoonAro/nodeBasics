'use strict';

(function () {

    let idField;
    let firstnameField;
    let lastnameField;
    let departmentField;
    let salaryField;
    let resultarea;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        resultarea = document.getElementById('resultarea');
        idField = document.getElementById('id');
        firstnameField = document.getElementById('firstname');
        lastnameField = document.getElementById('lastname');
        departmentField = document.getElementById('department');
        salaryField = document.getElementById('salary');

        document.getElementById('submit').addEventListener('click', send);

        idField.addEventListener('focus', clear);
    }

    function clear() {
        idField.value = '';
        firstnameField.value = '';
        lastnameField.value = '';
        departmentField.value = '';
        salaryField.value = '';
        resultarea.textContent = '';
        resultarea.removeAttribute('class');
    }

    async function send() {
        const person = {
            id: +idField.value,
            firstname: firstnameField.value,
            lastname: lastnameField.value,
            department: departmentField.value,
            salary: +salaryField.value
        };

        try {
            const options = {
                method: 'POST',
                body: JSON.stringify(person),
                headers: { 'Content-Type': 'application/json' }
            };
            const data = await fetch('/addPerson', options);
            const result = await data.json();

            updateStatus(result);
        }
        catch (err) {
            updateStatus({ message: err.message, type: 'error' });
        }
    }//end  of send

    function updateStatus(status) {
        resultarea.textContent = status.message;
        resultarea.setAttribute('class', status.type);
    }

})();