import { Schema, model, models, InferSchemaType } from "mongoose";

const interviewDomainSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    primarySkills: {
      type: [String],
      default: [],
    },
    difficultyTags: {
      type: [String],
      default: ["beginner", "intermediate", "advanced"],
    },
    icon: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

interviewDomainSchema.index({ slug: 1 });
interviewDomainSchema.index({ isActive: 1 });

export type InterviewDomainDocument = InferSchemaType<typeof interviewDomainSchema>;
export const InterviewDomainModel =
  models.InterviewDomain || model("InterviewDomain", interviewDomainSchema);
