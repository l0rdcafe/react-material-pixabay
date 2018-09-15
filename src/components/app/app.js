import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Navbar from "../navbar/navbar";
import Search from "../search/search";

const App = () => (
  <MuiThemeProvider>
    <Navbar />
    <Search />
  </MuiThemeProvider>
);

export default App;
