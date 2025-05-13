import { Schema, model } from "mongoose";

const roomSchema = new Schema(
  {
    id: {
      unique: true,
      type: Number,
    },
    userId: Number,
    name: { type: Map, of: String },
    description: { type: Map, of: String },
    code: String,
    propertyType: Number,
    starRating: Number,
    contactEmail: String,
    contactNumber: String,
    noticeDays: {
      type: Number,
      default: 0,
    },
    refundDays: {
      type: Number,
      default: 0,
    },
    refundPercentage: {
      type: Number,
      default: 100,
    },
    minimumStay: {
      type: Number,
      default: 1,
    },
    maximumStay: {
      type: Number,
      default: null,
    },
    checkinTime: {
      type: String,
      default: null,
    },
    checkoutTime: {
      type: String,
      default: null,
    },
    roomPolicy: { type: Map, of: String },
    amenities: String,
    roomRules: String,
    guestAccesses: String,
    roomAddress: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      countryCode: String,
      postalCode: String,
      latitude: Number,
      longitude: Number,
      guidance: {
        type: String,
        default: null,
      },
    },
    roomPhotos: [
      {
        id: {
          type: Number,
        },
        image: {
          src: String,
          uploadDir: String,
          uploadDriver: {
            type: Number,
            default: 0,
          },
        },
        orderId: Number,
      },
    ],
    roomRooms: [
      {
        id: {
          type: Number,
        },
        userId: Number,
        name: { type: Map, of: String },
        description: { type: Map, of: String },
        code: String,
        totalRooms: Number,
        beds: Number,
        roomType: Number,
        bedType: Number,
        roomSize: Number,
        roomSizeType: {
          type: String,
          enum: ["sq_ft", "m2"],
          default: "sq_ft",
        },
        amenities: String,
        adults: Number,
        children: Number,
        maxAdults: Number,
        maxChildren: Number,
        currencyCode: String,
        price: Number,
        extraAdultPrice: Number,
        extraChildPrice: Number,
        channelManagerConnected: String,
        googleRoomConnected: String,
        roomPhotos: [
          {
            id: {
              type: Number,
            },
            image: {
              src: String,
              uploadDir: String,
              uploadDriver: {
                type: Number,
                default: 0,
              },
            },
            orderId: Number,
          },
        ],
        status: {
          type: String,
          enum: ["pending", "listed", "unlisted", "deleted"],
          default: "pending",
        },
        resubmitReason: String,
        deletedAt: {
          type: Date,
          default: null,
        },
      },
    ],
    /*roomFaqs: [{
    id: {
      unique: true,
      type: Number,
    },
    question: { type: Map, of: String },
    answer: { type: Map, of: String },
    status: {
      type: Boolean,
      default: true
    },
  }],
  roomFees: [{
    id: {
      unique: true,
      type: Number,
    },
    name: { type: Map, of: String },
    description: { type: Map, of: String },
    type: {
      type: String,
      enum: ["fixed","percentage"],
    },
    currencyCode: String,
    value: Number,
    status: {
      type: Boolean,
      default: true
    },
  }],*/
    roomRatePlans: [
      {
        id: {
          type: Number,
        },
        roomIds: {
          type: String,
          default: null,
        },
        name: String,
        description: String,
        code: String,
        isStandard: {
          type: Boolean,
          default: false,
        },
        type: {
          type: String,
          enum: ["fixed", "percentage"],
        },
        action: {
          type: String,
          enum: ["increase", "decrease"],
        },
        currencyCode: String,
        value: Number,
        status: {
          type: Boolean,
          default: true,
        },
      },
    ],
    channelManagerConnected: {
      type: Boolean,
      default: false,
    },
    googleRoomConnected: {
      type: Boolean,
      default: false,
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: [
        "in_progress",
        "pending",
        "rejected",
        "listed",
        "unlisted",
        "deleted",
      ],
      default: "pending",
    },
    adminStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    resubmitReason: String,
    adminCommission: Number,
    rating: Number,
    totalRating: Number,
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

roomSchema.pre("save", async function (next) {
  try {
    if (this.isNew && !this.id) {
      const lastItem = await Room.findOne({}, {}, { sort: { id: -1 } });
      this.id = lastItem ? lastItem.id + 1 : 1;
      this.createdAt = new Date();
      this.updatedAt = new Date();
      next();
    } else {
      this.updatedAt = new Date();
      next();
    }
  } catch (err) {
    next(err);
  }
});

const Room = model("Room", roomSchema, "rooms");

export default Room;
