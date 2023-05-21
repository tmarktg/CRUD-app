// Get the form and events list elements
const form = document.getElementById('eventForm');
const eventsList = document.getElementById('eventsList');

// Event handler for form submission
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const title = document.getElementById('title').value;
  const venue = document.getElementById('venue').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  // Create a new event object
  const eventObj = {
    title,
    venue,
    date,
    time,
  };

  // Call a function to add the event to the events list
  addEventToList(eventObj);

  // Reset the form
  form.reset();
});

// Function to add the event to the events list
function addEventToList(event) {
  const eventTable = document
    .getElementById('eventList')
    .getElementsByTagName('tbody')[0];
  const row = eventTable.insertRow();

  const titleCell = row.insertCell();
  titleCell.textContent = event.title;

  const descriptionCell = row.insertCell();
  descriptionCell.textContent = event.description;

  const dateCell = row.insertCell();
  dateCell.textContent = event.date;

  const timeCell = row.insertCell();
  timeCell.textContent = event.time;

  const venueCell = row.insertCell();
  venueCell.textContent = event.venue;
}

// Rest of your code
