import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IHealthAlert extends Document {
  _id: mongoose.Types.ObjectId
  type: 'alert' | 'tip' | 'news'
  title: string
  content: string
  severity: 'low' | 'medium' | 'high'
  date: Date
  read: boolean
  createdAt: Date
  updatedAt: Date
}

const HealthAlertSchema = new Schema<IHealthAlert>(
  {
    type: {
      type: String,
      enum: ['alert', 'tip', 'news'],
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low',
    },
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const HealthAlert: Model<IHealthAlert> =
  mongoose.models.HealthAlert ||
  mongoose.model<IHealthAlert>('HealthAlert', HealthAlertSchema)
