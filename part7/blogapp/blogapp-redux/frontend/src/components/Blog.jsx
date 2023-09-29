import PropTypes from "prop-types";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog, increaseLikes, deleteBlog, user, commentBlog }) => {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  if (!blog) {
    return null;
  }

  let removeVisible = false;

  if (user.name === blog.user.name) {
    removeVisible = true;
  }

  const userWhenVisible = { display: removeVisible ? "" : "none" };

  const addLikes = () => {
    increaseLikes({ ...blog, user: blog.user.id, likes: blog.likes + 1 });
  };

  const removeBlog = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog);
      navigate("/");
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    commentBlog({ ...blog, comment });
    setComment("");
  };

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <a href={blog.url}>{blog.url}</a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {blog.likes} likes{" "}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addLikes}
                  size="small"
                >
                  like
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>added by {blog.user.name}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div style={userWhenVisible}>
        <Button variant="contained" color="primary" onClick={removeBlog}>
          remove
        </Button>
      </div>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <TextField
          id="comment"
          type="text"
          value={comment}
          name="comment"
          onChange={(event) => setComment(event.target.value)}
          placeholder="write comment here"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ height: "55px", marginLeft: "5px" }}
        >
          add comment
        </Button>
      </form>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        aria-label="contacts"
      >
        {blog.comments.map((value) => (
          <ListItem disablePadding key={value}>
            <ListItemIcon>
              <CommentIcon />
            </ListItemIcon>
            <ListItemText primary={value} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
  increaseLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object,
  commentBlog: PropTypes.func.isRequired,
};

export default Blog;
