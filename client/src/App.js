import React, { Component } from "react";
import "./App.scss";
import "../src/components/treeStyles.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AuthService from "./components/auth/AuthService";
import axios from "axios";
import Footer from "./components/footer/Footer";
// import * as d3 from "d3";
// import "../treeStyles.css"
import Profile from "./components/profile/Profile";
import DetailPiece from "./components/detailPiece/DetailPiece";
import D3Test2 from "./components/D3Test/D3Test2";
import CollectionDetail from "./components/CollectionDetail/CollectionDetail";

// d3.select(this.refs.myDiv).style(“background-color”, “blue”)
// render(<div ref=”myDiv”></div>)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      search: "",
      resultsId: [],
      resultsDetail: [],
      tree: {}
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
            const filteredResults = results; //this.filterResults(results);
            console.log("results filteredResults", results, filteredResults);
            const tree = this.nestByMuseum(filteredResults);
            this.setState({ resultsDetail: filteredResults, tree: tree });
          }
        });
    }
  }
  // /////////////////////////////
  filterResults(results) {
    const limit = 100;
    let filterResults = this.sortByRating(results).filter(p => !!p.imageUrl);
    if (results.length > limit) {
      filterResults = results.slice(0, limit + 1);
    }
    return filterResults;
  }
  sortByRating(pieces) {
    const ratedPieces = pieces.sort((a, b) => b.rating - a.rating);
    return ratedPieces;
  }
  nestByMuseum(pieces) {
    const tree = { name: "search", value: "", children: [] };
    const museums = ["MET", "MOMA", "RMA"];
    museums.forEach(m => {
      const museumPieces = pieces.filter(p => p.museum === m);
      const bestImg = museumPieces[0] && museumPieces[0].imageUrl;
      const nestedMuseum = museumPieces.length
        ? this.nestByDate(museumPieces)
        : [];
      // console.log('nestByMuseum', nestedMuseum);
      const childMuseum = {
        name: m,
        value: bestImg,
        children: nestedMuseum,
        size: museumPieces.length
      };
      tree.children.push(childMuseum);
      // this.setState({ tree });
    });
    console.log("tree", tree);
    return tree;
  }

  nestByDate(museumPieces) {
    const mainDates = this.getDatesFromPieces(museumPieces);
    // console.log('mainDates', mainDates);
    const nestedMuseum = [];
    mainDates.forEach((d, i) => {
      const datePieces = museumPieces.filter(p => {
        if (d === "noDate") {
          return !Number.isInteger(p.year);
        }
        return (
          p.year >= d && (mainDates[i + 1] ? p.year < mainDates[i + 1] : true)
        );
      });
      const bestImg = datePieces[0] && datePieces[0].imageUrl;
      const nestedDates = datePieces.length
        ? this.nestByOrigin(datePieces)
        : [];
      // console.log('nestedDates', nestedDates);
      const childDate = {
        name: d,
        value: bestImg,
        children: nestedDates || [],
        size: datePieces.length
      };
      nestedMuseum.push(childDate);
    });
    return nestedMuseum;
  }
  getDatesFromPieces(museumPieces) {
    const allYears = museumPieces.map(p => p.year);
    const piecesWithDate = allYears
      .filter(y => Number.isInteger(y))
      .sort((a, b) => a - b);
    const piecesWithNoDate = allYears.filter(y => !Number.isInteger(y));
    // console.log('piecesWithDate', piecesWithDate, piecesWithNoDate);
    const number = 4;
    const years = [];
    if (piecesWithDate.length >= number) {
      const step = Math.floor(piecesWithDate.length / (number - 1));
      for (let i = 0; i < piecesWithDate.length; i += step) {
        if (piecesWithDate[i]) {
          years.push(piecesWithDate[i]);
        }
      }
      years.push(piecesWithDate[piecesWithDate.length - 1]);
    }
    if (piecesWithNoDate.length) {
      years.push("noDate");
    }
    console.log("years", years);
    return years;
  }
  nestByOrigin(datePieces) {
    const origins = ["noOrigin"];
    const nestedDates = [];
    datePieces.forEach(p => {
      if (p.origin.length) {
        p.origin.forEach(newOrigin => {
          if (!origins.includes(newOrigin)) {
            origins.push(newOrigin);
          }
        });
        origins.sort();
      }
    });
    // console.log('--- origins', origins);
    console.log("nestByOrigin All", datePieces.length);
    origins.forEach((o, i) => {
      const prevOrigins = i > 0 ? origins.slice(0, i) : [];
      const originPieces = datePieces.filter(p => {
        if (p.origin.length <= 0 && o === "noOrigin") {
          return true;
        }
        return p.origin.includes(
          o
        ) /* &&
          !p.origin.reduce((ac, or) => ac || prevOrigins.includes[or]) */;
      });
      /* console.log('-- currOrigin', o, 'prevOrigins', prevOrigins, 'filtered', [
        ...originPieces.map(p => p.origin)
      ]); */
      const bestImg = originPieces[0] && originPieces[0].imageUrl;
      const nestedOrigins = originPieces.length
        ? this.nestByAuthor(originPieces)
        : [];
      console.log("nestByOrigin", nestedOrigins.length, o);
      const childDate = {
        name: o,
        value: bestImg,
        children: nestedOrigins || [],
        size: originPieces.length
      };
      if (nestedOrigins.length > 0) {
        nestedDates.push(childDate);
      }
    });
    return nestedDates;
  }
  nestByAuthor(originPieces) {
    const authors = [];
    const nestedDates = [];
    originPieces.forEach(p => {
      if (p.author && !authors.includes(p.author)) {
        authors.push(p.author);
      }
    });
    authors.forEach((a, i) => {
      const authorPieces = originPieces
        .filter(p => p.author)
        .map(p => {
          p.value = p.imageUrl;
          p.size = p.rating * 0.1;
          // p.size = 1;
          return p;
        });
      // console.log('nestByAuthor', authorPieces);
      const bestImg = authorPieces[0] && authorPieces[0].imageUrl;
      const childDate = {
        name: a,
        value: bestImg,
        children: authorPieces || [],
        size: authorPieces.length
      };
      if (authorPieces.length > 0) {
        nestedDates.push(childDate);
      }
    });
    return nestedDates;
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
    return (
      <React.Fragment>
        <div className="App">
          <D3Test2 data={this.state.tree}></D3Test2>

          <Navbar
            // searchBar={e => this.searchBar(e)}
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
            {/* <Route  path="/" /> */}
            <Route
              // path="/profile/:id"
              path="/profile"
              render={props => (
                <Profile user={this.state.loggedInUser} {...props} />
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
