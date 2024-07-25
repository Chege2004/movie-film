let url = "http://localhost:3000/films/"
document.addEventListener("DOMContentLoaded", function () {
    loadPage();
});

function loadPage() {
    fetch(`${url}1`)
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => console.error('Error fetching data:', error));
}
