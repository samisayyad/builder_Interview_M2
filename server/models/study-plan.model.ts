import { Schema, model, models, InferSchemaType } from "mongoose";

const studyPlanItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    domain: {
      type: Schema.Types.ObjectId,
      ref: "InterviewDomain",
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
  },
  { _id: false }
);

const studyPlanSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    summary: {
      type: String,
    },
    focusAreas: {
      type: [String],
      default: [],
    },
    items: {
      type: [studyPlanItemSchema],
      default: [],
    },
    generatedBy: {
      type: String,
      enum: ["ai", "coach", "custom"],
      default: "ai",
    },
    updatedAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { timestamps: true }
);

studyPlanSchema.index({ user: 1, updatedAt: -1 });

export type StudyPlanDocument = InferSchemaType<typeof studyPlanSchema>;
export const StudyPlanModel = models.StudyPlan || model("StudyPlan", studyPlanSchema);
