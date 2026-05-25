import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IMessage extends Document {
  _id: mongoose.Types.ObjectId
  conversationId: mongoose.Types.ObjectId
  senderId: mongoose.Types.ObjectId
  senderName: string
  senderAvatar: string
  senderType: 'user' | 'staff' | 'doctor'
  content: string
  timestamp: Date
  read: boolean
}

export interface IConversation extends Document {
  _id: mongoose.Types.ObjectId
  participants: mongoose.Types.ObjectId[]
  participantName: string
  participantAvatar: string
  participantRole: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  createdAt: Date
  updatedAt: Date
}

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    senderId: { type: Schema.Types.ObjectId, required: true },
    senderName: { type: String, required: true },
    senderAvatar: { type: String, default: '/placeholder.svg' },
    senderType: {
      type: String,
      enum: ['user', 'staff', 'doctor'],
      required: true,
    },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const ConversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    participantName: { type: String, required: true },
    participantAvatar: { type: String, default: '/placeholder.svg' },
    participantRole: { type: String, required: true },
    lastMessage: { type: String },
    lastMessageTime: { type: Date, default: Date.now },
    unreadCount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema)

export const Conversation: Model<IConversation> =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>('Conversation', ConversationSchema)
