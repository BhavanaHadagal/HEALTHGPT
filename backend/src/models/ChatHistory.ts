import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface IChatSession extends Document {
  sessionId: string;
  language: 'en' | 'hi' | 'kn';
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatSessionSchema = new Schema<IChatSession>(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    language: {
      type: String,
      enum: ['en', 'hi', 'kn'],
      default: 'en',
    },
    messages: [MessageSchema],
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
ChatSessionSchema.index({ sessionId: 1, createdAt: -1 });

export default mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);
