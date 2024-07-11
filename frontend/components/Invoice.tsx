'use client';

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9fafb;
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
      case 'Payé':
        return '#28a745';
      case 'En attente':
        return '#ffc107';
      case 'En retard':
        return '#dc3545';
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

interface Invoice {
  client: string;
  type: string;
  amount: string;
  date: string;
  status: string;
}

const invoices: Invoice[] = [
  { client: 'ABC Corp', type: 'Facture', amount: '500 €', date: '22/06/2023', status: 'Payé' },
  { client: 'XYZ Ltd', type: 'Devis', amount: '1000 €', date: '15/05/2023', status: 'En attente' },
  { client: 'ACME Inc', type: 'Facture', amount: '750 €', date: '10/04/2023', status: 'En retard' },
  { client: 'Global Corp', type: 'Devis', amount: '2000 €', date: '25/03/2023', status: 'Payé' },
  { client: 'Tech Solutions', type: 'Facture', amount: '1200 €', date: '20/02/2023', status: 'En attente' },
  { client: 'Business Co', type: 'Devis', amount: '1500 €', date: '30/01/2023', status: 'En retard' },
  { client: 'Fast Services', type: 'Facture', amount: '300 €', date: '18/01/2023', status: 'Payé' },
  { client: 'Bright Ideas', type: 'Devis', amount: '1800 €', date: '05/12/2022', status: 'En attente' },
  { client: 'Next Gen', type: 'Facture', amount: '400 €', date: '12/11/2022', status: 'En retard' },
  { client: 'Future Tech', type: 'Devis', amount: '2200 €', date: '01/10/2022', status: 'Payé' },
];

const InvoiceList = () => {
  return (
    <Container>
      <Header>
        <div className="title-container">
          <h1 className="title-text">Liste des factures</h1>
        </div>
        <h1>Liste des factures et devis</h1>
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
            Ajouter une facture/devis
          </Button>
        </ButtonGroup>
      </Header>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Montant</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {invoices.map((invoice, index) => (
            <TableRow key={index}>
              <TableData>{invoice.client}</TableData>
              <TableData>{invoice.type}</TableData>
              <TableData>{invoice.amount}</TableData>
              <TableData>{invoice.date}</TableData>
              <TableData>
                <StatusButton status={invoice.status}>{invoice.status}</StatusButton>
              </TableData>
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

export default InvoiceList;
