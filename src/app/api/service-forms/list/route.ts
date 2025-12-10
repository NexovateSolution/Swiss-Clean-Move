import { NextRequest, NextResponse } from 'next/server'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function GET(request: NextRequest) {
  try {
    const submissionsDir = join(process.cwd(), 'public', 'submissions')
    
    // Check if submissions directory exists
    if (!existsSync(submissionsDir)) {
      return NextResponse.json({ submissions: [] })
    }

    // Read all files in submissions directory
    const files = await readdir(submissionsDir)
    const jsonFiles = files.filter(file => file.endsWith('.json'))

    const submissions = []

    // Read each JSON file and parse the data
    for (const file of jsonFiles) {
      try {
        const filePath = join(submissionsDir, file)
        const fileContent = await readFile(filePath, 'utf8')
        const submissionData = JSON.parse(fileContent)
        submissions.push(submissionData)
      } catch (error) {
        console.error(`Error reading file ${file}:`, error)
        // Continue with other files even if one fails
      }
    }

    // Sort submissions by submission date (newest first)
    submissions.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime())

    return NextResponse.json({ 
      success: true, 
      submissions,
      total: submissions.length
    })

  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
