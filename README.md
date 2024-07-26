# movie-film
# Flatdango

Flatdango is a web application that allows users to browse and purchase tickets for movies. Users can view movie details, check ticket availability, and buy tickets directly from the interface.

## Features

- Display a list of available movies.
- View detailed information about each movie.
- Check the number of available tickets for a movie.
- Buy tickets for a selected movie.
- Real-time updates on ticket availability.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Chege2004/movie-film.git
   cd workspace

Ensure you have a local server running to serve the films endpoint. You can use a tool like json-server to simulate an API.

Start the server:
  json-server --watch db.json --port 3000
Open index.html in your browser.

Usage
Movie List: On the left side, a list of available movies is displayed. Click on any movie to view its details.
Movie Details: On the right side, details of the selected movie are shown, including a poster, title, description, runtime, showtime, and available tickets.
Buy Ticket: Click the "Buy Ticket" button to purchase a ticket. A success message will briefly appear, and the number of available tickets will decrease.
Development
The application is built using HTML, CSS, and JavaScript.

Key Files
index.html: The main HTML file.
index.css: Contains styles for the layout.
index.js: Handles fetching data, updating the UI, and managing interactions.
Endpoints
GET /films: Retrieves a list of all films.
GET /films/1: Retrieves details for a specific film.
PATCH /films/{id}: Updates the number of tickets sold for a film.

License
This project is licensed under the MIT License.