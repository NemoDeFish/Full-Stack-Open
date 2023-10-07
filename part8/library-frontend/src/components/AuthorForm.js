import { useState } from "react";
import Select from "react-select";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const AuthorForm = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const options = authors.map((a) => ({ label: a.name, value: a.name }));

  const [setBirth] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    setBirth({
      variables: { name, setBornTo: Number(born) },
    });

    setName("");
    setBorn("");
  };

  const handleSelect = (e) => {
    setName(e.value);
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select defaultValue={name} onChange={handleSelect} options={options} />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorForm;
