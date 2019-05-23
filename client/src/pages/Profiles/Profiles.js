import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Profiles extends Component {
  // Setting our component's initial state
  state = {
    profiles: [],
    name: "",
    description: "",
    picture: ""
  };

  // When the component mounts, load all Profiles and save them to this.state.Profiles
  componentDidMount() {
    this.loadProfiles();
  }

  // Loads all Profiles  and sets them to this.state.profiles
  loadProfiles = () => {
    API.getProfiles()
      .then(res =>
        this.setState({ profiles: res.data, name: "", description: "", picture: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a Profile from the database with a given id, then reloads Profiles from the db
  deleteProfile = id => {
    API.deleteProfile(id)
      .then(res => this.loadProfiles())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveProfile method to save the Profile data
  // Then reload Profiles from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.description) {
      API.saveProfile({
        name: this.state.name,
        description: this.state.description,
        picture: this.state.picture
      })
        .then(res => this.loadProfiles())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Create a Profile</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name (required)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (required)"
              />
              <Input
                value={this.state.picture}
                onChange={this.handleInputChange}
                name="picture"
                placeholder="Please insert a URL of your picture (Optional)"
              />
              <FormBtn
                disabled={!(this.state.name && this.state.description)}
                onClick={this.handleFormSubmit}
              >
                Submit a Profile
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Profiles created</h1>
            </Jumbotron>
            {this.state.profiles.length ? (
              <List>
                {this.state.profiles.map(profile => {
                  return (
                    <ListItem key={profile._id}>
                      <a href={"/profiles/" + profile._id}>
                        <strong>
                          {profile.name} 
                          <hr></hr>
                          {profile.description}
                          <hr></hr>
                      <p className="text-center">  <img src={profile.picture} alt="Profile Image"></img> </p> 
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteProfile(profile._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h4 className="text-center text-success">No Results to Display</h4>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Profiles;
