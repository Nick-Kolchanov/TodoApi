const uri = '/api/TodoItems';
const uriCategories = '/api/TodoCategories';
let todos = [];

function getItems() {
    const nameToFilter = document.getElementById('name-to-filter').value.trim();

    fetch(uriCategories)
        .then(response => response.json())
        .then(data => _displayCategories(data))

        .catch(error => console.error('Unable to get categories.', error));

    fetch(uri + '?filterName=' + nameToFilter)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const selectCategories = document.getElementById('categories-select');

    const item = {
        isComplete: false,
        name: addNameTextbox.value.trim(),
        TodoCategoryId : selectCategories.selectedOptions[0].value
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            selectCategories.selectedIndex = 0;
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(uri + '/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.Id === id);

    document.getElementById('edit-name').value = item.Name;
    document.getElementById('edit-id').value = item.Id;
    document.getElementById('edit-isComplete').checked = item.IsComplete;
    document.getElementById('edit-category-select').value = item.TodoCategoryId;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim(),
        TodoCategoryId: document.getElementById('edit-category-select').selectedOptions[0].value
    };

    fetch(uri + '/' + itemId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    if (itemCount === undefined || itemCount === null) itemCount = 0;
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';
    return itemCount + " " + name;
}

function _displayCategories(categories) {
    const select = document.getElementById('categories-select');
    const select1 = document.getElementById('edit-category-select');

    var i, L = select.options.length - 1;
    for (i = L; i >= 0; i--) {
        select.remove(i);
        select1.remove(i);
    }

    categories.forEach(item => {
        select.add(new Option(item.Name, item.Id));
        select1.add(new Option(item.Name, item.Id));
    })    

}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    const counter = document.getElementById('counter');
    counter.innerHTML = _displayCount(data.length);
    
    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.IsComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', 'displayEditForm(' + item.Id + ')');

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', 'deleteItem(' + item.Id + ')');

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.Name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        let textNode1 = document.createTextNode(item.Category.Name);
        td3.appendChild(textNode1);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });

    todos = data;
}
