import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Message, Conversation } from '@/models/Message'

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('conversationId')
    const userId = searchParams.get('userId')

    if (conversationId) {
      // Get messages for a specific conversation
      const messages = await Message.find({ conversationId })
        .sort({ timestamp: 1 })
        .limit(100)

      return NextResponse.json({
        success: true,
        data: { messages },
      })
    }

    if (userId) {
      // Get all conversations for a user
      const conversations = await Conversation.find({
        participants: userId,
      }).sort({ lastMessageTime: -1 })

      return NextResponse.json({
        success: true,
        data: { conversations },
      })
    }

    // Return both conversations and recent messages
    const conversations = await Conversation.find().sort({ lastMessageTime: -1 }).limit(20)
    
    return NextResponse.json({
      success: true,
      data: { conversations, messages: [] },
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const { conversationId, senderId, senderName, senderAvatar, senderType, content } = body

    // Create the message
    const newMessage = await Message.create({
      conversationId,
      senderId,
      senderName,
      senderAvatar: senderAvatar || '/placeholder.svg',
      senderType: senderType || 'user',
      content,
      timestamp: new Date(),
    })

    // Update the conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: content,
      lastMessageTime: new Date(),
      $inc: { unreadCount: 1 },
    })

    return NextResponse.json(
      { success: true, data: newMessage },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
