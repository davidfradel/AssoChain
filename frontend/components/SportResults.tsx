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
      case 'En cours':
        return '#ffc107';
      case 'Voir les scores':
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

const Results = () => {
  return (
    <Container>
      <Header>
        <div className="title-container">
          <h1 className="title-text">Liste des résultats</h1>
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
            Ajouter des résultats
          </Button>
        </ButtonGroup>
      </Header>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ORGANISATION</TableCell>
            <TableCell>LIEU</TableCell>
            <TableCell>ORGANISATEUR</TableCell>
            <TableCell>NBR DE COMBATS</TableCell>
            <TableCell>DATE</TableCell>
            <TableCell>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          <TableRow>
            <TableData>Champ. EBU</TableData>
            <TableData>Palais des sports - Levallois</TableData>
            <TableData>All Stars</TableData>
            <TableData>8</TableData>
            <TableData>4 Juil 2023</TableData>
            <TableData>
              <StatusButton status="En cours">En cours</StatusButton>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>La nuit des champions</TableData>
            <TableData>Palais des sports - Levallois</TableData>
            <TableData>All Stars</TableData>
            <TableData>12</TableData>
            <TableData>10 Juin 2023</TableData>
            <TableData>
              <StatusButton status="Voir les scores">Voir les scores</StatusButton>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>Champ. France BEA</TableData>
            <TableData>Gym Jean Zay - Besançon</TableData>
            <TableData>Local Boxe Club</TableData>
            <TableData>28</TableData>
            <TableData>2 Juin 2023</TableData>
            <TableData>
              <StatusButton status="Voir les scores">Voir les scores</StatusButton>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>Gala de prestige mixte</TableData>
            <TableData>Gym Cavale Blanch - Brest</TableData>
            <TableData>Ring Brestois</TableData>
            <TableData>16</TableData>
            <TableData>29 Mai 2023</TableData>
            <TableData>
              <StatusButton status="Voir les scores">Voir les scores</StatusButton>
            </TableData>
          </TableRow>
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

export default Results;
