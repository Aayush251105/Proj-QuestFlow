"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.avatars = exports.users = exports.databases = exports.client = void 0;
var env_1 = require("@/app/env");
var node_appwrite_1 = require("node-appwrite");
var client = new node_appwrite_1.Client();
exports.client = client;
client
    .setEndpoint(env_1.default.appwrite.endpoint) // Your API Endpoint
    .setProject(env_1.default.appwrite.projectId) // Your project ID
    .setKey(env_1.default.appwrite.apikey); // Your secret API key
// copy paste from clients config
// what are these 
/*
    These are like “mini-APIs” scoped to specific features:

databases → lets you query, insert, update, or delete documents in your database.

account → handles user authentication, sessions, and account details.

avatars → generates dynamic avatar images, QR codes, and other graphics.

storage → handles uploading, downloading, and deleting files.

All of these use the same client so they’re already connected to your endpoint and project.
*/
var databases = new node_appwrite_1.Databases(client);
exports.databases = databases;
var avatars = new node_appwrite_1.Avatars(client);
exports.avatars = avatars;
var storage = new node_appwrite_1.Storage(client);
exports.storage = storage;
var users = new node_appwrite_1.Users(client);
exports.users = users;
