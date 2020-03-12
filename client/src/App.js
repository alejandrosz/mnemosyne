import React, { Component } from "react";
import "./App.scss";
import "../src/components/treeStyles.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AuthService from "./components/auth/AuthService";
import axios from "axios";
import Footer from "./components/footer/Footer";
import { nestByMuseum } from "./nestData";
import Profile from "./components/profile/Profile";
import DetailPiece from "./components/detailPiece/DetailPiece";
import D3Test2 from "./components/D3Test/D3Test2";
import CollectionDetail from "./components/CollectionDetail/CollectionDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      search: "",
      searchText: "",
      filters: [],
      yearRange: [],
      dataBases: ["RMA", "MOMA", "MET"],
      resultsId: [],
      resultsDetail: [],
      tree: {},
      loaded: false
    };
    this.service = new AuthService();
    this.fetchUser();
    this.sendSearch = this.sendSearch.bind(this);
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

  setLoaded() {
    console.log("isloaded", this.state.loaded);
    this.setState({ loaded: true });
  }

  searchMongo(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      axios
        .get(`${process.env.REACT_APP_API_URL}/pieces/${e.target.value}`)
        .then(results => {
          results = results.data;
          if (results) {
            const filteredResults = results; //this.filterResults(results);
            console.log("results filteredResults", results, filteredResults);
            const tree = nestByMuseum(filteredResults, this.nodeLength);
            console.log(tree);
            this.setState({
              resultsDetail: filteredResults,
              tree: tree
            });
          }
        });
    }
  }

  sliderResult(e) {
    this.setState({ yearRange: e });
  }
  saveSearch(e) {
    this.setState({ searchText: e.target.value });
  }
  multipleSelectResult(e) {
    this.setState({ filters: e.target.value });
  }
  sendSearch() {
    axios
      // .get(`${process.env.REACT_APP_API_URL}/pieces/${}`)
      .then(results => {
        results = results.data;
        if (results) {
          const filteredResults = results; //this.filterResults(results);
          console.log("results filteredResults", results, filteredResults);
          const tree = nestByMuseum(filteredResults, this.nodeLength);
          console.log(tree);
          this.setState({
            resultsDetail: filteredResults,
            tree: tree
          });
        }
      });

    console.log(
      "send",
      this.state.yearRange,
     this.state.searchText,
      this.state.filters,
      this.state.dataBases
    );
  }

  // getData(results) {
  //   let data = results.map(result => ({
  //     name: result.name,
  //     value: result.imageUrl
  //   }));
  //   this.setState({ resultsDetail: { children: data } });
  //   console.log("state", this.state.resultsDetail);
  // }

  render() {
    console.log("app render", this.state.loaded);
    return (
      <React.Fragment>
        <div className="App">
          <D3Test2 setLoaded={this.setLoaded} data={this.state.tree}></D3Test2>
          <Navbar
            userInSession={this.state.loggedInUser}
            logout={this.logout}
            getUser={this.getUser}
          />
          <Switch>
            <Route
              path="/detail/:id"
              render={({ match }) => (
                <DetailPiece user={this.state.loggedInUser} match={match} />
              )}
            />
            <Route
              path="/collection/:id"
              render={({ match }) => (
                <CollectionDetail
                  user={this.state.loggedInUser}
                  match={match}
                />
              )}
            />
            <Route
              path="/profile"
              render={props => (
                <Profile user={this.state.loggedInUser} {...props} />
              )}
            />
          </Switch>
          <Footer
            sendResults={this.sendSearch}
            sliderResult={e => this.sliderResult(e)}
            multipleSelectResult={e => this.multipleSelectResult(e)}
            saveSearch={e => this.saveSearch(e)}
            searchMongo={e => this.searchMongo(e)}
            tags={this.state.resultsDetail ? this.state.resultsDetail : []}
          ></Footer>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
