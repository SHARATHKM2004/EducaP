import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import Database from "better-sqlite3"
import path from "path"

// Initialize SQLite database
const dbPath = path.join(process.cwd(), "edusathi.db")
const db = new Database(dbPath)

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contact_number VARCHAR(10) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, firstName, lastName, email, contactNumber, password } = body

    // Validate required fields
    if (!username || !firstName || !lastName || !email || !contactNumber || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if username already exists
    const existingUser = db.prepare("SELECT id FROM users WHERE username = ? OR email = ?").get(username, email)

    if (existingUser) {
      return NextResponse.json({ error: "Username or email already exists" }, { status: 409 })
    }

    // Hash password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Insert new user
    const insertUser = db.prepare(`
      INSERT INTO users (username, first_name, last_name, email, contact_number, password_hash)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    const result = insertUser.run(username, firstName, lastName, email, contactNumber, passwordHash)

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: result.lastInsertRowid,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
