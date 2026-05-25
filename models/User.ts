import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  fullName: string
  studentId: string
  email: string
  password: string
  avatarUrl?: string
  phone?: string
  dateOfBirth?: Date
  bloodType?: string
  allergies?: string
  emergencyContact?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },
    phone: { type: String },
    dateOfBirth: { type: Date },
    bloodType: { type: String },
    allergies: { type: String },
    emergencyContact: { type: String },
  },
  { timestamps: true }
)

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
