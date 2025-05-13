import { Schema, model } from 'mongoose';

const timezoneSchema = new Schema({
  id: {
    unique: true,
    type: Number,
  },
  name: String,
  value: String,
  status: {
    type: Boolean,
    default: true,
  }
},{timestamps: true});

timezoneSchema.pre('save', async function(next) {
    try {
      if (this.isNew && !this.id) {
        const lastItem = await Timezone.findOne({}, {}, { sort: { id: -1 } });
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

const Timezone = model('Timezone', timezoneSchema, 'timezones');

export default Timezone;