## Project commands:
| Command | Description |
| ----------- | ----------- |
| npm start    | To start project   |
| npm run build    | To build project   |
| npm run dev    | To start project in dev   |
| docker compose up    | To start project with Docker   |
| docker build -t meduzzen-front . | To build Docker image |
| docker run -p 5533:6262 meduzzen-front | To run Docker container |

## App on Netlify: https://meduzzen-front.netlify.app/

<h2 style='color: rgb(49, 64, 49);'>! Before you start the project:</h2>

### * Environment variables
*You must add values to variables into .env.sample file and then rename this file to .env*

<span style='background-color: rgb(66, 66, 66);padding: 15px 50px; border-radius: 5px; color: #fff'>Example: DEV_PORT = '8000'</span>