# Cryptocurrency Tracking Application

This is a mobile-first responsive web application for tracking cryptocurrencies. It provides a list of cryptocurrencies with their logos, current traded value, and net rise/fall in prices over the last 24 hours, 7 days, 1 hour, 30 days, and 60 days on mobile. Additionally, it includes a CryptoConverter feature to convert between different cryptocurrencies.

## Technologies Used

- Frontend: React, Tailwind CSS, Material-UI, Redux, Axios, Vite
- Backend: Node.js, Express, Axios
- API: CoinMarketCap API

## Project Structure

- `/client`: React frontend application (Vite)
- `/server`: Node.js backend index

## Setup Instructions

1. Clone the repository: `git clone https://github.com/manitejaraogurenka/cryptotracker.git`
2. Install dependencies for frontend and backend:
   - Frontend: `cd client && npm install`
   - Backend: `cd index && npm install`
3. Set up environment variables:
   - Create a `.env` file in the `index` directory and add your CoinMarketCap API key (`CRYPTO_API_KEY=your-api-key`)
4. Run the frontend and backend indexs concurrently:
   - Frontend: `cd client && npm start`
   - Backend: `cd index && nodemon index.js`
5. Access the application at `http://localhost:5173`

## Future Improvements

- If posiible Improve pagination by numbers for the cryptocurrency list
- Add user authentication and account management if neccessary
- Enhance the UI/UX design for better user interaction

## Contact

For any issues or feedback, please contact us at [mailto:gurenkamanitejarao@gmail.com](mailto:gurenkamanitejarao@gmail.com)
