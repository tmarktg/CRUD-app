// Event List
const eventList = document.getElementById('eventList');
let eventsData = JSON.parse(localStorage.getItem('eventsData')) || [];

// Populate event list
function populateEventList() {
  const tbody = eventList.getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';

  eventsData.forEach((event, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${event.title}</td>
      <td>${formatDate(event.date)}</td>
      <td>${formatTime(event.time)}</td>
      <td>${event.venue}</td>
      <td>${capitalizeFirstLetter(event.category)}</td>
      <td>
        <a href="#">View</a>
        <a href="#">Edit</a>
        <a href="#" data-index="${index}">Delete</a>
      </td>
    `;

    tbody.appendChild(row);
  });

  // Attach event listener to delete buttons
  const deleteButtons = eventList.querySelectorAll('a[data-index]');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', handleDelete);
  });
}

// Call populateEventList initially to display the events
populateEventList();

// Create Event Form
const eventForm = document.getElementById('eventForm');

eventForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const venue = document.getElementById('venue').value;
  const category = document.getElementById('category').value;

  // Add the new event to eventsData array
  eventsData.push({ title, date, time, venue, category });

  // Clear the form inputs
  eventForm.reset();

  // Update the event list
  populateEventList();

  // Save eventsData to local storage
  localStorage.setItem('eventsData', JSON.stringify(eventsData));
});

// Handle delete event
function handleDelete(e) {
  const index = parseInt(e.target.getAttribute('data-index'));

  // Prompt a confirmation message
  const confirmDelete = confirm('Are you sure you want to delete this event?');
  if (!confirmDelete) {
    return; // Do not delete if canceled
  }

  // Remove the event from eventsData array
  eventsData.splice(index, 1);

  // Update the event list
  populateEventList();

  // Save eventsData to local storage
  localStorage.setItem('eventsData', JSON.stringify(eventsData));
}

// Helper function to capitalize the first letter
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function to format time in 12-hour format
function formatTime(time) {
  const [hours, minutes] = time.split(':');
  let formattedTime = '';

  // Convert hours to 12-hour format
  if (hours > 12) {
    formattedTime += `${hours - 12}:${minutes} PM`;
  } else if (hours == 12) {
    formattedTime += `${hours}:${minutes} PM`;
  } else {
    formattedTime += `${hours}:${minutes} AM`;
  }

  return formattedTime;
}

// Helper function to format date in "mm/dd/yyyy" format
function formatDate(date) {
  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year}`;
}
