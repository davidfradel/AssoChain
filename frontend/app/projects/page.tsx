import React from 'react';
import ProjectList from '@/components/ProjectList';
import UserProfile from '@/components/UserProfile';
import Sidebar from '@/components/Sidebar';


const ProjectsPage: React.FC = () => {
  return (
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6">
        <ProjectList />
      </div>
    </div>
  );
};

export default ProjectsPage;