import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AuthContext from "../components/shared/AuthContext";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const { user } = useContext(AuthContext);
  const token = user.accessToken;

  useEffect(() => {
    axios
      .get("http://localhost:5500/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
          email: `${user.email}`,
          withCredentials: true,
        },
      })
      .then((response) => {
        setCharacters(response.data);
      });
  }, []);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "500px", minWidth: "600px" }}
      >
        <Table className="characterTable" responsive>
          <thead className="tableHeader">
            <tr className="tableRow">
              <th></th>
              <th>Character</th>
              <th>Title</th>
              <th>Birthplace</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {characters.map((character) => (
              <tr className="tableRow">
                <td>
                  <img
                    className="tableImage"
                    src={character.img}
                    width="160px"
                    height="80px"
                    alt="Darth Vader"
                  ></img>
                </td>
                <td>
                  {character.firstname} {character.lastname}
                </td>
                <td>{character.rank}</td>
                <td>{character.home_world}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Characters;
