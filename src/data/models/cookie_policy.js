import { Schema, model } from 'mongoose';

const cookiePolicySchema = new Schema({
  id: {
    unique: true,
    type: Number,
  },
  title: { type: Map, of: String },
  content: { type: Map, of: String },
  status: {
    type: Boolean,
    default: true,
  }
},{timestamps: true});

cookiePolicySchema.pre('save', async function(next) {
    try {
      if (this.isNew && !this.id) {
        const lastItem = await CookiePolicy.findOne({}, {}, { sort: { id: -1 } });
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

const CookiePolicy = model('CookiePolicy', cookiePolicySchema, 'cookie_policies');

export default CookiePolicy;