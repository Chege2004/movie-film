let url = "http://localhost:3000/films/";
let currentFilm = null;

document.addEventListener("DOMContentLoaded", function () {
    loadPage();
    loadFilmList();
    setupBuyButton();
});

function loadPage() {
    loadFilmDetails(1);
}

function loadFilmList() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const filmList = document.getElementById("films");
            filmList.innerHTML = '';

            data.forEach(film => {
                const filmItem = document.createElement("li");
                filmItem.className = "film item";
                filmItem.textContent = film.title;
                filmItem.addEventListener("click", () => loadFilmDetails(film.id));
                filmList.appendChild(filmItem);
            });
        })
        .catch(error => console.error('Error fetching film list:', error));
}

function loadFilmDetails(filmId) {
    fetch(`${url}${filmId}`)
        .then(response => response.json())
        .then(data => {
            currentFilm = data;
            updateFilmDetails(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function updateFilmDetails(data) {
    const posterUrl = document.getElementById("poster");
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const runtime = document.getElementById("runtime");
    const showtime = document.getElementById("showtime");
    const availableTickets = document.getElementById("available-tickets");

    const ticketsAvailable = data.capacity - data.tickets_sold;

    posterUrl.src = data.poster;
    title.textContent = data.title;
    description.textContent = data.description;
    runtime.textContent = `${data.runtime} minutes`;
    showtime.textContent = data.showtime;
    availableTickets.textContent = `Available Tickets: ${ticketsAvailable}`;
}

function setupBuyButton() {
    const buyTicket = document.getElementById("buy-ticket");
    buyTicket.addEventListener("click", function () {
        if (currentFilm) {
            handleTicketBuying(currentFilm);
        }
    });
}

function handleTicketBuying(data) {
    const filmId = data.id;
    const availableTickets = document.getElementById("available-tickets");
    const ticketsAvailable = data.capacity - data.tickets_sold;

    if (ticketsAvailable > 0) {
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

            const message = document.getElementById("message");
            message.style.display = "block";
            setTimeout(() => {
                message.style.display = "none";
            }, 1000);
        })
        .catch(error => console.error('Error updating data:', error));
    }else {
        const message = document.getElementById("message");
        message.textContent = "Sorry, tickets are sold out.";
        message.style.display = "block";
        setTimeout(() => {
            message.style.display = "none";
        }, 1000);
    }
}
