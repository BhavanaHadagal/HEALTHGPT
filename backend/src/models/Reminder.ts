import mongoose, { Document, Schema } from 'mongoose';

export interface IReminder extends Document {
  sessionId: string;
  medicineName: string;
  dosage: string;
  frequency: 'once' | 'twice' | 'thrice' | 'custom';
  times: string[];
  startDate: Date;
  endDate?: Date;
  notes?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReminderSchema = new Schema<IReminder>(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    medicineName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    dosage: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    frequency: {
      type: String,
      enum: ['once', 'twice', 'thrice', 'custom'],
      required: true,
    },
    times: [
      {
        type: String,
        trim: true,
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ReminderSchema.index({ sessionId: 1, isActive: 1 });

export default mongoose.model<IReminder>('Reminder', ReminderSchema);
