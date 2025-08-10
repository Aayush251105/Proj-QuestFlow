import { IndexType, Permission } from "node-appwrite";

// grabbing names of database and collection
import { db, commentCollection } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
  // create collection
  await databases.createCollection(db, commentCollection, commentCollection, [
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

  console.log("Comment collection is created");

  // creating attributes and indexes

  await Promise.all([
    databases.createStringAttribute(
      db,
      commentCollection,
      "content",
      10000,
      true,
    ),
    // new field
    databases.createEnumAttribute(
      db,
      commentCollection,
      "type",
      ["answer","question"],
      true,
    ),
    databases.createStringAttribute(
      db,
      commentCollection,
      "typeId",
      50,
      true,
    ),
    databases.createStringAttribute(
      db,
      commentCollection,
      "authorId",
      50,
      false,
    ),
  ]);

  console.log("Comment Attributes Created");

}
