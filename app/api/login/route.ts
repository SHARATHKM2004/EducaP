import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import Database from "better-sqlite3"
import path from "path"

// Initialize SQLite database
const dbPath = path.join(process.cwd(), "edusathi.db")
const db = new Database(dbPath)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Find user by username
    const user = db
      .prepare(`
      SELECT id, username, first_name, last_name, email, password_hash 
      FROM users 
      WHERE username = ?
    `)
      .get(username)

    if (!user) {
      return NextResponse.json({ error: "Invalid username or password. Please try again." }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid username or password. Please try again." }, { status: 401 })
    }

    // Return user data (excluding password)
    const { password_hash, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: "Login successful",
        user: userWithoutPassword,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
