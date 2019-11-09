import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import './App.css';
import Card from './components/Card.js';


class App extends React.Component {
   render() {
      return (
         <div className="App">
            <header className="App-header">
               <h4>Панель управления</h4>
            </header>
            <Card />
         </div>
      );
   }
}

export default App;
