
##### Setup

Install the node modules using `npm`

```
npm install
```

Create a `.env` file to contain the environment variables. (One is shipped with this repository as example)

Run the app (locally uses `nodemon` for auto reload)

```
npm start
```


On production, a tool like `pm2` would be useful. 

```
pm2 start --name koademo
```

