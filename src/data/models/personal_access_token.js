import { Schema, model } from "mongoose";

const personalAccessTokenSchema = new Schema(
  {
    tokenable: String,
    name: String,
    token: {
      type: String,
      unique: true,
    },
    lastUsedAt: {
        type: Date,
        default: new Date(),
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const PersonalAccessToken = model("PersonalAccessToken", personalAccessTokenSchema, "personal_access_tokens");

export default PersonalAccessToken;
