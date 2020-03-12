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
import InitialCard from "./InitialCard/InitialCard";
var Loader = require("react-loader");

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
      isLoaded: true,
      introOpen: true
    };
    this.service = new AuthService();
    this.fetchUser();
    this.sendSearch = this.sendSearch.bind(this);
    this.closeInitialCard = this.closeInitialCard.bind(this)

  }
  componentDidMount() {
    this.randomSearch();
  }

  randomSearch() {
    axios.get(`${process.env.REACT_APP_API_URL}/piecesrandom`).then(results => {
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
      this.setState({ isLoaded: false });
      setTimeout(
        function() {
          this.setState({ isLoaded: true });
        }.bind(this),
        4000
      );
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
    // axios
    //   // .get(`${process.env.REACT_APP_API_URL}/pieces/${}`)
    //   .then(results => {
    //     results = results.data;
    //     if (results) {
    //       const filteredResults = results; //this.filterResults(results);
    //       console.log("results filteredResults", results, filteredResults);
    //       const tree = nestByMuseum(filteredResults, this.nodeLength);
    //       console.log(tree);
    //       this.setState({
    //         resultsDetail: filteredResults,
    //         tree: tree
    //       });
    //     }
    //   });

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

  closeInitialCard() {
    console.log("close");
    this.setState({ introOpen: false });
  }

  render() {
    var opts = {
      lines: 13, // The number of lines to draw
      length: 62, // The length of each line
      width: 19, // The line thickness
      radius: 39, // The radius of the inner circle
      scale: 0.2, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      color: "#ffffff", // CSS color or array of colors
      fadeColor: "transparent", // CSS color or array of colors
      speed: 0.8, // Rounds per second
      rotate: 0, // The rotation offset
      animation: "spinner-line-fade-default", // The CSS animation name for the lines
      direction: 1, // 1: clockwise, -1: counterclockwise
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      className: "spinner", // The CSS class to assign to the spinner
      top: "48%", // Top position relative to parent
      left: "50%", // Left position relative to parent
      shadow: "0 0 5px black", // Box-shadow for the lines
      position: "absolute" // Element positioning
    };

    console.log("app render", this.state.loaded);
    return (
      <React.Fragment>
        <div className="App">
          
          {this.state.introOpen && <InitialCard closeInitialCard={this.closeInitialCard}></InitialCard>}
          <Loader loaded={this.state.isLoaded} options={opts}></Loader>
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
