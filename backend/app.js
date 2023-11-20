import express from "express"
import session from "express-session";
import bodyParser from "body-parser";
import router from "./Routes/APIroutes.js";
import SubpagesRouter from "./Routes/Subpages.js"

const app = express();


//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'user', // code
    resave: false,
    saveUninitialized: true
}));

app.use("/", express.static("frontend"))
app.use("/api/v1", router)
app.use("/", SubpagesRouter)

export default app;