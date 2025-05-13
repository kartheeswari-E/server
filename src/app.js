import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import jwt from "jsonwebtoken";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";

import connectDB from "./db.js";
import config from "./config.js";
import typeDefs from "./data/types/index.js";
import resolvers from "./data/resolvers/index.js";
import "./services/scheduler.js";
import setupFirebaseListeners from "./services/fire_base_listener.js";

setupFirebaseListeners();
const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [
		process.env.ENABLE_PLAYGROUND === "true" ? ApolloServerPluginLandingPageLocalDefault() : ApolloServerPluginLandingPageDisabled(),
		ApolloServerPluginDrainHttpServer({ httpServer }),
	],
	formatError: (err) => {
		try {
			const errorMessage = JSON.parse(err.message);
			return errorMessage;
		} catch (e) {
			return err;
		}
	},
});

await server.start();

app.get("/", function (req, res) {
	res.send("Welcome");
});

app.use(express.static("public"));

app.use(
	"/graphql",
	cors(),
	express.json(),
	graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 20 }),
	expressMiddleware(server, {
		context: ({ req }) => {
			const token = req.headers.authorization || "";
			try {
				const user = jwt.verify(token.substring(7), process.env.SECRET);
				return { user: user, type: user.type, headers: req.headers };
			} catch (e) {}
			return { user: null, type: "user", headers: req.headers };
		},
	}),
);

const appServer = await new Promise((resolve) => httpServer.listen({ port: config.port }, resolve));

await connectDB();

console.log(`🚀 Server is running at ${process.env.APP_URL}`);
