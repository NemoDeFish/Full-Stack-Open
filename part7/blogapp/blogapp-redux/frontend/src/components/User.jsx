import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const User = ({ individualUser }) => {
  if (!individualUser) {
    return null;
  }

  return (
    <div>
      <h2>{individualUser.name}</h2>
      <h3>Added Blogs</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {individualUser.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <li>{blog.title}</li>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;
