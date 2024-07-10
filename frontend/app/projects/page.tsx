import React from 'react';
import ProjectList from '../../components/ProjectList';
import UserProfile from '../../components/UserProfile';

const ProjectsPage: React.FC = () => {
  return (
    <div className="p-6">
    
      <UserProfile 
        avatar="https://i.pravatar.cc/?img=12"
        name="Jean Dupont"
        role="Secrétaire"
        location="Lyon"
        email="max@kt.com"
        tezos={4500}
        documentsInProgress={80}
        documentsOnChain={60}
        profileCompletion={50}/>
      <ProjectList />
    </div>
  );
};

export default ProjectsPage;