// components/ProjectList.tsx
import ProjectItem from './ProjectItem';

interface Project {
  name: string;
  type: string;
  date: string;
  status: string;
  link: string;
}

const projects: Project[] = [
  { name: 'DCE Marché matériel', type: 'PDF', date: '20/05/2023', status: 'En cours d\'onchainisation', link: 'Lien indisponible' },
  { name: 'Budget prévisionnel', type: 'XLSX', date: '12/04/2023', status: 'En attente', link: 'Lien onchain' },
  // Ajoutez d'autres projets ici
];

const ProjectList: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Projets d&apos;onchainisation</h2>
      <input className="mb-4 p-2 border rounded w-full" type="text" placeholder="Rechercher un document" />
      <div>
        {projects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
