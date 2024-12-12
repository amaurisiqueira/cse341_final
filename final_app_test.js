const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const footballClubsRouter = require("./routers/footballClubs");
const matchesRouter = require("./routers/matches");
const fanProfileRouter = require("./routers/fanProfile");
const fanInteraction = require("./routers/fanInteraction");

const loginRouter = require("./routers/index");
const cors = require("cors");
const env = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const authMiddleware = require("./utils/checkAuth");

const GitHubStrategy = require("passport-github2").Strategy;
env.config();

// Conexión a MongoDB
// const {connectToDatabase, getDatabase} = require("./connections/conection");

// Middleware para cabeceras de CORS (si es necesario, podría eliminarse por la configuración de CORS anterior)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, OPTIONS, DELETE"
  );
  next();
});

// Middleware de CORS
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware de express-session
app.use(
  session({
    secret: "clave-secreta-para-sesion",
    resave: false,
    saveUninitialized: true,
  })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Configuración de Passport con GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACKURL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Serializa el usuario para almacenarlo en la sesión
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserializa el usuario desde la sesión
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas protegidas por autenticación
//be login out of restriction of autentication
app.use("/", loginRouter);
app.use("/club", authMiddleware, footballClubsRouter);
app.use("/matches", authMiddleware, matchesRouter);
app.use("/fanprofile", authMiddleware, fanProfileRouter);
app.use("/faninteraction", authMiddleware, fanInteraction);

// Middleware para manejar rutas no definidas
app.use((req, res, next) => {
  console.log("Ruta no encontrada:", req.url);
  const error = new Error("Unknown route!");
  error.status = 404;
  next(error);
});

// Middleware para manejar errores
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

// Exporta la aplicación Express para ser utilizada en las pruebas
module.exports = app;