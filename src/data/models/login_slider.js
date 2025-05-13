import { Schema, model } from "mongoose";
import Joi from "joi";

const loginSliderSchema = new Schema(
  {
    id: {
      unique: true,
      type: Number,
    },
    type: {
      type: String,
      enum: ["admin", "host"],
    },
    orderId: Number,
    image: {
      src: String,
      uploadDir: {
        type: String,
        default: "sliders/",
      },
      uploadDriver: {
        type: Number,
        default: 0,
      },
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

loginSliderSchema.pre("save", async function (next) {
  try {
    if (this.isNew && !this.id) {
      const lastItem = await LoginSlider.findOne({}, {}, { sort: { id: -1 } });
      this.id = lastItem ? lastItem.id + 1 : 1;
      next();
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

export const loginSliderValidation = Joi.object().keys({
  image: Joi.object().required(),
  input: Joi.object()
    .keys({
      orderId: Joi.number().integer().required(),
      status: Joi.boolean().required(),
      type: Joi.string().valid("admin", "host").required(),
      uploadDriver: Joi.number().required(),
    })
    .required(),
});

const LoginSlider = model("LoginSlider", loginSliderSchema, "login_sliders");

export default LoginSlider;
