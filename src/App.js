import React, { Component } from 'react';
import "./App.css";
import DataTable from './components/DataTable';
import Typography from '@material-ui/core/Typography';

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
          this.setState({
            isLoaded: true,
            data: result.data
          });
        },(error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  renderDataTable() {
    const { error, isLoaded, data} = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Typography variant="h4" color="primary" gutterBottom>
            Genes associated with lung carcinoma
          </Typography> 
          <DataTable data={data}/>
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
