//-----------------------------------------------------------------------------------------
//--------------------------------- Third party imports -----------------------------------
//-----------------------------------------------------------------------------------------


import React, { Component } from 'react';
import { connect } from 'react-redux';

//-----------------------------------------------------------------------------------------
//------------------------------------ Local imports --------------------------------------
//-----------------------------------------------------------------------------------------

import './Home.css';
import WorkyardLogo from '../assets/images/workyard-logo.svg';

//-----------------------------------------------------------------------------------------
//------------------------------------ Home Component -------------------------------------
//-----------------------------------------------------------------------------------------


class Home extends Component {
  
  //-------------------------------------------------------------------------
  //------------------ Constructor & Lifecycle methods ----------------------
  //-------------------------------------------------------------------------
  
  constructor(props) {
    super(props);
    this.state = {}
    this.handlerExample = this.handlerExample.bind(this);
  }

  //-------------------------------------------------------------------------
  //------------------------- Handler methods -------------------------------
  //-------------------------------------------------------------------------

  handlerExample() {
    console.log("Handler Example Running!");
  }

  //-------------------------------------------------------------------------
  //------------------------------- Render ----------------------------------
  //-------------------------------------------------------------------------
  
  render() {

    const { handlerExample } = this;

    return (
      <div className="home home-container">
        <div className="home-header">
          <img src={WorkyardLogo} alt="Workyard logo" className="workyard-logo" />
        </div>
        <div className="home-main-section">
          <h1 className="home-main-section-title">Post a project</h1>
          <button className="home-main-section-button" onClick={handlerExample}>Create Project</button>
        </div>
      </div>
    );
  }
}


  //-------------------------------------------------------------------------
  //-------------------- Mapping store to Home's props ----------------------
  //-------------------------------------------------------------------------


  const mapStateToProps = (state, ownProps) => {

    return {
    }
  }


  const mapDispatchToProps = dispatch => {
    return {
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(Home);