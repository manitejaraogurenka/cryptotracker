# Setup Instructions

## Prerequisites

- Node.js installed on your machine

## Frontend Setup

1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Start the frontend server: `npm start`
4. Access the frontend at `http://localhost:3000`

## Backend Setup

1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Set up environment variables: Create a `.env` file in the `server` directory and add your CoinMarketCap API key (`CRYPTO_API_KEY=your-api-key`)
4. Start the backend server: `npm run server`
5. Access the backend at `http://localhost:8080`

## Running the Application

1. Start the frontend server: `cd client && npm start`
2. Start the backend server: `cd server && nodemon server.js`
3. Access the application at `http://localhost:3000`

## Testing

- No specific tests are included in this setup. You can add tests using Jest or other testing libraries as needed.

## Deployment

- For deployment, you can use services like Heroku for the backend and platforms like Vercel or Netlify for the frontend.

## Additional Notes

- Make sure to replace `your-api-key` in the `.env` file with your actual CoinMarketCap API key.
