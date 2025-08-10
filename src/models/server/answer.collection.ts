//copy paste from questions and update
import { IndexType, Permission } from "node-appwrite";

// grabbing names of database and collection
import { db, answerCollection } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
  // create collection
  await databases.createCollection(db, answerCollection, answerCollection, [
    // these permissions are based on roles which van be modifies on appwrite
    // by default 2 roles available
    // 1. any = has read permission
    // 2. user = who has all permissions
    // any have only read permission
    Permission.read("any"),
    // users have all
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);

  console.log("Answer collection is created");

  // creating attributes and indexes

  await Promise.all([
    databases.createStringAttribute(
      db,
      answerCollection,
      "content",
      10000,
      true,
    ),
    databases.createStringAttribute(
      db,
      answerCollection,
      "questionId",
      50,
      true,
    ),
    databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
  ]);

  console.log("Answer Attributes Created");

}
