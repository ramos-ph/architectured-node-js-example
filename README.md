# Getting started

1. Clone or download the repository

2. Install the dependencies with

```
$ npm install
```

3. Start the Redis server

```
$ docker compose up -d
```

4. Create a `.env` file based on the example:

```
$ cp .env.example .env
```

Get the mail credentials at https://ethereal.email/

5. Start the server with

```
$ npm start
```

The server will be started at `http://localhost:3000`.

Together with the project there is a Bruno collection that you can use to make requests.
