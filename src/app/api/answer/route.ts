import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

// for user Reputation
import {UserPrefs} from '@/store/Auth'


// creating answer post 
// refer database attributes for better guidance
export async function POST(request : NextRequest){
    try {
        // refer attributes
        const {questionId, answer, authorId} = await request.json();

        const response = await databases.createDocument(db, answerCollection, ID.unique(), {
            content: answer,
            authorId,
            questionId
        })

        // Increase author reputation
        const prefs = await users.getPrefs<UserPrefs>(authorId);
        await users.updatePrefs(authorId, {
            reputation: Number(prefs.reputation) + 1
        })

        return NextResponse.json(response , {
             status: 201
        })
        

    } catch (error) {
        return NextResponse.json({
            Error: error?.message || "Error creating answer"
        },
    { status: error?.status || error?.code || 500})
    }
}

export async function DELETE(request: NextRequest){
    try {
        
        const {answerId} = await request.json()

        const answer = await databases.getDocument(db , answerCollection , answerId)

        const response = await databases.deleteDocument(db , answerCollection, answerId)

        // decrease the reputation
        const prefs = await users.getPrefs<UserPrefs>(answer.authorId);
        await users.updatePrefs(answer.authorId, {
            reputation: Number(prefs.reputation) - 1
        })

        return NextResponse.json(response , {
             status: 201
        })

    } catch (error) {
        return NextResponse.json({
            Error: error?.message || "Error creating answer"
        },
        { status: error?.status || error?.code || 500})
    }
}