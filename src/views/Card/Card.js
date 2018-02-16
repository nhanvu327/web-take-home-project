import React from 'react';
import { getProjectNameById, getContractDescriptionById } from '../../util/helpers/ProjectHelpers';
import './Card.css';

class Card extends React.Component {
  render() {
    const { project } = this.props;
    return (
      <div className="card-wrapper">
        <p>{getProjectNameById(project.project_type_id)}</p>
        <p>{project.description}</p>
        <p>{getContractDescriptionById(project.contract_id)}</p>
        <p>{project.suburb}, {project.state}</p>
      </div>
    )
  }
}

export default Card;