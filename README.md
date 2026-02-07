This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build the app

```bash
npm run build
# and
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes
1) Longpolling is used to get new messages from server via setInterval, ideally it should be websocket.
2) Error handling: in case of any error I've added error block after all messages. If error is in posting a new message, then error is shown in message card
3) If a new message is added and used have scrolled to the top, then I force scroll to bottom to show the message.
4) There is no info in the task description about before query param for gettting messages, but I've checked server and decided to use it
5) I've added "Load more messages button", if I had more time, I would prefer infinite scroll.
6) I've hardcoded my name for messages, in reality should be log in function. Left it in context for this. Could be in const as well
7) I've written only basic tests for the app for now.

#### !!! I faced with the error in initial page load bottom scrolling, I didn't have enough time to understand the issue, so left initial page without bottom scrolling for now.