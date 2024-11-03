# Chatbot UI POC

This is a small POC for an LLM chatbot.
I built this to get some exposure to technologies and patterns I rarely use.
This POC focuses on having a good architecture in the frontend and the backend.
My intent is to use this as a reference for future projects.


## Running the application

### Backend

1. Make sure [bun](https://bun.sh/) is installed.
2. Navigate to the `backend` directory.
3. Create a free API key on [Google AI Studio](https://aistudio.google.com/)
4. run `cp .env.local.template .env.local`
5. Enter your API key in `.env.local` at the `MODEL__API_KEY` key
6. run `bun install`
7. run `bun run --watch src/index.ts`

### Frontend

1. Make sure [Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
   is installed. I highly recommend using [nvm](https://github.com/nvm-sh/nvm).
2. Navigate to the `frontend` directory.
3. `npm install`
4. `npm run dev`
5. open <http://localhost:5173/>
