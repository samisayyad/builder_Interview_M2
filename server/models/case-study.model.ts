import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
import type { InferSchemaType } from "mongoose";

const caseStudySchema = new Schema(
  {
    domain: {
      type: Schema.Types.ObjectId,
      ref: "InterviewDomain",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    scenario: {
      type: String,
      required: true,
    },
    tasks: {
      type: [String],
      default: [],
    },
    hints: {
      type: [String],
      default: [],
    },
    estimatedDurationMinutes: {
      type: Number,
      default: 45,
    },
  },
  { timestamps: true },
);

caseStudySchema.index({ domain: 1 });

export type CaseStudyDocument = InferSchemaType<typeof caseStudySchema>;
export const CaseStudyModel =
  models.CaseStudy || model("CaseStudy", caseStudySchema);
