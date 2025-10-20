import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
import type { InferSchemaType } from "mongoose";

const behaviorQuestionSchema = new Schema(
  {
    domain: {
      type: Schema.Types.ObjectId,
      ref: "InterviewDomain",
      required: true,
      index: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    starGuidance: {
      situation: { type: String, required: true },
      task: { type: String, required: true },
      action: { type: String, required: true },
      result: { type: String, required: true },
    },
    tags: {
      type: [String],
      default: [],
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
  },
  { timestamps: true }
);

behaviorQuestionSchema.index({ domain: 1, difficulty: 1 });

export type BehaviorQuestionDocument = InferSchemaType<typeof behaviorQuestionSchema>;
export const BehaviorQuestionModel =
  models.BehaviorQuestion || model("BehaviorQuestion", behaviorQuestionSchema);
