import { Schema, model } from 'mongoose';

const propertyTypeSchema = new Schema({
  id: {
    unique: true,
    type: Number,
  },
  name: { type: Map, of: String },
  description: { type: Map, of: String },
  image: {
    src: String,
    uploadDir: {
      type: String,
      default: "property_types/",
    },
    uploadDriver: {
      type: Number,
      default: 0
    },
  },
  status: {
    type: Boolean,
    default: true,
  }
},{timestamps: true});

propertyTypeSchema.pre('save', async function(next) {
    try {
      if (this.isNew && !this.id) {
        const lastItem = await PropertyType.findOne({}, {}, { sort: { id: -1 } });
        this.id = lastItem ? lastItem.id + 1 : 1;
        next();
      }
      else {
        next();
      }
    }
    catch (err) {
      next(err);
    }
});

const PropertyType = model('PropertyType', propertyTypeSchema, 'property_types');

export default PropertyType;