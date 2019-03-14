import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ProjectSummary = ({project, id}) => {
  console.log(project)
  return (
    <Link to={'/project/'+id }>
      <div className="card z-depth-0 project-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{project.title}</span>
          <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
          <p className="grey-text">{moment(project.createdAt.toDate().toString()).calendar()}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProjectSummary;