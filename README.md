# currency-converter

## Description
Currency Converter is a simple web application that allows users to convert currency using the latest exchange rates from Fixer.io. Users can select a base currency and a currency to convert to, and switch them using a toggle button. Calculations are performed on the client side, and the latest exchange rates are loaded when the page is opened.

Exchange rate requests to Fixer.io are cached on the server, and cached values are used if they are less than 1 minute old. This reduces the number of API calls and improves performance.

## Installation and Running
To run this application, you will need Node.js and internet access.

### Configure API Key
To allow the application to get the latest exchange rates, you'll need to specify your Fixer.io API key. 
1. Navigate to the `./server` directory.
2. Rename the `.env.sample` file to `.env`.
3. Open the `.env` file and specify your Fixer.io API key:

```
API_KEY=your_key_here
```

### Starting the Server
After configuring the API key, you can start the server.
1. Navigate to the `./server` directory in the terminal.
2. Run the following command to start the server:

```
node server.js
```

### Client Setup
To run the client part of the application:

1. Navigate to the `./client` directory.
2. Open the `index.html` file in your preferred web browser.

## Technologies
The application is developed using Vanilla JavaScript, HTML, and CSS without any frameworks.

## License
This project is licensed under the MIT License.
