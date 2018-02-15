import React from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { AddressAutoComplete } from '../';
import { PROJECT_TYPES, CONTRACT_VALUES } from '../../util/Constants';
import './ProjectForm.css';

class ProjectForm extends React.Component {
  state = {
    project_type_id: '',
    description: '',
    contract_value: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="project-form project-form-container">
        <h3 className="project-form-title">Add a project you've worked</h3>
        <form autoComplete="off">
          <FormControl className="project-form-field">
            <InputLabel htmlFor="project-type">Select project type</InputLabel>
            <Select
              value={this.state.project_type_id}
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
            />
          </FormControl>
          <FormControl className="project-form-field">
            <InputLabel htmlFor="project-type" disableAnimation>
              Select a contract value
            </InputLabel>
            <Select
              value={this.state.contract_value}
              onChange={this.handleChange}
              inputProps={{
                name: 'contract_value',
                id: 'contract_value'
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
            <AddressAutoComplete />
          </FormControl>
          <Button variant="raised" color="primary">
            Primary
          </Button>
        </form>
      </div>
    );
  }
}

export default ProjectForm;
