import React from 'react';
import TextField from 'material-ui/TextField';
import { AddressAutoComplete } from '../';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { PROJECT_TYPES, CONTRACT_VALUES } from '../../util/Constants';
import './ProjectForm.css';

class ProjectForm extends React.Component {
  state = {
    project_type_id: '',
    description: '',
    contract_value: ''
  };

  handleChange = (event, index, value) => {
    console.log(event.target.value);
    this.setState({ project_type_id: value });
  };

  getCoords = (lat, lng) => {
    console.log(lat, lng);
  };

  render() {
    return (
      <div className="project-form project-form-container">
        <h3 className="project-form-title">Add a project you've worked</h3>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <form autoComplete="off">
            <SelectField
              fullWidth
              value={this.state.project_type_id}
              onChange={this.handleChange}
            >
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
            <AddressAutoComplete results={this.getCoords} />
          </form>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default ProjectForm;
