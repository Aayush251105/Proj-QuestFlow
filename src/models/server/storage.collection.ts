// pasted from hitesh repo
import { Permission } from "node-appwrite";
import { questionAttatchmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
    try {
        // get bucket if already present
        await storage.getBucket(questionAttatchmentBucket);
        console.log("Storage Connected");
    } catch (error) {
        // create bucket
        try {
            await storage.createBucket(
                questionAttatchmentBucket,
                questionAttatchmentBucket,
                [
                    Permission.create("users"),
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                false,
                undefined,
                undefined,
                ["jpg", "png", "gif", "jpeg", "webp", "heic"]
            );

            console.log("Storage Created");
            console.log("Storage Connected");
        } catch (error) {
            console.error("Error creating storage:", error);
        }
    }
}