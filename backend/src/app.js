import 'dotenv/config';
import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";

// .env is expected to be loaded via dotenv/register or via the shell.
// (If MONGODB_URI is not set, app will throw a clear error below.)


const app = express();
const server = createServer(app);
connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        console.error("MONGODB_URI is not set.");
        process.exit(1);
    }

    const connectionDb = await mongoose.connect(mongoUri, {
        tls: true,
        tlsAllowInvalidCertificates: true,
    });

    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
        console.log(`LISTENIN ON PORT ${app.get("port")}`);
    });
};
start();