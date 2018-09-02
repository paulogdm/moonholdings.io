import * as React from 'react';
import './welcome.scss';

// const logo = require('./logo.svg');

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="welcome">
        <h1>Moonholdings.io</h1>
        <h2>A MERN stack cryptocurrency portfolio app.</h2>
      </div>
    );
  }
}

export default App;
