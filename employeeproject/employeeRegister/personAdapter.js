'use strict';
//if item has id or salary field it replaces them or if its another. The fields where the new item has no value will stay the same
//item salary is changed from string to number
function adapt(item) {
    return Object.assign(item, {
        id: +item.id,
        salary: +item.salary
    });
}

module.exports = { adapt }