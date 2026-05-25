import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IDoctorSchedule extends Document {
  _id: mongoose.Types.ObjectId
  doctorId: mongoose.Types.ObjectId
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  date: Date
  slots: {
    time: string
    status: 'available' | 'booked' | 'unavailable'
    appointmentId?: mongoose.Types.ObjectId
  }[]
}

const DoctorScheduleSchema = new Schema<IDoctorSchedule>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
    date: { type: Date, required: true },
    slots: [
      {
        time: { type: String, required: true },
        status: {
          type: String,
          enum: ['available', 'booked', 'unavailable'],
          default: 'available',
        },
        appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
      },
    ],
  },
  { timestamps: true }
)

// Compound index for efficient queries
DoctorScheduleSchema.index({ doctorId: 1, date: 1 }, { unique: true })

export const DoctorSchedule: Model<IDoctorSchedule> =
  mongoose.models.DoctorSchedule ||
  mongoose.model<IDoctorSchedule>('DoctorSchedule', DoctorScheduleSchema)
