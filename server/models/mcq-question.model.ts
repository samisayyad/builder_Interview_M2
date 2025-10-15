import { Schema, model, models, InferSchemaType } from "mongoose";

const mcqQuestionSchema = new Schema(
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
    options: {
      type: [
        {
          label: { type: String, required: true },
          value: { type: String, required: true },
          explanation: { type: String },
        },
      ],
      validate: (value: unknown[]) => Array.isArray(value) && value.length >= 2,
    },
    correctOption: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

mcqQuestionSchema.index({ domain: 1, difficulty: 1 });
mcqQuestionSchema.index({ tags: 1 });

export type McqQuestionDocument = InferSchemaType<typeof mcqQuestionSchema>;
export const McqQuestionModel = models.McqQuestion || model("McqQuestion", mcqQuestionSchema);
