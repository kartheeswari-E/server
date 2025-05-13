import { Schema, model } from 'mongoose';

const bedTypeSchema = new Schema({
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
      default: "bed_types/",
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

bedTypeSchema.pre('save', async function(next) {
    try {
      if (this.isNew && !this.id) {
        const lastItem = await BedType.findOne({}, {}, { sort: { id: -1 } });
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

const BedType = model('BedType', bedTypeSchema, 'bed_types');

export default BedType;