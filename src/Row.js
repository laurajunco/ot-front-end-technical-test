import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import BarChart from './BarChart';
import Grid from '@material-ui/core/Grid';

class Row extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      open: false
    };

    this.renderDataViz = this.renderDataViz.bind(this);
  }

  setOpen(open) {
    this.setState({
      open: open
    })
  } 

  renderDataViz() {
    const data = this.state.data
    if (this.state.open) {
      return(
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <BarChart buckets={data.association_score.datatypes}/>
          </Grid>
          <Grid item xs={6}>
            {/* <BarChart buckets={data.association_score.datatypes}/> */}
          </Grid>
        </Grid>
      )
    } else {
      return <div>No data yet</div>
    }
  
  }
  
  render() {
    const data = this.state.data
    return(
      <React.Fragment>
      <TableRow className="target">
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!this.state.open)}>
            {this.state.open ? <RemoveIcon color="primary"/> : <AddIcon color="primary"/> }
          </IconButton>
        </TableCell>
        <TableCell>{data.target.gene_info.symbol}</TableCell>
        <TableCell>{data.id}</TableCell>
        <TableCell>{data.target.gene_info.name}</TableCell>
        <TableCell>{data.association_score.overall}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {this.renderDataViz}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>

    )
  }
}

export default Row;
