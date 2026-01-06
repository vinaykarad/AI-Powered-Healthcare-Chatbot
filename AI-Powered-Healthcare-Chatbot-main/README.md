AI-Powered Healthcare Chatbot
This repository contains the source code for an intelligent, multi-language Healthcare Chatbot designed to provide preliminary health guidance based on user-reported symptoms.

📜 Project Overview
This project is a web-based chatbot that leverages a pre-trained language model and a custom dataset of common diseases to assist users. It can understand user queries, identify symptoms, provide information about potential diseases, and offer guidance on precautions, diet, and home remedies. The entire interface is designed to be user-friendly, responsive, and accessible.

✨ Key Features
Symptom-Based Disease Prediction: Matches user-input symptoms against a pre-loaded dataset to suggest potential conditions.

AI-Powered General Chat: Utilizes a powerful pre-trained language model (via Akash Chat API) to handle general health questions and conversations.

Multi-Language Support: Users can interact with the bot and receive responses in English, Hindi, and Marathi.

Text-to-Speech: Bot responses can be read aloud, improving accessibility.

Voice-to-Text Input: Users can speak their queries directly into the chat.

Chat History: Saves previous conversations in the browser's session storage for easy review.

Dark/Light Mode: A theme toggle for user comfort.

Responsive Design: A clean and modern UI that works seamlessly on both desktop and mobile devices.

📂 File Structure
The project is organized with a clear and simple structure:

index.html: The main HTML file that contains the chatbot interface, styling, and all client-side JavaScript logic.

profile.html: A page for users to manage their profile settings.

contact.html: A page containing contact information.

welcome.html (or similar): A landing page to welcome users to the platform.

most_common_100_diseases_full.csv: The dataset containing disease information, which is loaded dynamically by the application.

🛠️ Technologies Used
Front-End: HTML5, CSS3, Vanilla JavaScript

APIs:

Akash Chat API: For natural language understanding and response generation.

Web Speech API: For voice input (SpeechRecognition) and output (SpeechSynthesis).

Libraries:

PapaParse.js: For parsing the CSV dataset directly in the browser.

⚙️ Setup and Usage
To run this project locally:

Clone the Repository:

git clone [your-repository-url]

Get an API Key:

You need a valid API key from a provider like Akash Network to power the chat model.

Open the index.html file.

Update the API Key:

Inside the <script> tag, find the callAkashChat function.

Replace the placeholder "Bearer sk-..." with your actual API key.

Run the Application:

Simply open the index.html file in your web browser. For best results and to avoid potential CORS issues with local file access, it's recommended to use a simple local server (like the "Live Server" extension in VS Code).
