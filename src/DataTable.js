import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from './Row'
import TableFooter from '@material-ui/core/TableFooter';
import { TablePagination } from '@material-ui/core';
import {descending} from "d3-array";


class DataTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      page: 0,
      rowsPerPage: 5
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
    const data = this.state.data
    data.sort((a, b) => descending(a.association_score.overall, b.association_score.overall));

    return(
      data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(d => {
        return(<Row data={d} key={d.id}/>)
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

          <TableFooter>
            <TableRow>
              <TablePagination
                  rowsPerPageOptions={[this.state.rowsPerPage]}
                  count={this.state.data.length}
                  page={this.state.page}
                  rowsPerPage={this.state.rowsPerPage}
                  onChangePage={this.handleChangePage}
              />
            </TableRow>
          </TableFooter>

        </Table>
    </TableContainer>
    )
  }
}

export default DataTable;
