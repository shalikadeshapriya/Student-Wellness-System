import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICrowdLevel extends Document {
  _id: mongoose.Types.ObjectId
  level: 'low' | 'moderate' | 'high'
  currentCount: number
  maxCapacity: number
  waitTime: number
  updatedAt: Date
}

export interface ICrowdHistory extends Document {
  _id: mongoose.Types.ObjectId
  level: 'low' | 'moderate' | 'high'
  count: number
  recordedAt: Date
}

const CrowdLevelSchema = new Schema<ICrowdLevel>(
  {
    level: {
      type: String,
      enum: ['low', 'moderate', 'high'],
      default: 'low',
    },
    currentCount: { type: Number, default: 0 },
    maxCapacity: { type: Number, default: 100 },
    waitTime: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const CrowdHistorySchema = new Schema<ICrowdHistory>({
  level: {
    type: String,
    enum: ['low', 'moderate', 'high'],
    required: true,
  },
  count: { type: Number, required: true },
  recordedAt: { type: Date, default: Date.now },
})

export const CrowdLevel: Model<ICrowdLevel> =
  mongoose.models.CrowdLevel ||
  mongoose.model<ICrowdLevel>('CrowdLevel', CrowdLevelSchema)

export const CrowdHistory: Model<ICrowdHistory> =
  mongoose.models.CrowdHistory ||
  mongoose.model<ICrowdHistory>('CrowdHistory', CrowdHistorySchema)
