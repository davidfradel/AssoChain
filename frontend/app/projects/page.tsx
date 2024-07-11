import React from 'react';
import ProjectList from '@/components/ProjectList';
import UserProfile from '@/components/UserProfile';
import Sidebar from '@/components/Sidebar';


const ProjectsPage: React.FC = () => {
  return (
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6">
          <UserProfile 
            avatar="https://i.pravatar.cc/?img=12"
            name="Jean Dupont"
            role="Secrétaire"
            location="Lyon"
            email="max@kt.com"
            fbbCommunityToken={4500}
            documentsInProgress={80}
            documentsOnChain={60}
            profileCompletion={50}/>
        <ProjectList />
      </div>
    </div>
  );
};

export default ProjectsPage;