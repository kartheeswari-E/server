import { Schema, model } from 'mongoose';

const roomTypeSchema = new Schema({
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
      default: "room_types/",
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

roomTypeSchema.pre('save', async function(next) {
    try {
      if (this.isNew && !this.id) {
        const lastItem = await RoomType.findOne({}, {}, { sort: { id: -1 } });
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

const RoomType = model('RoomType', roomTypeSchema, 'room_types');

export default RoomType;