# Cryptocurrency Tracking Application

This is a mobile-first responsive web application for tracking cryptocurrencies. It provides a list of cryptocurrencies with their logos, current traded value, and net rise/fall in prices over the last 24 hours and 7 days on mobile. and 1hr, 24hr, 7days, 30days, 60days Additionally, it includes a CryptoConverter feature to convert between different cryptocurrencies.

## Technologies Used

- Frontend: React, Tailwind CSS, Material-UI, Redux, Axios
- Backend: Node.js, Express, Axios
- API: CoinMarketCap API

## Project Structure

- `/client`: React frontend application
- `/server`: Node.js backend server

## Setup Instructions

1. Clone the repository: `git clone https://github.com/your-repo.git`
2. Install dependencies for frontend and backend:
   - Frontend: `cd client && npm install`
   - Backend: `cd server && npm install`
3. Set up environment variables:
   - Create a `.env` file in the `server` directory and add your CoinMarketCap API key (`CRYPTO_API_KEY=your-api-key`)
4. Run the frontend and backend servers concurrently:
   - Frontend: `cd client && npm start`
   - Backend: `cd server && nodemon server.js`
5. Access the application at `http://localhost:3000`

## Future Improvements

- If posiible Improve pagination by numbers for the cryptocurrency list
- Add user authentication and account management if neccessary
- Enhance the UI/UX design for better user interaction

## Contact

For any issues or feedback, please contact us at [mailto:gurenkamanitejarao@gmail.com](mailto:gurenkamanitejarao@gmail.com)
