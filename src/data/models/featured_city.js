import { Schema, model } from "mongoose";

const featuredCitySchema = new Schema(
  {
    id: {
      unique: true,
      type: Number,
    },
    cityName: String,
    displayName: { type: Map, of: String },
    latitude: Number,
    longitude: Number,
    placeId: String,
    orderId: Number,
    image: {
      src: String,
      uploadDir: {
        type: String,
        default: "featured_cities/",
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

featuredCitySchema.pre("save", async function (next) {
  try {
    if (this.isNew && !this.id) {
      const lastItem = await FeaturedCity.findOne({}, {}, { sort: { id: -1 } });
      this.id = lastItem ? lastItem.id + 1 : 1;
      next();
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

const FeaturedCity = model(
  "FeaturedCity",
  featuredCitySchema,
  "featured_cities"
);

export default FeaturedCity;
