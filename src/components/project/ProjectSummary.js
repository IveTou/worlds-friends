import React from 'react';
import { Link } from 'react-router-dom';

const ProjectSummary = ({project, id}) => {
  return (
    <Link to={'/project/'+id }>
      <div className="card z-depth-0 project-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{project.title}</span>
          <p>Posted by Next Ninja</p>
          <p className="grey-text">3rd September, 2am</p>
        </div>
      </div>
    </Link>
  )
}

export default ProjectSummary;