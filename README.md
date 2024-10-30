# AI Product Search Project

This project is a personal learning endeavor focused on integrating front-end and back-end development. The project consists of two main parts: the backend and the frontend.

## Project Structure

- **backend/**: This folder contains the backend code that utilizes Google AI's free API to search for products based on user needs. The backend then searches for these products on Amazon and
                presents the feedback either in the terminal or on the frontend's results page.
  
- **my-app-react/**: This folder is dedicated to the frontend development using React. It handles the user interface and communicates with the backend to display product search results.

## Communication Between Frontend and Backend

The communication between the frontend and backend is established through an API. The backend runs on `http://localhost:3000`, while the frontend runs on `http://localhost:5173/`. 

When a user submits a search request from the frontend, a POST request is sent to the backend with the search parameters in the request body. The backend processes the request, searches for the products, and returns the results, which are then displayed on the frontend.

## Learning Objectives

This project is entirely for self-learning purposes. It aims to enhance my understanding of:

- Frontend and backend integration
- API usage and communication
- Working with React for UI development

## Notes

- There might be some unused files in the project due to changes made in the backend code, transitioning from a fully terminal-based application to one that interfaces with a frontend.


