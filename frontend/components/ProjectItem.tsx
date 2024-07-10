import React from 'react';

interface Project {
  name: string;
  type: string;
  date: string;
  status: string;
  link: string;
}

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow rounded mb-4">
      <div className="flex-1">
        <h3 className="text-lg font-bold">{project.name}</h3>
        <p>{project.type}</p>
        <p>{project.date}</p>
      </div>
      <div className="flex-1">
        <p>{project.status}</p>
        <p>{project.link}</p>
      </div>
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Actions</button>
      </div>
    </div>
  );
};

export default ProjectItem;
