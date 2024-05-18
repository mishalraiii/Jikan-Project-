async function loadTitleData() {
    var host = window.location.origin;
    console.log(host);
    const response = await fetch(`${host}/FavTitles`);
    const data = await response.json();
    console.log(data);

    createTable(data);
}

function createTable(data) {
    var tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = ''; // Clear any existing table

    var table = document.createElement('table');
    table.border = '1';
    var header = table.createTHead();
    var headerRow = header.insertRow(0);

    var cell1 = headerRow.insertCell(0);
    cell1.innerHTML = '<b>First Name</b>';
    var cell2 = headerRow.insertCell(1);
    cell2.innerHTML = '<b>Favorite Title</b>';

    var tbody = table.createTBody();

    data.forEach(item => {
        var row = tbody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.innerHTML = item.first_name;
        cell2.innerHTML = item.fav_title;
    });

    tableContainer.appendChild(table);
}

async function createTitle() {
    var host = window.location.origin;
    var firstName = document.getElementById('first_name').value;
    var title = document.getElementById('favtitle').value;

    const response = await fetch(`${host}/FavTitle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            first_name: firstName,
            fav_title: title
        })
    });

    const result = await response.json();
    console.log(result);

    // Append the new entry to the existing table if the request was successful
    if (response.ok) {
        appendToTable(result[0]); // Assuming the API returns the inserted item as an object
    }
}

function appendToTable(item) {
    var table = document.querySelector('#table-container table tbody');

    // If table doesn't exist, create it
    if (!table) {
        createTable([item]);
        return;
    }

    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = item.first_name;
    cell2.innerHTML = item.fav_title;
}

window.onload = loadTitleData;
