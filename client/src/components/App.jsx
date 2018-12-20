// This component is the highest-level app that is responsible for assembling
// each individual component. This is what is ultimately rendered onto the HTML page.
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <h1>Hello World</h1>;
  }
}

export default App;