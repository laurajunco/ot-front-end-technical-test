import React, { Component } from 'react';
import "./App.css";

class App extends Component {

  state = {
    error: null,
    isLoaded: false,
    data: []
  };

  componentDidMount() {
    fetch("https://demo6922545.mockable.io")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.data)
          this.setState({
            isLoaded: true,
            data: result.data
          });
        },
        
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="App">
        <p>
          Open targets technical test: Laura Junco
        </p>
      </div>
    );
  }
}



export default App;
