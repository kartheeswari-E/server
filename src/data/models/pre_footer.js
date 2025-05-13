import { Schema, model } from "mongoose";

const preFooterSchema = new Schema(
  {
    id: {
      unique: true,
      type: Number,
    },
    title: { type: Map, of: String },
    description: { type: Map, of: String },
    image: {
      src: String,
      uploadDir: {
        type: String,
        default: "pre_footers/",
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

preFooterSchema.pre("save", async function (next) {
  try {
    if (this.isNew && !this.id) {
      const lastItem = await PreFooter.findOne({}, {}, { sort: { id: -1 } });
      this.id = lastItem ? lastItem.id + 1 : 1;
      next();
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

const PreFooter = model("PreFooter", preFooterSchema, "pre_footers");

export default PreFooter;
