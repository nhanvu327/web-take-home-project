import React from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { AddressAutoComplete } from '../';
import { openUploadCareDialog } from '../../util/helpers/ProjectHelpers';
import { PROJECT_TYPES, CONTRACT_VALUES } from '../../util/Constants';
import './ProjectForm.css';

class ProjectForm extends React.Component {
  state = {
    project_type_id: '',
    description: '',
    contract_value_id: '',
    location: null,
    images: []
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

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { project_type_id, description, contract_value_id } = this.state;
    return (
      <div className="project-form project-form-container">
        <h3 className="project-form-title">Add a project you've worked</h3>
        <form autoComplete="off" onSubmit={this.onSubmit}>
          <FormControl className="project-form-field">
            <Button
              variant="raised"
              onClick={() => openUploadCareDialog(this.selectImages)}
            >
              Upload
            </Button>
            <div className="project-form-image-wrapper">
              {this.state.images.map(image => <img className="project-form-image" key={image} src={image} />)}
            </div>
          </FormControl>
          <FormControl className="project-form-field">
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
          </FormControl>
          <FormControl className="project-form-field">
            <TextField
              id="description"
              placeholder="Add a project description"
              fullWidth
              margin="normal"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className="project-form-field">
            <InputLabel htmlFor="project-type" disableAnimation>
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
          </FormControl>
          <FormControl className="project-form-field">
            <AddressAutoComplete selectAddress={this.selectAddress} />
          </FormControl>
          <Button
            variant="raised"
            color="primary"
            type="submit"
            disabled={!(project_type_id && description && contract_value_id)}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default ProjectForm;
