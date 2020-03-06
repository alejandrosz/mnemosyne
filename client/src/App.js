import React, { Component } from "react";
import "./App.scss";
import "../src/components/treeStyles.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AuthService from "./components/auth/AuthService";
import Contents from "./components/contents/Contents";
import axios from "axios";
import Footer from "./components/footer/Footer";
// import * as d3 from "d3";
// import "../treeStyles.css"
import SimpleTreemapExample from "./components/simpleTreemap";
import Profile from "./components/profile/Profile";
import Detail from "./Detail/Detail";
import D3Test2 from "./components/D3Test/D3Test2";

// d3.select(this.refs.myDiv).style(“background-color”, “blue”)
// render(<div ref=”myDiv”></div>)

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

  // searchBar(e) {
  //   if (e.key === "Enter") {
  //     axios
  //       .get(
  //         `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${e.target.value}`
  //       )
  //       .then(results => {
  //         results = results.data.objectIDs;
  //         if (results) {
  //           this.setState({ resultsId: results }, () => {
  //             this.getResultsDetail(0);
  //           });
  //         }
  //       });
  //   }
  // }

  searchMongo(e) {
    if (e.key === "Enter") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/pieces/${e.target.value}`)
        .then(results => {
          results = results.data;
          if (results) {
            this.getData(results);
          }
        });
    }
  }

  getData(results) {
    let data = results.map(result => ({
      name: result.name,
      value: result.imageUrl
    }));
    this.setState({ resultsDetail: { children: data } });
    console.log("state", this.state.resultsDetail);
  }

  // getResultsDetail(idx) {
  //   if (idx < 10) {
  //     const id = this.state.resultsId[idx];
  //     axios
  //       .get(
  //         `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
  //       )
  //       .then(result => {
  //         result = result.data;

  //         this.setState(
  //           prevState => {
  //             const newResultsDetail = [...prevState.resultsDetail];

  //             if (newResultsDetail.length <= 20) {
  //               newResultsDetail.push(result);
  //               return {
  //                 resultsDetail: newResultsDetail
  //               };
  //             } else if (newResultsDetail.length > 20) {
  //               newResultsDetail.shift();
  //               newResultsDetail.push(result);
  //               return {
  //                 resultsDetail: newResultsDetail
  //               };
  //             }
  //           },
  //           () => {
  //             this.getResultsDetail(idx + 1);
  //           }
  //         );
  //       });
  //   }
  // }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <D3Test2 data={this.state.resultsDetail}></D3Test2>

          <Navbar
            // searchBar={e => this.searchBar(e)}
            userInSession={this.state.loggedInUser}
            logout={this.logout}
            getUser={this.getUser}
          />
          <Switch>
            <Route
              exact
              path="/"
              // render={() => (
              //   // <Contents
              //   // totalItems={this.state.resultsDetail.length}
              //   // query={this.state.resultsDetail}
              //   // />
              //   )}
            />
            <Route
              path="/profile"
              render={() => (
                <Profile
                  className="profilecomponent"
                  user={this.state.loggedInUser}
                />
              )}
            />
            <Route
              path="/detail"
              render={() => (
                <Detail
                  className="profilecomponent"
                  user={this.state.loggedInUser}
                />
              )}
            />
          </Switch>
          <Footer
            searchMongo={e => this.searchMongo(e)}
            tags={this.state.resultsDetail ? this.state.resultsDetail : []}
          ></Footer>
        </div>
        {/* <SimpleTreemapExample></SimpleTreemapExample> */}
      </React.Fragment>
    );
  }
}

export default App;
