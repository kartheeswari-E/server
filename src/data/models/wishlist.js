import { Schema, model } from "mongoose";

const WishlistSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    userId: Number,
    name: String,
    privacy: Boolean,
    list: [Number],
  },
  { timestamps: true }
);

WishlistSchema.pre("save", async function (next) {
  try {
    if (this.isNew && !this.id) {
      const lastItem = await Wishlist.findOne({}, {}, { sort: { id: -1 } });
      this.id = lastItem ? lastItem.id + 1 : 1;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Wishlist = model("Wishlist", WishlistSchema, "wishlists");

export default Wishlist;
