import express from "express";
import config from "config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.routes";
import helmet from "helmet";

const PORT = config.get("port") || 8808;
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use("/api/v1", routes);

async function start() {
    try {
        await mongoose.connect(config.get("dbUri"));
        app.listen(PORT, () => {
            console.log(`Server has been running at ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
