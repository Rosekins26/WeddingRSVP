import { type NextRequest, NextResponse } from "next/server"
import { getInvitationByName, createRsvpSubmission } from "../../../lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get("name")

    if (!name) {
      return NextResponse.json({ error: "Name parameter required" }, { status: 400 })
    }

    const invitation = await getInvitationByName(name)

    if (!invitation) {
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 })
    }

    return NextResponse.json(invitation)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to search invitation" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { invitationId, guests } = await request.json()

    if (!invitationId || !guests || !Array.isArray(guests)) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    const submission = await createRsvpSubmission(invitationId, guests)
    return NextResponse.json(submission)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 })
  }
}
