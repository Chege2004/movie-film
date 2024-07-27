let url = "http://localhost:3000/films/";
let currentFilm = null;

// Set up event listeners and load initial data when the document is ready
document.addEventListener("DOMContentLoaded", function () {
    loadPage();
    loadFilmList();
    setupBuyButton();
});

// Load the details of the first film initially
function loadPage() {
    loadFilmDetails(1);
}

// Fetch the list of films and display them
function loadFilmList() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const filmList = document.getElementById("films");
            filmList.innerHTML = '';

            // Create list items for each film
            data.forEach(film => {
                const filmItem = document.createElement("li");
                filmItem.className = "film item";
                filmItem.textContent = film.title;
                // Add click event to load film details when clicked
                filmItem.addEventListener("click", () => loadFilmDetails(film.id));
                filmList.appendChild(filmItem);
            });
        })
        .catch(error => console.error('Error fetching film list:', error));
}

// Fetch and display details of a specific film
function loadFilmDetails(filmId) {
    fetch(`${url}${filmId}`)
        .then(response => response.json())
        .then(data => {
            currentFilm = data;
            updateFilmDetails(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Update the film details in the UI
function updateFilmDetails(data) {
    const posterUrl = document.getElementById("poster");
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const runtime = document.getElementById("runtime");
    const showtime = document.getElementById("showtime");
    const availableTickets = document.getElementById("available-tickets");

    // Calculate available tickets
    const ticketsAvailable = data.capacity - data.tickets_sold;

    // Update UI elements with film data
    posterUrl.src = data.poster;
    title.textContent = data.title;
    description.textContent = data.description;
    runtime.textContent = `${data.runtime} minutes`;
    showtime.textContent = data.showtime;
    availableTickets.textContent = `Available Tickets: ${ticketsAvailable}`;
}

// Set up the buy ticket button with a click event
function setupBuyButton() {
    const buyTicket = document.getElementById("buy-ticket");
    buyTicket.addEventListener("click", function () {
        if (currentFilm) {
            handleTicketBuying(currentFilm);
        }
    });
}

// Handle the ticket buying process
function handleTicketBuying(data) {
    const filmId = data.id;
    const availableTickets = document.getElementById("available-tickets");
    const ticketsAvailable = data.capacity - data.tickets_sold;

    // Check if there are available tickets
    if (ticketsAvailable > 0) {
        // Send a PATCH request to update the tickets sold
        fetch(`${url}${filmId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tickets_sold: data.tickets_sold + 1
            })
        })
        .then(response => response.json())
        .then(updatedData => {
            currentFilm = updatedData;
            const newTicketsAvailable = updatedData.capacity - updatedData.tickets_sold;
            availableTickets.textContent = `Available Tickets: ${newTicketsAvailable}`;

            // Show a success message
            const message = document.getElementById("message");
            message.style.display = "block";
            setTimeout(() => {
                message.style.display = "none";
            }, 1000);
        })
        .catch(error => console.error('Error updating data:', error));
    } else {
        // Show a sold-out message if no tickets are available
        const message = document.getElementById("message");
        message.textContent = "Sorry, tickets are sold out.";
        message.style.display = "block";
        setTimeout(() => {
            message.style.display = "none";
        }, 1000);
    }
}
