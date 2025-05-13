import { Schema, model } from "mongoose";
import Joi from "joi";

const sliderSchema = new Schema(
  {
    id: {
      unique: true,
      type: Number,
    },
    title: { type: Map, of: String },
    description: { type: Map, of: String },
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

sliderSchema.pre("save", async function (next) {
  try {
    if (this.isNew && !this.id) {
      const lastItem = await Slider.findOne({}, {}, { sort: { id: -1 } });
      this.id = lastItem ? lastItem.id + 1 : 1;
      next();
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

const Slider = model("Slider", sliderSchema, "sliders");

export default Slider;
