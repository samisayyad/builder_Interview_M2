import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
import type { InferSchemaType } from "mongoose";

const achievementSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    points: {
      type: Number,
      default: 0,
    },
    criteria: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

achievementSchema.index({ points: -1 });

export type AchievementDocument = InferSchemaType<typeof achievementSchema>;
export const AchievementModel =
  models.Achievement || model("Achievement", achievementSchema);
