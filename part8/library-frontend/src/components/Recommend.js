import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = (props) => {
  const [favorite, setFavorite] = useState("");
  const meResult = useQuery(ME);
  const [filterQuery, bookResult] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (meResult.data) {
      setFavorite(meResult.data.me.favoriteGenre);
      filterQuery({ variables: { genre: meResult.data.me.favoriteGenre } });
    }
  }, [bookResult.data, meResult.data]);

  if (!props.show) {
    return null;
  }

  if (meResult.loading) {
    return <div>loading...</div>;
  }

  const books = bookResult.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <strong>{favorite}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
