
```markdown
# Translator App

This is a React-based Translator App built with Vite. The application allows users to translate text between English and Portuguese using an API for translation services.

## Features

- Translate text between English and Portuguese.
- Toggle between translation directions (English to Portuguese / Portuguese to English).
- Displays the translated text alongside the input text.
- Includes error handling for failed translations.
- Visual feedback during translation with a loading spinner.
- User-friendly interface with clear navigation.

## Installation

Follow the steps below to set up the project:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd translator-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

1. Open the app in your browser at [http://localhost:5173](http://localhost:5173).
2. Enter text into the input field on the left.
3. Select the translation direction:
   - English to Portuguese
   - Portuguese to English
4. Click the "Translate" button.
5. View the translated text on the right.
6. Clear the input field using the "clear" button if needed.

## API Integration

This app uses a Flask API hosted on Vercel for translation services. The API endpoint is:

```
https://python-api-eight.vercel.app/translate
```

The request payload for translation is structured as follows:

```json
{
  "text": "Text to be translated",
  "direction": "English to Portuguese"
}
```

### Response

Success:

```json
{
  "translated_text": "Texto traduzido"
}
```

Error:

```json
{
  "error": "Error message"
}
```

## Technologies Used

- **Frontend**: React, Vite, TypeScript, TailwindCSS
- **Backend API**: Flask, Vercel (for hosting)
- **HTTP Client**: Axios

## Project Structure

```
src/
├── components/
│   └── Translator.tsx   # Main Translator component
├── App.tsx              # Entry point of the application
├── main.tsx             # ReactDOM rendering
├── styles/              # CSS and Tailwind configurations
└── vite.config.ts       # Vite configuration
```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run preview`: Previews the production build.

## Future Enhancements

- Add support for more languages.
- Enable text-to-speech functionality for translated text.
- Save translation history locally or in a database.
- Enhance error messages for better user experience.

## Contributing

Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
```

