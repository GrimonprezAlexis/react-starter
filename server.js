require('dotenv').config(); // loads environment variables from a .env file into process.env

const express = require('express');
const app = express();

const router = express.Router(); // Invoke the Express Router
const apiRouter = require('./app/routes/router')(router); // Import the application end points/API
app.use('/api', apiRouter); // Assign name to end points

// serve up production assets
app.use(express.static('client/build'));
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route
const path = require('path');

//https://stackoverflow.com/questions/49566059/service-worker-registration-error-unsupported-mime-type-text-html
app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "service-worker.js"));
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// if not in production use the port 5000
const PORT = process.env.PORT || 5000;
console.log('server started on port:',PORT);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
