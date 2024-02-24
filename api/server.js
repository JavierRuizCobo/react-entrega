const express = require("express");
const cors = require("cors");
const path = require("path")
const dbConfig = require("./app/config/db.config");

const app = express();

const db = require("./app/models");
const Role = db.role;

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Habilita las cookies en las solicitudes CORS
};

app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');

//   next();
// });

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

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Javier application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const initial = async () => {
    try {
      const count = await Role.estimatedDocumentCount();
  
      if (count === 0) {
        await new Role({ name: "user" }).save();
        console.log("Added 'user' to roles collection");
  
        await new Role({ name: "moderator" }).save();
        console.log("Added 'moderator' to roles collection");
  
        await new Role({ name: "admin" }).save();
        console.log("Added 'admin' to roles collection");
      }
    } catch (err) {
      console.error("Error initializing roles:", err);
    }
  };