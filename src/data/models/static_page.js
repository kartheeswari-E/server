import Joi from "joi";
import { Schema, model } from "mongoose";

const staticPageSchema = new Schema(
  {
    id: {
      unique: true,
      type: Number,
    },
    slug: String,
    name: { type: Map, of: String },
    content: { type: Map, of: String },
    inFooter: {
      type: Boolean,
      default: true,
    },
    underSection: Number,
    mustAgree: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

staticPageSchema.pre("save", async function (next) {
  try {
    if (this.isNew && !this.id) {
      const lastItem = await StaticPage.findOne({}, {}, { sort: { id: -1 } });
      this.id = lastItem ? lastItem.id + 1 : 1;
      next();
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

export const staticPageValidation = Joi.object({
  id: Joi.number().optional().messages({
    "any.required": "id - The id field is required.",
  }),
  name: Joi.object()
    .pattern(Joi.string(), Joi.string())
    .min(1)
    .required()
    .messages({
      "any.required": "Name - The Name field is required.",
      "object.min":
        "Name - The Name field must have at least one key-value pair.",
    }),
  content: Joi.object().pattern(Joi.string(), Joi.string()).min(1).messages({
    "any.required": "Content - The Content field is required.",
    "object.min":
      "Content - The Content field must have at least one key-value pair.",
  }),
  mustAgree: Joi.boolean().required().messages({
    "any.required": "Must Agree - The Must Agree field is required.",
  }),
  inFooter: Joi.boolean().required().messages({
    "any.required": "In Footer - The In Footer field is required.",
  }),
  status: Joi.boolean().required().messages({
    "any.required": "Status - The Status field is required.",
  }),
  underSection: Joi.number().optional().messages({
    "any.required": "Under Section - The Under Section field is required ",
  }),
  slug: Joi.string().optional(),
});

const StaticPage = model("StaticPage", staticPageSchema, "static_pages");

export default StaticPage;
