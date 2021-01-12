import React, { Component } from 'react';

class DataTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      targets: props.targets
    };
  }

  componentDidMount() {
    console.log(this.state.targets)
  }

  render() {
    return(
        <ul>
          {this.state.targets.map(target => (
            <li key={target.gene_id}>
              {target.symbol} – {target.gene_id}
            </li>
          ))}
        </ul>
    )
  }
}

export default DataTable;