import mongoose, { Schema, Document, Model } from 'mongoose'

export interface INotification extends Document {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  type: 'appointment' | 'message' | 'alert' | 'system'
  title: string
  content: string
  read: boolean
  actionUrl?: string
  createdAt: Date
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['appointment', 'message', 'alert', 'system'],
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
    actionUrl: { type: String },
  },
  { timestamps: true }
)

export const Notification: Model<INotification> =
  mongoose.models.Notification ||
  mongoose.model<INotification>('Notification', NotificationSchema)
