import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
import type { InferSchemaType } from "mongoose";

const emotionSnapshotSchema = new Schema(
  {
    label: {
      type: String,
      enum: ["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"],
      required: true,
    },
    probability: {
      type: Number,
      min: 0,
      max: 1,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const sessionMetricsSchema = new Schema(
  {
    session: {
      type: Schema.Types.ObjectId,
      ref: "InterviewSession",
      required: true,
      unique: true,
    },
    postureScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    eyeContactScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    gestureScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    speechPaceWpm: {
      type: Number,
      default: 0,
    },
    speechClarityScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    fillerWordFrequency: {
      type: Number,
      default: 0,
    },
    emotionTimeline: {
      type: [emotionSnapshotSchema],
      default: [],
    },
    recommendations: {
      type: [String],
      default: [],
    },
    overallPerformanceScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
      index: true,
    },
  },
  { timestamps: true }
);

sessionMetricsSchema.index({ overallPerformanceScore: -1 });

export type SessionMetricsDocument = InferSchemaType<typeof sessionMetricsSchema>;
export const SessionMetricsModel =
  models.SessionMetrics || model("SessionMetrics", sessionMetricsSchema);
