'use client';

import React from 'react';
import styled from 'styled-components';
import { FaFilter, FaFileExport, FaPlus, FaSyncAlt } from 'react-icons/fa';

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
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f8f8f8;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

interface StatusTagProps {
  status: string;
}

const StatusTag = styled.span<StatusTagProps>`
  background-color: ${props => (props.status === 'En cours' ? '#ff9800' : '#28a745')};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const PageNumber = styled.span`
  display: inline-block;
  margin: 0 5px;
  padding: 10px 15px;
  border: 1px solid #007bff;
  color: #007bff;
  border-radius: 5px;
  cursor: pointer;

  &.active {
    background-color: #007bff;
    color: white;
  }
`;

const SportResults = () => (
  <Container>
    <Header>
      <h1>Liste des résultats</h1>
      <ButtonGroup>
        <Button>
          <FaFilter />
          Filtrer
        </Button>
        <Button>
          <FaFileExport />
          Export
        </Button>
        <Button>
          <FaPlus />
          Ajouter des résultats
        </Button>
      </ButtonGroup>
    </Header>
    <Table>
      <thead>
        <tr>
          <TableHeader>Organisation</TableHeader>
          <TableHeader>Lieu</TableHeader>
          <TableHeader>Organisateur</TableHeader>
          <TableHeader>Nbr de combats</TableHeader>
          <TableHeader>Date</TableHeader>
          <TableHeader>Actions</TableHeader>
        </tr>
      </thead>
      <tbody>
        {[
          { organisation: 'Champ. EBU', lieu: 'Palais des sports - Levallois', organisateur: 'All Stars', nbrCombats: 8, date: '4 Juil 2023', status: 'En cours' },
          { organisation: 'La nuit des champions', lieu: 'Palais des sports - Levallois', organisateur: 'All Stars', nbrCombats: 12, date: '10 Juin 2023', status: 'Terminé' },
          { organisation: 'Champ. France BEA', lieu: 'Gym Jean Zay - Besançon', organisateur: 'Local Boxe Club', nbrCombats: 28, date: '2 Juin 2023', status: 'Terminé' },
          { organisation: 'Gala de prestige mixte', lieu: 'Gym Cavale Blanch - Brest', organisateur: 'Ring Brestois', nbrCombats: 16, date: '29 Mai 2023', status: 'Terminé' },
        ].map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.organisation}</TableCell>
            <TableCell>{item.lieu}</TableCell>
            <TableCell>{item.organisateur}</TableCell>
            <TableCell>{item.nbrCombats}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>
              <StatusTag status={item.status}>{item.status}</StatusTag>
              <FaSyncAlt style={{ marginLeft: 10, cursor: 'pointer' }} />
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
    <Pagination>
      <PageNumber className="active">1</PageNumber>
      <PageNumber>2</PageNumber>
    </Pagination>
  </Container>
);

export default SportResults;
