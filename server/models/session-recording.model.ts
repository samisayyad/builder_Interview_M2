import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
import type { InferSchemaType } from "mongoose";

const timelineEntrySchema = new Schema(
  {
    timestamp: { type: Number, required: true },
    event: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { _id: false }
);

const sessionRecordingSchema = new Schema(
  {
    session: {
      type: Schema.Types.ObjectId,
      ref: "InterviewSession",
      required: true,
      unique: true,
    },
    storagePath: {
      type: String,
      required: true,
    },
    durationSeconds: {
      type: Number,
      default: 0,
    },
    analysisSummary: {
      type: String,
    },
    timeline: {
      type: [timelineEntrySchema],
      default: [],
    },
  },
  { timestamps: true }
);

sessionRecordingSchema.index({ createdAt: -1 });

export type SessionRecordingDocument = InferSchemaType<typeof sessionRecordingSchema>;
export const SessionRecordingModel =
  models.SessionRecording || model("SessionRecording", sessionRecordingSchema);
