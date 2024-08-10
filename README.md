# Movie Browser

This is a movie-browsing web application that allows users to search for movies with advanced filtering options and save their favorite movies.

## Features

- Search for movies by title
- Advanced filtering options (genre, release year, rating)
- Infinite scrolling for search results
- Save favorite movies locally
- Responsive and accessible design

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add your TMDB API key:
4. Start the development server: `npm start`

## Design Decisions

- Used React.js for building a dynamic and efficient user interface
- Implemented infinite scrolling without third-party libraries for better control and performance
- Used browser local storage for saving favorites to persist user preferences
- Separated API calls and storage functions into utility files for better organization
- Implemented debounce on search to reduce unnecessary API calls

## Possible Improvements

- Add unit tests for components and utility functions
- Implement server-side rendering for better SEO
- Add more advanced filtering options (e.g., by actor, director)
- Implement user authentication to save favorites on the server
- Optimize performance with React.memo and useMemo where appropriate

This code structure provides a complete implementation of the Movie Browser web application using React.js. It includes all the required features such as search, infinite scrolling, advanced filtering, and saving favorites. The application is designed to be responsive and accessible.
To run the application:

- Make sure you have Node.js and npm installed on your system.
- Create a new React project using npx create-react-app movie-browser
- Replace the contents of the src folder with the provided files.
- Install required dependencies: npm install react-router-dom
- Install styled-components npm install styled-components
- Get an API key from TMDB (The Movie Database) and replace 'your_api_key_here' in src/utils/api.js with your actual API key.
- Run the application with npm start
