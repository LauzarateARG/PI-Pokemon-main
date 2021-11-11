import "./App.css";
import { BrowserRouter, Route} from "react-router-dom";
import landingPage from "./components/LandingPage/index.js"
import Home from "./components/Home";
import PokemonCreate from "./components/PokemonCreate"
import NavBar from "./components/NavBar";
import Detail from "./components/Detail"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Route exact path = "/" component={landingPage} />
          <Route path = "/home" component={NavBar}/>
          <Route exact path = "/home" component={Home} />
          <Route exact path = "/home/Pokemon" component={PokemonCreate}/>
          <Route exact path = "/home/:id" component={Detail} />
      </div>
    </BrowserRouter>
  );
}

export default App;
