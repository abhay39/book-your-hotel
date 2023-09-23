import { NextResponse } from "next/server"

export async function GET(request){
    return NextResponse.json({
        "message":"Login Page is running successfully!!"
    },{status:202})
}

