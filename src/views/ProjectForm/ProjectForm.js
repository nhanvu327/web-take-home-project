import React from 'react';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { addProject } from '../../util/api_calls/ProjectApiCalls';
import ErrorField from './ErrorField';
import { AddressAutoComplete } from '../';
import {
  openUploadCareDialog,
  getUnixTime,
  getFileNames,
  getContractValues
} from '../../util/helpers/ProjectHelpers';
import { PROJECT_TYPES, CONTRACT_VALUES } from '../../util/Constants';
import './ProjectForm.css';

const styles = theme => ({
  formControl: {
    width: '100%',
    marginBottom: '10px'
  },
  formControlUpload: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
  },
  uploadButton: {
    textTransform: 'capitalize',
    backgroundColor: 'white',
    color: '#b3b3b3'
  },
  imageWrapper: {
    marginTop: '20px',
    alignSelf: 'flex-start'
  },
  imageItem: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
    borderRadius: '5px',
    boxShadow: '0px 2px 1px #707070'
  },
  title: {
    textAlign: 'center',
    marginTop: 0
  },
  submitButton: {
    position: 'absolute',
    bottom: '27px',
    left: '32px'
  }
});

class ProjectForm extends React.Component {
  state = {
    project_type_id: '',
    description: '',
    contract_value_id: '',
    location: null,
    images: [],
    isLocationError: false,
    isProjectTypeError: false,
    isDescriptionError: false,
    isContractError: false,
    isSubmitting: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  selectAddress = location => {
    this.setState({
      location
    });
  };

  selectImages = images => {
    this.setState({
      images: images.map(image => image.url)
    });
  };

  setError = name => {
    this.setState({
      [name]: true
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      suburb: this.state.location.suburb,
      state: this.state.location.state,
      location_place_id: this.state.location.place_id,
      location_lat: this.state.location.latitude,
      location_long: this.state.location.longitude,
      address: this.state.location.formatted_address,
      date_unix: getUnixTime(),
      description: this.state.description,
      images: this.state.images,
      files: getFileNames(this.state.images),
      default_image_url: this.state.images[0],
      project_type_id: this.state.project_type_id,
      min_contract_value: getContractValues(
        this.state.contract_value_id,
        'min'
      ),
      max_contract_value: getContractValues(this.state.contract_value_id, 'max')
    };
    this.setState({
      isSubmitting: true
    });
    addProject(data, () => {
      this.props.toggleModal();
      this.props.addProject(data);
    }, () => {
      this.setState({
        isSubmitting: false
      });
    });
  };

  render() {
    const {
      project_type_id,
      description,
      contract_value_id,
      location,
      images,
      isProjectTypeError,
      isDescriptionError,
      isContractError,
      isLocationError,
      isSubmitting
    } = this.state;
    const { classes } = this.props;
    return (
      <div className="project-form project-form-container">
        <h3 className={classes.title}>Add a project you've worked</h3>
        <form autoComplete="off" onSubmit={this.onSubmit}>
          <FormControl className={classes.formControlUpload}>
            <Button
              variant="raised"
              className={classes.uploadButton}
              onClick={() => openUploadCareDialog(this.selectImages)}
            >
              Upload photos
            </Button>
            <div className={classes.imageWrapper}>
              {this.state.images.map(image => (
                <img
                  className={classes.imageItem}
                  alt={image}
                  key={image}
                  src={image}
                />
              ))}
            </div>
          </FormControl>
          <FormControl
            error={isProjectTypeError}
            required
            className={classes.formControl}
          >
            <InputLabel htmlFor="project-type">Select project type</InputLabel>
            <Select
              value={project_type_id}
              onChange={this.handleChange}
              inputProps={{
                name: 'project_type_id',
                id: 'project-type'
              }}
            >
              {PROJECT_TYPES.map(type => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
            {isProjectTypeError && <ErrorField />}
          </FormControl>
          <FormControl
            error={isDescriptionError}
            className={classes.formControl}
          >
            <TextField
              required
              id="description"
              label="Add a project description"
              fullWidth
              name="description"
              value={description}
              onChange={this.handleChange}
            />
            {isDescriptionError && <ErrorField />}
          </FormControl>
          <FormControl
            error={isContractError}
            required
            className={classes.formControl}
          >
            <InputLabel htmlFor="contract_value_id">
              Select a contract value
            </InputLabel>
            <Select
              value={contract_value_id}
              onChange={this.handleChange}
              inputProps={{
                name: 'contract_value_id',
                id: 'contract_value_id'
              }}
            >
              {CONTRACT_VALUES.map(value => (
                <MenuItem key={value.id} value={value.id}>
                  {value.description}
                </MenuItem>
              ))}
            </Select>
            {isContractError && <ErrorField />}
          </FormControl>
          <FormControl className={classes.formControl}>
            <AddressAutoComplete
              setError={this.setError}
              selectAddress={this.selectAddress}
            />
            {isLocationError && <ErrorField />}
          </FormControl>
          {isSubmitting ? (
            <CircularProgress className={classes.submitButton} />
          ) : (
            <Button
              variant="raised"
              className={classes.submitButton}
              color="primary"
              type="submit"
              disabled={
                !(
                  project_type_id &&
                  description &&
                  contract_value_id &&
                  location &&
                  images.length > 0
                )
              }
            >
              Submit
            </Button>
          )}
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(ProjectForm);
