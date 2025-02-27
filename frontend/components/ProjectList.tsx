'use client';

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHead = styled.thead`
  background-color: #f1f5f9;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const TableCell = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: bold;
  color: #333;
`;

const TableData = styled.td`
  padding: 15px;
  text-align: left;
  color: #555;
`;

const StatusButton = styled.button<{ status: string }>`
  background-color: ${({ status }) => {
    switch (status) {
      case 'En cours d\'onchainisation':
        return '#ffc107';
      case 'En attente':
        return '#17a2b8';
      case 'Lien onchain':
        return '#28a745';
      default:
        return '#6c757d';
    }
  }};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

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
  { name: 'Rapport annuel', type: 'DOCX', date: '15/03/2023', status: 'Lien onchain', link: 'Voir le document' },
  { name: 'Contrat sponsor', type: 'PDF', date: '30/01/2023', status: 'En cours d\'onchainisation', link: 'Lien indisponible' },
  { name: 'Règlement intérieur', type: 'DOC', date: '01/02/2023', status: 'En attente', link: 'Lien onchain' },
  { name: 'Calendrier compétitions', type: 'XLSX', date: '10/02/2023', status: 'Lien onchain', link: 'Voir le document' },
  { name: 'Plan de formation', type: 'PDF', date: '05/02/2023', status: 'En attente', link: 'Lien onchain' },
  { name: 'Statistiques annuelles', type: 'XLSX', date: '20/01/2023', status: 'Lien onchain', link: 'Voir le document' },
  { name: 'Compte rendu AG', type: 'DOCX', date: '18/03/2023', status: 'En cours d\'onchainisation', link: 'Lien indisponible' },
  { name: 'Plan stratégique', type: 'PDF', date: '25/01/2023', status: 'En attente', link: 'Lien onchain' },
  { name: 'Guide des bonnes pratiques', type: 'DOC', date: '14/02/2023', status: 'Lien onchain', link: 'Voir le document' },
  { name: 'Procédure d\'inscription', type: 'PDF', date: '05/01/2023', status: 'En cours d\'onchainisation', link: 'Lien indisponible' },
];

const ProjectList = () => {
  return (
    <Container>
      <Header>
        <div className="title-container">
          <h1 className="title-text">Liste des projets</h1>
        </div>
        <ButtonGroup>
          <Button>
            <i className="fa fa-filter"></i>
            Filtrer
          </Button>
          <Button>
            <i className="fa fa-file-export"></i>
            Export
          </Button>
          <Button>
            <i className="fa fa-plus"></i>
            Ajouter un projet
          </Button>
        </ButtonGroup>
      </Header>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Lien</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {projects.map((project, index) => (
            <TableRow key={index}>
              <TableData>{project.name}</TableData>
              <TableData>{project.type}</TableData>
              <TableData>{project.date}</TableData>
              <TableData>
                <StatusButton status={project.status}>{project.status}</StatusButton>
              </TableData>
              <TableData>{project.link}</TableData>
              <TableData>
                <Button>Actions</Button>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PaginationButton disabled>{'<'}</PaginationButton>
        <PaginationButton>1</PaginationButton>
        <PaginationButton>2</PaginationButton>
        <PaginationButton>{'>'}</PaginationButton>
      </Pagination>
    </Container>
  );
};

export default ProjectList;
