import { IndexType, Permission } from "node-appwrite";

// grabbing names of database and collection
import { db, questionCollection } from "../name";
import { databases } from "./config";

export default async function createQuestionCollection() {
  // create collection
  await databases.createCollection(db, questionCollection, questionCollection, [
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

  console.log("Question collection is created");

  // creating attributes and indexes

  await Promise.all([
    databases.createStringAttribute(db, questionCollection, "title", 100, true),
    databases.createStringAttribute(
      db,
      questionCollection,
      "content",
      10000,
      true,
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      "authorId",
      50,
      true,
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      "tags",
      50,
      true,
      undefined,
      true,
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      "attatchmentId",
      50,
      false,
    ),
  ]);

  console.log("Question Attributes Created");

  // create Index
  // if this dosent work create it using gui on appwrite

  await Promise.all([
    databases.createIndex(db, questionCollection, "title", IndexType.Fulltext,["title"],["asc"]),
    databases.createIndex(db, questionCollection, "content", IndexType.Fulltext,["content"],["asc"]),
  ]);
}
