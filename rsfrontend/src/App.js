import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RotaPrivada from './componentes/RotaPrivada';
import Postagens from './componentes/Postagens';
import NovaPostagem from './componentes/NovaPostagem';
import Login from './componentes/Login';
import NaoEncontrada from './componentes/NaoEncontrada';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}><Postagens/></Route>
        <Route path="/postagens" exact={true}><Postagens/></Route>
        <RotaPrivada path="/postagens/nova" component={NovaPostagem}/>
        <Route path="/login"><Login/></Route>
        <Route path="*"><NaoEncontrada/></Route>
        </Switch>
    </Router>
  );
}

export default App;
