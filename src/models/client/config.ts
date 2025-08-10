import env from "@/app/env";
import { Client, Account, Avatars, Databases, Storage } from "appwrite";

// explaination
// Client: The main Appwrite SDK class that handles all API requests.

// Account: For authentication-related operations (signup, login, logout, session handling).

// Avatars: To generate placeholder avatars, QR codes, favicons, etc.

// Databases: To read/write to your Appwrite database collections.

// Storage: To manage file uploads/downloads.


// what client does 
//"Hey Appwrite SDK, here’s my server’s address and the specific project I want to work with."
const client = new Client()
  .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
  .setProject(env.appwrite.projectId); // Your project ID


// what are these 
/*
    These are like “mini-APIs” scoped to specific features:

databases → lets you query, insert, update, or delete documents in your database.

account → handles user authentication, sessions, and account details.

avatars → generates dynamic avatar images, QR codes, and other graphics.

storage → handles uploading, downloading, and deleting files.

All of these use the same client so they’re already connected to your endpoint and project.
*/
const databases = new Databases(client);
const account = new Account(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export {client , databases , account ,avatars , storage}

