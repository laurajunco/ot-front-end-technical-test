import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from './Row'
import { TablePagination } from '@material-ui/core';


class DataTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      targets: props.targets,
      page: 0,
      rowsPerPage:5
    };
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page:newPage
    });
  };

  renderRows() {
    const page = this.state.page;
    const rowsPerPage = this.state.rowsPerPage
    const targets = this.state.targets

    return(
      targets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(target => {
        return(<Row target={target} key={target.gene_id}/>)
      })
    )
  }

  render() {
  
    return(
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Symbol</TableCell>
            <TableCell>Gene ID</TableCell>
            <TableCell>Gene Name</TableCell>
            <TableCell>Overall Association Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {this.renderRows()}
        </TableBody>
        <TablePagination
         rowsPerPageOptions={[this.state.rowsPerPage]}
          count={this.state.targets.length}
          page={this.state.page}
          rowsPerPage={this.state.rowsPerPage}
          onChangePage={this.handleChangePage}
        />
      </Table>
    </TableContainer>
    )
  }
}

export default DataTable;
