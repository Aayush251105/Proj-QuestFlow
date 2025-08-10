import env from "@/app/env";
import { Avatars, Client, Databases, Storage, Users } from "node-appwrite";

let client = new Client();

client
  .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
  .setProject(env.appwrite.projectId) // Your project ID
  .setKey(env.appwrite.apikey); // Your secret API key

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
  const databases = new Databases(client);
  const avatars = new Avatars(client);
  const storage = new Storage(client);
  const users = new Users(client)
  
  export {client , databases , users ,avatars , storage}
  