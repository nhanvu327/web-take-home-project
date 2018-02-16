//-----------------------------------------------------------------------------------------
//--------------------------------- Third party imports -----------------------------------
//-----------------------------------------------------------------------------------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

//-----------------------------------------------------------------------------------------
//------------------------------------ Local imports --------------------------------------
//-----------------------------------------------------------------------------------------

import './Home.css';
import { Modal, ProjectForm, Card } from '../';
import { addProjectAction } from '../../actions/ProjectActions';
import WorkyardLogo from '../../assets/images/workyard-logo.svg';

//-----------------------------------------------------------------------------------------
//------------------------------------ Home Component -------------------------------------
//-----------------------------------------------------------------------------------------
const theme = createMuiTheme({
  palette: {
    primary: { main: '#26cac8' },
    secondary: { main: '#11cb5f' }
  },
  typography: {
    fontFamily: 'GT-Walsheim'
  }
});

class Home extends Component {
  //-------------------------------------------------------------------------
  //------------------ Constructor & Lifecycle methods ----------------------
  //-------------------------------------------------------------------------

  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: false
    };
  }

  //-------------------------------------------------------------------------
  //------------------------- Handler methods -------------------------------
  //-------------------------------------------------------------------------

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpened: !prevState.isModalOpened
    }));
  };

  //-------------------------------------------------------------------------
  //------------------------------- Render ----------------------------------
  //-------------------------------------------------------------------------

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="home home-container">
          <div className="home-header">
            <img
              src={WorkyardLogo}
              alt="Workyard logo"
              className="workyard-logo"
            />
          </div>
          <div className="home-main-section">
            <h1 className="home-main-section-title">Post a project</h1>
            <button
              className="home-main-section-button"
              onClick={this.toggleModal}
            >
              Create Project
            </button>
          </div>
          <div className="home-card-section">
            {this.props.projects.map(project => (
              <Card key={project.id} project={project} />
            ))}
          </div>
          <Modal
            toggleModal={this.toggleModal}
            isModalOpened={this.state.isModalOpened}
          >
            <ProjectForm
              toggleModal={this.toggleModal}
              addProject={this.props.addProject}
            />
          </Modal>
        </div>
      </MuiThemeProvider>
    );
  }
}

//-------------------------------------------------------------------------
//-------------------- Mapping store to Home's props ----------------------
//-------------------------------------------------------------------------

const mapStateToProps = (state, ownProps) => {
  return {
    projects: state.Project.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProject: data => dispatch(addProjectAction(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
