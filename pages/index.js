import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FilterListIcon from '@material-ui/icons/FilterList';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DataFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({}));

const createData = (
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total
) => {
  return { name, date, service, features, complexity, platforms, users, total };
};

const ProjectManager = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [rows, setRows] = useState([
    createData(
      'Vuthy',
      '11/2/19',
      'Website',
      'E-Commerce',
      'N/A',
      'N/A',
      'N/A',
      '$1500'
    ),
    createData(
      'Bill Gate',
      '11/2/19',
      'Website',
      'E-Commerce',
      'N/A',
      'N/A',
      'N/A',
      '$1500'
    ),
    createData(
      'Testing User',
      '11/2/19',
      'Website',
      'E-Commerce',
      'N/A',
      'N/A',
      'N/A',
      '$1500'
    )
  ]);

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidCheck, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DataFnsUtils}>
      <Grid container direction='column'>
        <Grid item style={{ marginTop: '2em', marginLeft: '5em' }}>
          <Typography variant='h1'>Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder='Search project details or create a new entry.'
            style={{ width: '35em', marginLeft: '5em' }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position='end'
                  style={{ cursor: 'pointer' }}
                  onClick={() => setDialogOpen(true)}>
                  <AddIcon color='primary' style={{ fontSize: '30px' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        {/* Switches */}
        <Grid item style={{ marginLeft: '5em', marginTop: '2em' }}>
          <FormGroup row>
            <FormControlLabel
              style={{ marginRight: '5em' }}
              control={
                <Switch
                  checked={websiteChecked}
                  color='primary'
                  onChange={() => setWebsiteChecked(!websiteChecked)}
                />
              }
              label='Websites'
              labelPlacement='start'
            />
            <FormControlLabel
              style={{ marginRight: '5em' }}
              control={
                <Switch
                  checked={iOSChecked}
                  color='primary'
                  onChange={() => setiOSChecked(!iOSChecked)}
                />
              }
              label='ios Apps'
              labelPlacement='start'
            />{' '}
            <FormControlLabel
              style={{ marginRight: '5em' }}
              control={
                <Switch
                  checked={androidCheck}
                  color='primary'
                  onChange={() => setAndroidChecked(!androidCheck)}
                />
              }
              label='Android Apps'
              labelPlacement='start'
            />
            <FormControlLabel
              control={
                <Switch
                  checked={softwareChecked}
                  color='primary'
                  onChange={() => setSoftwareChecked(!softwareChecked)}
                />
              }
              label='Custom Software'
              labelPlacement='start'
            />
          </FormGroup>
        </Grid>
        {/* tables */}
        <Grid item container justify='flex-end' style={{ marginTop: '5em' }}>
          <Grid item style={{ marginRight: '75px' }}>
            <FilterListIcon color='secondary' style={{ fontSize: '50px' }} />
          </Grid>
        </Grid>
        <Grid item style={{ marginBottom: '15em' }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Date</TableCell>
                  <TableCell align='center'>Service</TableCell>
                  <TableCell align='center'>Features</TableCell>
                  <TableCell align='center'>Complexity</TableCell>
                  <TableCell align='center'>Platforms</TableCell>
                  <TableCell align='center'>Users</TableCell>
                  <TableCell align='center'>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align='center'>{row.name}</TableCell>
                    <TableCell align='center'>{row.date}</TableCell>
                    <TableCell align='center'>{row.service}</TableCell>
                    <TableCell align='center' style={{ maxWidth: '5em' }}>
                      {row.features}
                    </TableCell>
                    <TableCell align='center'>{row.complexity}</TableCell>
                    <TableCell align='center'>{row.platforms}</TableCell>
                    <TableCell align='center'>{row.users}</TableCell>
                    <TableCell align='center'>{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* Dialog section */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <Grid container justify='center'>
            <Grid item>
              <Typography variant='h1' gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container direction='row'>
              {/* Input fields */}
              <Grid item container direction='column'>
                <Grid item>
                  <TextField
                    label='Name'
                    id='name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Grid>
              </Grid>
              {/* Date picker */}
              <Grid item container direction='column'>
                <Grid item>
                  <KeyboardDatePicker
                    format='MM/dd/yyyy'
                    value={date}
                    onChange={newDate => setDate(newDate)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default ProjectManager;