// URL of the API endpoint
const apiUrl = 'http://api.open-notify.org/astros.json';

// Function to update the number of people in space in the HTML
function updatePeopleCount(count) {
    const countDiv = document.getElementById('peopleCount');
    countDiv.textContent = count;
}

// Function to update the table with people in space
function updatePeopleTable(people) {
    const tableBody = document.querySelector('#peopleTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    people.forEach(person => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const craftCell = document.createElement('td');

        nameCell.textContent = person.name;
        craftCell.textContent = person.craft;

        row.appendChild(nameCell);
        row.appendChild(craftCell);
        tableBody.appendChild(row);
    });
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Event listener for the button to show the table
    document.getElementById('showTableButton').addEventListener('click', () => {
        const tableDiv = document.getElementById('peopleTable');
        tableDiv.style.display = tableDiv.style.display === 'none' ? 'block' : 'none';
    });

    // Call the function to fetch data
    fetchData();
});

// Modify fetchData to update the table
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        updatePeopleCount(data.number);
        updatePeopleTable(data.people);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
// Call the function to fetch data
fetchData();
