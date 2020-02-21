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
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DataFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';

import EnhancedTable from '../src/ui/EnhancedTable';

const useStyles = makeStyles(theme => ({
  service: {
    fontWeight: 300
  },
  users: {
    marginRight: 0
  },
  button: {
    color: '#fff',
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    }
  }
}));

const createData = (
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search
) => {
  return {
    name,
    date,
    service,
    features,
    complexity,
    platforms,
    users,
    total,
    search
  };
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
      '$1500',
      true
    ),
    createData(
      'Bill Gate',
      '11/2/19',
      'Website',
      'E-Commerce',
      'N/A',
      'N/A',
      'N/A',
      '$1500',
      true
    ),
    createData(
      'Testing User',
      '11/2/19',
      'Website',
      'E-Commerce',
      'N/A',
      'N/A',
      'N/A',
      '$1500',
      true
    )
  ]);

  const platformOptions = ['Web', 'iOS', 'Android'];
  const featureOptions = [
    'Photo/Video',
    'GPS',
    'File Transfer',
    'Users/Authentication',
    'Biometrics',
    'Push Notifications'
  ];
  const websiteOptions = ['Basic', 'Interactive', 'E-Commerce'];

  const [search, setSearch] = useState('');
  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidCheck, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [total, setTotal] = useState('');
  const [service, setService] = useState('');
  const [complexity, setComplexity] = useState('');
  const [users, setUsers] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);

  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, 'MM/dd/yy'),
        service,
        features.join(', '),
        service === 'Website' ? 'N/A' : complexity,
        service === 'Website' ? 'N/A' : platforms.join(', '),
        service === 'Website' ? 'N/A' : users,
        `$${total}`,
        true
      )
    ]);
    setDialogOpen(false);
    setName('');
    setDate(new Date());
    setService('');
    setFeatures([]);
    setComplexity('');
    setPlatforms([]);
    setUsers('');
    setTotal('');
  };

  const handleSearch = e => {
    setSearch(e.target.value);

    const rowData = rows.map(row =>
      Object.values(row).filter(option => option !== true && option !== false)
    );

    const matches = rowData.map(row =>
      row.map(option =>
        option.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    const newRows = [...rows];
    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );

    setRows(newRows);
  };

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
            value={search}
            onChange={handleSearch}
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
          <EnhancedTable rows={rows} />
        </Grid>
        {/* Dialog section */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          fullWidth
          maxWidth='md'>
          <Grid container justify='center' sm>
            <Grid item>
              <Typography variant='h1' gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container direction='row' justify='space-between'>
              <Grid item>
                {/* Input fields */}
                <Grid item container direction='column' sm>
                  <Grid item>
                    <TextField
                      fullWidth
                      label='Name'
                      id='name'
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  {/* Radio Service  */}
                  <Grid
                    item
                    container
                    direction='column'
                    style={{ marginTop: '5em' }}>
                    <Grid item>
                      <Typography variant='h4'>Service</Typography>
                    </Grid>
                    <Grid item>
                      <RadioGroup
                        aria-label='service'
                        name='service'
                        value={service}
                        onChange={e => {
                          setService(e.target.value);
                          setFeatures([]);
                        }}>
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value='Website'
                          control={<Radio />}
                          label='Website'
                        />
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value='Mobile App'
                          control={<Radio />}
                          label='Mobile App'
                        />
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value='Custom Software'
                          control={<Radio />}
                          label='Custom Software'
                        />
                      </RadioGroup>
                    </Grid>
                    {/* Platforms Select */}
                    <Grid item style={{ marginTop: '5em' }}>
                      <Select
                        disabled={service === 'Website'}
                        style={{ width: '12em' }}
                        labelId='platforms'
                        id='platforms'
                        multiple
                        displayEmpty
                        renderValue={
                          platforms.length > 0 ? undefined : () => 'Platforms'
                        }
                        value={platforms}
                        onChange={e => setPlatforms(e.target.value)}>
                        {platformOptions.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {/* Date picker */}
                <Grid
                  item
                  container
                  direction='column'
                  sm
                  alignItems='center'
                  style={{ marginTop: '16px' }}>
                  <Grid item>
                    <KeyboardDatePicker
                      format='MM/dd/yyyy'
                      value={date}
                      onChange={newDate => setDate(newDate)}
                    />
                  </Grid>

                  <Grid item>
                    {/* Radio Complexity  */}
                    <Grid
                      item
                      container
                      direction='column'
                      style={{ marginTop: '5em' }}>
                      <Grid item>
                        <Typography variant='h4'>Complexity</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label='complexity'
                          name='complexity'
                          value={complexity}
                          onChange={e => setComplexity(e.target.value)}>
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{ label: classes.service }}
                            value='Low'
                            control={<Radio />}
                            label='Low'
                          />
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{ label: classes.service }}
                            value='Medium'
                            control={<Radio />}
                            label='Medium'
                          />
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{ label: classes.service }}
                            value='High'
                            control={<Radio />}
                            label='High'
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {/*  total field*/}
                <Grid item container direction='column' sm>
                  <Grid item>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>$</InputAdornment>
                        )
                      }}
                      value={total}
                      id='total'
                      label='Total'
                      onChange={e => setTotal(e.target.value)}
                    />
                  </Grid>
                  <Grid item style={{ alignSelf: 'flex-end' }}>
                    {/* Radio Users  */}
                    <Grid
                      item
                      container
                      direction='column'
                      style={{ marginTop: '5em' }}>
                      <Grid item>
                        <Typography variant='h4'>Users</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label='users'
                          name='users'
                          value={users}
                          onChange={e => setUsers(e.target.value)}>
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{
                              label: classes.service,
                              root: classes.users
                            }}
                            value='0-10'
                            control={<Radio />}
                            label='0-10'
                          />
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{
                              label: classes.service,
                              root: classes.users
                            }}
                            value='10-100'
                            control={<Radio />}
                            label='10-100'
                          />
                          <FormControlLabel
                            disabled={service === 'Website'}
                            classes={{
                              label: classes.service,
                              root: classes.users
                            }}
                            value='100+'
                            control={<Radio />}
                            label='100+'
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* Features Select */}
                  <Grid item style={{ marginTop: '5em' }}>
                    <Select
                      style={{ width: '12em' }}
                      MenuProps={{ style: { zIndex: 1302 } }}
                      labelId='features'
                      id='features'
                      multiple
                      displayEmpty
                      renderValue={
                        features.length > 0 ? undefined : () => 'Features'
                      }
                      value={features}
                      onChange={e => setFeatures(e.target.value)}>
                      {service === 'Website'
                        ? websiteOptions.map(option => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))
                        : featureOptions.map(option => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* Add project  */}
            <Grid container justify='center' style={{ marginTop: '3em' }}>
              <Grid item>
                <Button
                  color='primary'
                  style={{ fontWeight: 300 }}
                  onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  className={classes.button}
                  onClick={addProject}
                  disabled={
                    service === 'Website'
                      ? name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        features.length > 1
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users.length === 0 ||
                        complexity.length === 0 ||
                        platforms.length === 0 ||
                        service.length === 0
                  }>
                  Add Project +
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default ProjectManager;
