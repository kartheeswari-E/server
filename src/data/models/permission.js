import { Schema, model } from 'mongoose';

const permissionSchema = new Schema({
  id: {
    unique: true,
    type: Number,
  },
  name: String,
  displayName: String,
  description: String,
});

permissionSchema.pre('save', async function(next) {
    try {
      if (this.isNew && !this.id) {
        const lastItem = await Permission.findOne({}, {}, { sort: { id: -1 } });
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

const Permission = model('Permission', permissionSchema, 'permissions');

export default Permission;