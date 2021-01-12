import React, { Component } from 'react';
import "./App.css";
import {descending} from "d3-array";
import DataTable from './DataTable';

class App extends Component {

  state = {
    error: null,
    isLoaded: false,
    targets: []
  };

  componentDidMount() {

    fetch("https://demo6922545.mockable.io")
      .then(res => res.json())
      .then(
        (result) => {

          //CLean and organize data
          let data = result.data;
          let targets = [];

          for ( var i = 0; i < data.length; i++ ) {
            targets[i] = {}
            targets[i].symbol = data[i].target.gene_info.symbol
            targets[i].gene_id = data[i].id
            targets[i].name = data[i].target.gene_info.name
            targets[i].datatypes = data[i].association_score.datatypes
            targets[i].score = data[i].association_score.overall
          }

          targets.sort((a, b) => descending(a.score, b.score));
          console.log(targets)

          
          this.setState({
            isLoaded: true,
            targets: targets
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


  renderDataTable() {
    const { error, isLoaded, targets} = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1> Genes associated with lung carcinoma </h1>
          <DataTable targets={targets}/>
        </div>
      );
    }
  }
  

  render() {
    return (
      <div className="App"> 
        {this.renderDataTable()}
      </div>
    )
  }
}



export default App;
