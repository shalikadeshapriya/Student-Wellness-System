import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IDoctor extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  specialization: string
  avatarUrl: string
  status: 'available' | 'unavailable' | 'busy'
  nextAvailable?: string
  experience: number
  rating: number
  consultationFee: number
  education: string
  bio: string
  createdAt: Date
  updatedAt: Date
}

const DoctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    avatarUrl: { type: String, default: '/placeholder.svg' },
    status: {
      type: String,
      enum: ['available', 'unavailable', 'busy'],
      default: 'available',
    },
    nextAvailable: { type: String },
    experience: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    consultationFee: { type: Number, default: 0 },
    education: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
)

export const Doctor: Model<IDoctor> =
  mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema)
