/*
CSS for pages located in App.css
The <Home> page is accessible by anyone, meaning that authentication
is not required to view the Home page.
*/
import { Card, Button } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "500px", minWidth: "600px" }}
      >
        <Card className="homePageCardBody" sm={2}>
          <Card.Img
            className="reactCardImage"
            variant="top"
            src="/public/react_sunscreen.jpg"
            alt="React JS"
          />
          <Card.Body>
            <Card.Title>ReactJS Client</Card.Title>
            <Card.Text className="cardTextBody">
              This ReactJS application uses Axios for API requests and stores
              the authentication token in local storage. When the authToken
              expires, a refresh token is used to request a new token for
              continued endpoint request. Check out the code on GitHub.
            </Card.Text>
            <a href="https://reactjs.org/" rel="noreferrer" target="_blank">
              <Button variant="outline-secondary" type="button">
                ReactJS Docs
              </Button>
            </a>
          </Card.Body>
        </Card>

        <Card className="homePageCardBody" sm={2}>
          <Card.Img
            className="reactCardImage"
            variant="top"
            src="/public/nodejs_sunscreen.png"
            alt="Node JS"
          />
          <Card.Body>
            <Card.Title>NodeJS Server</Card.Title>
            <Card.Text className="cardTextBody">
              A NodeJS and ExpressJS framework serve this client application.
              Authentication requires the email and password match the database
              hashed comparison before an authToken and refreshToken are sent
              via http only cookie. Check out the code on GitHub.
            </Card.Text>
            <a
              href="https://nodejs.org/en/docs/"
              rel="noreferrer"
              target="_blank"
            >
              <Button variant="outline-secondary" type="button">
                NodeJS Docs
              </Button>
            </a>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export default Home;
