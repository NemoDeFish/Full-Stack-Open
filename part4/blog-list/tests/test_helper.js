const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "title1",
    author: "author1",
    url: "url1",
    likes: 1
  },
  {
    title: "title2",
    author: "author2",
    url: "url2",
    likes: 2
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "title3",
    author: "author3",
    url: "url3",
    likes: 3,
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}