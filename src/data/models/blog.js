import { Schema, model } from "mongoose";

const blogEntrySchema = new Schema(
	{
		id: {
			type: Number,
		},
		slug: String,
		title: { type: Map, of: String },
		content: { type: Map, of: String },
		tags: String,
		isPopular: {
			type: Boolean,
			default: false,
		},
		status: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }, // Add timestamps to individual blog entries
);

const blogSchema = new Schema(
	{
		id: {
			type: Number,
		},
		slug: String,
		title: { type: Map, of: String },
		description: { type: Map, of: String },
		image: {
			src: String,
			uploadDir: {
				type: String,
				default: "blogs/",
			},
			uploadDriver: {
				type: Number,
				default: 0,
			},
		},
		blogs: [blogEntrySchema], // Use the defined blog entry schema
		isPopular: {
			type: Boolean,
			default: false,
		},
		status: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

blogSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Blog.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const Blog = model("Blog", blogSchema, "blogs");

export default Blog;
