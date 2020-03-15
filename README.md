## About the project

mnemosine a tool for browsing media databases. It is the last project I made at my [Ironhack](https://www.ironhack.com/) Full Stack Web Dev Bootcamp. Made during two weeks after seven weeks learning about React, front-end and back-end.

## Run the project

Project is divided in two main folders. Client and Server.

In order to start the project, you have to create a .env file at the server folder and write in it:
```
PORT=3010
```

And also another in the client folder and write in it:
```
REACT_APP_API_URL=http://localhost:3010/api
REACT_APP_URL=http://localhost:3000
```

Start the server with command:

```
npm i
npm run dev
```

And then, start client with command:

```
npm i
npm start
```

Or you can test the project through this [Heroku link](http://mn3m0s1n3.herokuapp.com/)

![Main page](/readme-img.png)


## Getting Started

Navigation is done through **React** and the interactive visualization of a large number of elements using **D3** library through zooms that allows to access the information. Once the lower level is reached, a detail view can be opened where the complete data of an item appears and you can store it in your collections or like to make the image bigger.

The information is organized hierarchically following a **treemap** data model where successives paths are branched in descending order, namely:
1 Database to which they belong
2 Year of creation
3 Geographical origin
4 Author
5 Single piece

Firstly, a random sample of results appears. Also the web has a search bar that can be used in combination with a selection of filters or a time restriction.

The databases of the Museum of Modern Art in New York, the Metropolitan and the Rijksmuseum in Amsterdam are currently reacheable. The three of them has in total around 1.200.000 objects that have been filtered, eliminating duplicates or items with insufficient information, so that in the application **mongoDB** database there are 230,000 registers under a single model.


## Build with
* D3 - https://github.com/d3/d3
* React - https://github.com/facebook/react
* Material-ui - https://github.com/mui-org/material-ui
* Sass - https://github.com/sass/node-sass
* Axios - https://github.com/axios/axios
* Express - https://github.com/expressjs/express
* Node.js - https://github.com/nodejs/node

## Rights and licenses

Thanks to the policy of open data of the following museums:

[Museum of Modern Art of New York](https://www.moma.org/)
[Rijksmuseum of Amsterdam](https://www.rijksmuseum.nl/en)
[Metropolitam Museum of New York](https://www.metmuseum.org/)

The aim of the project is make possible connect more and more media databases.

-All the Rijksmuseum data is property of the Rijksmuseum of Amsterdam and has been reachec through their [Data service](https://data.rijksmuseum.nl/?_ga=2.220489181.454717879.1584299510-153362453.1583519026)

-All the MET museum data is property of the Metropolitan Museum that has been reached through their [API](https://www.metmuseum.org/blogs/now-at-the-met/2018/met-collection-api) and [Open access Database](https://github.com/metmuseum/openaccess)

-All the MoMA data is property of Museum of Modern Art of New York and is updated monthly at [zenodo](https://zenodo.org/record/3692811#.Xm59NpNKiRs)
Thanks to john-halderman for post the MoMA collection in github [MuseumofModernArt collection](https://github.com/MuseumofModernArt/collection)
