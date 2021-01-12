import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';




class Row extends Component {

  constructor(props) {
    super(props);
    this.state = {
      target: props.target,
      open: false
    };
  }

  setOpen(open) {
    this.setState({
      open: open
    })
  } 
  
  render() {
    const target = this.state.target
    return(
      <React.Fragment>
      <TableRow className="target">
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!this.state.open)}>
            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{target.symbol}</TableCell>
        <TableCell>{target.gene_id}</TableCell>
        <TableCell>{target.name}</TableCell>
        <TableCell>{target.score}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Vis
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>

    )
  }
}

export default Row;
