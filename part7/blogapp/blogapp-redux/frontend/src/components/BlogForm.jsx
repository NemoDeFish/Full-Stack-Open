import { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const cleanForm = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });

    cleanForm();
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title:"
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="write blog title here"
          />
        </div>
        <div>
          <TextField
            label="author:"
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="write blog author here"
          />
        </div>
        <div>
          <TextField
            label="url:"
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
            placeholder="write blog url here"
          />
        </div>
        <Button
          id="submit-button"
          variant="contained"
          color="primary"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
