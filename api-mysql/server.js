const express = require("express");
const cors = require("cors");
const path = require("path")

const app = express();

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'Front')));

// simple route
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Front', 'public.html'))
});

app.get("/logInSignUp", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Front/logInSignUp.html'))
});

app.get("/user", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Front/user.html'))
});

app.get("/admin", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Front/admin.html'))
});

app.get("/moderator", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Front/moderator.html'))
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}