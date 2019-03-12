import React from 'react';
import ProjectSummary from './ProjectSummary';

const ProjectList = ({projects}) => {
  return (
    <div className="project-list section">
      { projects && projects.map(project => 
          <ProjectSummary project={project} id={project.id} key={project.id} />
      )}
    </div>
  )
}

export default ProjectList;