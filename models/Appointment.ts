import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IAppointment extends Document {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  doctorId: mongoose.Types.ObjectId
  doctorName: string
  doctorSpecialization: string
  doctorAvatar: string
  date: Date
  time: string
  type: string
  status: 'upcoming' | 'completed' | 'cancelled'
  location: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    doctorName: { type: String, required: true },
    doctorSpecialization: { type: String, required: true },
    doctorAvatar: { type: String, default: '/placeholder.svg' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    type: { type: String, required: true },
    status: {
      type: String,
      enum: ['upcoming', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    location: { type: String, default: 'Medical Center Room 101' },
    notes: { type: String },
  },
  { timestamps: true }
)

export const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>('Appointment', AppointmentSchema)
