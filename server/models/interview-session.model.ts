import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
import type { InferSchemaType } from "mongoose";

const feedbackSchema = new Schema(
  {
    category: { type: String, required: true },
    score: { type: Number, min: 0, max: 100, required: true },
    comments: { type: String },
  },
  { _id: false }
);

const interviewSessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    domain: {
      type: Schema.Types.ObjectId,
      ref: "InterviewDomain",
      required: true,
      index: true,
    },
    sessionType: {
      type: String,
      enum: ["mock", "audio", "video", "case"],
      default: "mock",
      index: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "in_progress", "completed", "cancelled"],
      default: "scheduled",
      index: true,
    },
    scheduledAt: {
      type: Date,
      index: true,
    },
    completedAt: {
      type: Date,
    },
    recording: {
      videoUrl: { type: String },
      audioUrl: { type: String },
      transcriptUrl: { type: String },
    },
    feedback: [feedbackSchema],
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    recommendations: {
      type: [String],
      default: [],
    },
    analytics: {
      pose: Schema.Types.Mixed,
      speech: Schema.Types.Mixed,
      emotions: Schema.Types.Mixed,
      timeline: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

interviewSessionSchema.index({ user: 1, createdAt: -1 });
interviewSessionSchema.index({ status: 1, scheduledAt: 1 });

export type InterviewSessionDocument = InferSchemaType<typeof interviewSessionSchema>;
export const InterviewSessionModel =
  models.InterviewSession || model("InterviewSession", interviewSessionSchema);
