import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AuthService from "./components/auth/AuthService";
import Contents from "./components/contents/Contents";
import axios from "axios";
import Footer from "./components/footer/Footer";

// import "../treeStyles.css"
import "../src/components/treeStyles.css";
import SimpleTreemapExample from "./components/simpleTreemap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      search: "",
      resultsId: [],
      resultsDetail: []
    };
    this.service = new AuthService();
    this.fetchUser();
  }

  getUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };
  logout = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
    });
  };
  fetchUser() {
    return this.service
      .loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response
        });
      })
      .catch(err => {
        this.setState({
          loggedInUser: false
        });
      });
  }

  searchBar(e) {
    if (e.key === "Enter") {
      axios
        .get(
          `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${e.target.value}`
        )
        .then(results => {
          results = results.data.objectIDs;
          // console.log(results);
          if (results) {
            this.setState({ resultsId: results }, () => {
              // console.log(this.state.resultsId);
              this.getResultsDetail(0);
            });
          }
        });
    }
  }

  getResultsDetail(idx) {
    if (idx < 5) {
      const id = this.state.resultsId[idx];
      axios
        .get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        )
        .then(result => {
          result = result.data;
          console.log("results", this.state.resultsDetail);

          this.setState(
            prevState => {
              const newResultsDetail = [...prevState.resultsDetail];
              newResultsDetail.push(result);
              return {
                resultsDetail: newResultsDetail
              };
            },
            () => {
              this.getResultsDetail(idx + 1);
            }
          );
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <Navbar
            searchBar={e => this.searchBar(e)}
            userInSession={this.state.loggedInUser}
            logout={this.logout}
            getUser={this.getUser}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Contents query={this.state.resultsDetail} />}
            />
          </Switch>
          <Footer></Footer>
        </div>
        {/* <SimpleTreemapExample></SimpleTreemapExample> */}
      </React.Fragment>
    );
  }
}

export default App;
