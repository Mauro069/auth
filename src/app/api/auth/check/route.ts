import { NextRequest, NextResponse } from 'next/server'
import { connectMongoDB } from '@/lib/mongodb'
import { messages } from '@/utils/messages'
import { headers } from 'next/headers'
import User from '@/models/User'
import jwt from 'jsonwebtoken'

export async function GET (request: NextRequest) {
  try {
    const headersList = headers()
    const token = headersList.get('token')

    if (!token) {
      return NextResponse.json(
        { message: messages.error.notAuthorized },
        { status: 400 }
      )
    }

    try {
      const isTokenValid = jwt.verify(token, 'secreto')
      // @ts-ignore
      const { data }: TokenData = isTokenValid

      await connectMongoDB()
      const userFind = await User.findById(data._id)

      if (!userFind) {
        return NextResponse.json(
          { message: messages.error.userNotFound },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { isAuthorized: true, message: messages.success.authorized },
        { status: 200 }
      )
    } catch (error) {
      return NextResponse.json(
        { message: messages.error.tokenNotValid, error },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error(error)
  }
}
