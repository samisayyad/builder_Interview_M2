import { Schema, model, models, InferSchemaType } from "mongoose";

const socialProviderSchema = new Schema(
  {
    provider: {
      type: String,
      enum: ["google", "github", "linkedin"],
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    linkedAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { _id: false }
);

const achievementProgressSchema = new Schema(
  {
    achievement: {
      type: Schema.Types.ObjectId,
      ref: "Achievement",
      required: true,
    },
    unlockedAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { _id: false }
);

const domainProgressSchema = new Schema(
  {
    domain: {
      type: Schema.Types.ObjectId,
      ref: "InterviewDomain",
      required: true,
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    lastPracticedAt: {
      type: Date,
    },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    avatarUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ["candidate", "admin"],
      default: "candidate",
    },
    socialProviders: [socialProviderSchema],
    settings: {
      darkMode: {
        type: Boolean,
        default: true,
      },
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        push: {
          type: Boolean,
          default: false,
        },
      },
    },
    statistics: {
      totalSessions: {
        type: Number,
        default: 0,
        index: true,
      },
      averageScore: {
        type: Number,
        default: 0,
      },
      currentStreak: {
        type: Number,
        default: 0,
      },
      bestStreak: {
        type: Number,
        default: 0,
      },
      experiencePoints: {
        type: Number,
        default: 0,
      },
    },
    achievements: [achievementProgressSchema],
    domainsProgress: [domainProgressSchema],
  },
  { timestamps: true }
);

userSchema.index({ "statistics.experiencePoints": -1 });
userSchema.index({ "statistics.currentStreak": -1 });

export type UserDocument = InferSchemaType<typeof userSchema>;
export const UserModel = models.User || model("User", userSchema);
