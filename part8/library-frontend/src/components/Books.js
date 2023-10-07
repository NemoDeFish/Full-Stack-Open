import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [filter, setFilter] = useState("all genres");
  const result = useQuery(ALL_BOOKS);
  const filterResult = useQuery(ALL_BOOKS, {
    variables: { genre: filter === "all genres" ? "" : filter },
    fetchPolicy: "no-cache",
  });

  if (!props.show) {
    return null;
  }

  if (filterResult.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const filterBooks = filterResult.data.allBooks;

  const genres = [
    ...new Set(books.reduce((array, book) => array.concat(...book.genres), [])),
    "all genres",
  ];

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <strong>{filter}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
