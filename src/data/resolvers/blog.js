// /graphql/blogResolver.js

import Blog from "../models/blog.js";
import uploadFile from "../../utils/file_uploader.js";
import { gql } from "apollo-server-express";

export const blogTypeDef = gql`
	type Query {
		getBlog(id: Int!): Blog
		getBlogs(filters: JSON): [Blog]
		getNestedBlog(blogId: Int!, nestedBlogId: Int!): NestedBlog
		getNestedBlogs(blogId: Int!): [NestedBlog]
	}
	type Mutation {
		createBlog(input: BlogInput!): Boolean
		updateBlog(id: Int!, input: BlogInput!): Boolean
		deleteBlog(id: Int!): Boolean
		createNestedBlog(toBlogId: Int, input: NestedBlogInput!): Boolean
		updateNestedBlog(blogId: Int!, nestedBlogId: Int!, toBlogId: Int!, input: NestedBlogInput!): Boolean
		deleteNestedBlog(blogId: Int!, nestedBlogId: Int!): Boolean
	}
`;

const generateUniqueNestedBlogId = (blogs) => {
	const ids = blogs.map((blog) => blog.id);
	let newId = 1;
	while (ids.includes(newId)) {
		newId++;
	}
	return newId;
};

function generateSlug(name) {
	return name?.toLowerCase()?.replace(/\s+/g, "-");
}

const blogQueryDef = {
	getBlog: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}

		try {
			return await Blog.findOne({ id, ...defaultFilters });
		} catch (error) {
			throw new Error(error);
		}
	},
	getBlogs: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		try {
			const blog = await Blog.find({ ...filters, ...defaultFilters });
			return blog;
		} catch (error) {
			throw new Error(error);
		}
	},
	getNestedBlog: async (_, { blogId, nestedBlogId }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		try {
			const blog = await Blog.findOne({ id: blogId, ...defaultFilters });
			return blog?.blogs ? blog?.blogs.find((nestedBlog) => nestedBlog.id === nestedBlogId) : undefined;
		} catch (error) {
			throw new Error(error);
		}
	},
	getNestedBlogs: async (_, { blogId }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		try {
			const blog = await Blog.findOne({ id: blogId, ...defaultFilters });
			return blog.blogs;
		} catch (error) {
			throw new Error(error);
		}
	},
};

const blogMutationDef = {
	createBlog: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		var mergeInput = {};
		if (input["image"] != null) {
			let options = {
				uploadPath: "blogs",
				namePrefix: "blog",
				addTime: true,
			};
			try {
				const result = await uploadFile(input["image"], options);
				mergeInput["image"] = {
					src: result.name,
					uploadDriver: result.uploadDriver,
					uploadDir: result.uploadDir,
				};
			} catch (e) {}
		}

		const data = { ...input, ...mergeInput, slug: input.slug ? input.slug : generateSlug(input.title.en) };
		const Blogs = new Blog(data);
		try {
			await Blogs.save();
			return true;
		} catch (e) {
			return false;
		}
	},

	updateBlog: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const blog = await Blog.findOne({ id });

		if (!blog) {
			throw new Error("blog not found");
		}
		var mergeInput = { image: blog.image };
		if (input["image"] != null) {
			let options = {
				uploadPath: "blogs",
				namePrefix: "blog_",
				addTime: true,
			};
			try {
				const result = await uploadFile(input["image"], options);
				mergeInput["image"] = {
					src: result.name,
					uploadDriver: result.uploadDriver,
					uploadDir: result.uploadDir,
				};
			} catch (e) {
				mergeInput["image"] = blog.image;
			}
		}
		const data = { ...input, ...mergeInput };
		Object.assign(blog, data);
		try {
			await blog.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteBlog: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		try {
			const result = await Blog.findOneAndDelete({ id });
			return result !== null;
		} catch (error) {
			throw new Error(error);
		}
	},
	createNestedBlog: async (_, { toBlogId, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		try {
			const blog = await Blog.findOne({ id: toBlogId });
			if (!blog) throw new Error(`Blog with ID ${toBlogId} not found`);

			const newNestedBlog = {
				id: generateUniqueNestedBlogId(blog.blogs),
				...input,
			};
			blog.blogs.push(newNestedBlog);
			await blog.save();
			return true;
		} catch (error) {
			return false;
		}
	},
	updateNestedBlog: async (_, { blogId, nestedBlogId, toBlogId, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		try {
			const sourceBlog = await Blog.findOne({ id: blogId });
			if (!sourceBlog) throw new Error(`Source blog with ID ${blogId} not found`);

			const targetBlog = await Blog.findOne({ id: toBlogId });
			if (!targetBlog) throw new Error(`Target blog with ID ${toBlogId} not found`);

			if (blogId === toBlogId) {
				// If blogId and toBlogId are the same, update the nested blog in place
				const nestedBlogIndex = sourceBlog.blogs.findIndex((nestedBlog) => nestedBlog.id === nestedBlogId);
				if (nestedBlogIndex === -1) throw new Error(`Nested blog with ID ${nestedBlogId} not found in source blog`);

				sourceBlog.blogs[nestedBlogIndex] = {
					...sourceBlog.blogs[nestedBlogIndex],
					...input,
					id: nestedBlogId,
				};
				await sourceBlog.save();
				return true;
			} else {
				// If blogId and toBlogId are different, remove from source and add to target
				const nestedBlogIndex = sourceBlog.blogs.findIndex((nestedBlog) => nestedBlog.id === nestedBlogId);
				if (nestedBlogIndex === -1) throw new Error(`Nested blog with ID ${nestedBlogId} not found in source blog`);

				const nestedBlog = { ...sourceBlog.blogs[nestedBlogIndex], ...input };
				sourceBlog.blogs.splice(nestedBlogIndex, 1);

				const newNestedBlogId = generateUniqueNestedBlogId(targetBlog.blogs);
				const updatedNestedBlog = { ...nestedBlog, id: newNestedBlogId };

				targetBlog.blogs.push(updatedNestedBlog);

				await sourceBlog.save();
				await targetBlog.save();

				return true;
			}
		} catch (error) {
			return false;
		}
	},

	deleteNestedBlog: async (_, { blogId, nestedBlogId }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		try {
			const blog = await Blog.findOne({ id: blogId });
			blog.blogs = blog.blogs.filter((nestedBlog) => nestedBlog.id !== nestedBlogId);
			await blog.save();
			return true;
		} catch (error) {
			return false;
		}
	},
};

const blogResolver = {
	Query: blogQueryDef,
	Mutation: blogMutationDef,
};

export default blogResolver;
