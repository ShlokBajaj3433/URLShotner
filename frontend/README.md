# URL Shortener Frontend

This project is a frontend application for a URL shortener service. It allows users to shorten URLs, view a list of shortened URLs, and see statistics related to the shortened links.

## Project Structure

- **src/**: Contains all the source code for the application.
  - **App.jsx**: Main component that sets up routing and includes main functionalities.
  - **App.css**: Styles for the App component.
  - **main.jsx**: Entry point of the React application.
  - **index.css**: Global styles for the application.
  - **components/**: Contains reusable components.
    - **URLShortener.jsx**: User interface for shortening URLs.
    - **URLList.jsx**: Displays a list of shortened URLs.
    - **URLStats.jsx**: Shows statistics for shortened URLs.
  - **services/**: Contains API call functions.
    - **api.js**: Functions for creating and fetching shortened URLs.
  - **hooks/**: Custom hooks for managing API calls.
    - **useAPI.js**: Logic for fetching data from the API.
  - **utils/**: Utility functions and constants.
    - **constants.js**: Constants used throughout the application.
  - **assets/**: Contains static assets like images and SVGs.
    - **react.svg**: Branding or decorative SVG asset.

- **public/**: Contains public assets.
  - **vite.svg**: Application logo or icon.

- **index.html**: Main HTML file for the React application.

- **package.json**: Configuration file for npm, listing dependencies and scripts.

- **vite.config.js**: Configuration file for Vite.

- **eslint.config.js**: Configuration file for ESLint.

- **.gitignore**: Specifies files to be ignored by Git.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd url-shortener-frontend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

- Enter a URL in the input field and click the "Shorten" button to create a shortened URL.
- View the list of shortened URLs below the input field.
- Click on a shortened URL to see its statistics.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.