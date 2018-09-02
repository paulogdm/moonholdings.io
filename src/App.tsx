import * as React from 'react';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">Welcome to Moonholdings.io</h1>
        </header>
      </div>
    );
  }
}

export default App;
