'use client';

import React, { useState } from 'react';
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
`;

const TableHeader = styled.th`
  background-color: #f1f1f1;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const Tag = styled.span<{ status: string }>`
  background-color: ${({ status }) => {
    switch (status) {
      case 'Actif':
        return '#28a745';
      case 'En attente':
        return '#ffc107';
      case 'Inactif':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  }};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
`;

const ActionButton = styled.button`
  background-color: #f8f8f8;
  color: #333;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  ${DropdownMenu}:hover & {
    display: block;
  }
`;

const DropdownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const membersData = [
  { id: 1, name: 'Emma Smith', email: 'smith@kpmg.com', status: 'Inactif', lastLogin: '22 Nov 2022, 10:10 pm' },
  { id: 2, name: 'Melody Macy', email: 'melody@altibox.com', status: 'En attente', lastLogin: '10 Jul 2024, 6:05 pm' },
  { id: 3, name: 'Max Smith', email: 'max@kt.com', status: 'En attente', lastLogin: '11 Jul 2024, 10:10 pm' },
  { id: 4, name: 'Sean Bean', email: 'sean@delitto.com', status: 'Actif', lastLogin: '25 Oct 2023, 10:10 pm' },
  { id: 5, name: 'Brian Cox', email: 'brian@exchange.com', status: 'Actif', lastLogin: '15 Apr 2024, 2:40 pm' },
  { id: 6, name: 'Mikaela Collins', email: 'mik@pex.com', status: 'Actif', lastLogin: '10 Nov 2023, 10:10 pm' },
  { id: 7, name: 'Francis Mitcham', email: 'f.mit@kpmg.com', status: 'Actif', lastLogin: '21 Feb 2024, 8:43 pm' },
  { id: 8, name: 'Olivia Wild', email: 'olivia@corpmail.com', status: 'Actif', lastLogin: '04 Jul 2024, 5:30 pm' },
  { id: 9, name: 'Neil Owen', email: 'owen.neil@gmail.com', status: 'Inactif', lastLogin: '23 Sep 2022, 9:23 pm' },
  { id: 10, name: 'Dan Wilson', email: 'dan@consulting.com', status: 'Actif', lastLogin: '05 Jun 2024, 11:12 am' },
  { id: 11, name: 'Emma Bold', email: 'emma@lintenso.com', status: 'Actif', lastLogin: '12 Oct 2023, 3:56 pm' },
  { id: 12, name: 'Ana Crown', email: 'ana.cf@limtel.com', status: 'Actif', lastLogin: '10 Nov 2023, 10:10 pm' },
];

const MemberList = () => {
  const [members, setMembers] = useState(membersData);

  const sortedMembers = members.slice().sort((a, b) => new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime());

  const handleActivate = (id: number) => {
    setMembers(members.map(member => member.id === id ? { ...member, status: 'Actif' } : member));
  };

  const handleDelete = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
  };

  return (
    <Container>
      <Header>
        <div className="title-container">
          <h1 className="title-text">Liste des adhérents</h1>
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
            Ajouter un adhérent
          </Button>
        </ButtonGroup>
      </Header>
      <Table>
        <thead>
          <tr>
            <TableHeader>Adhérent</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>État</TableHeader>
            <TableHeader>Dernière connexion</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {sortedMembers.map((member) => (
            <TableRow key={member.id}>
              <TableData>{member.name}</TableData>
              <TableData>{member.email}</TableData>
              <TableData><Tag status={member.status}>{member.status}</Tag></TableData>
              <TableData>{member.lastLogin}</TableData>
              <TableData>
                <DropdownMenu>
                  <ActionButton>Actions</ActionButton>
                  <DropdownContent>
                    {member.status === 'En attente' ? (
                      <DropdownItem href="#" onClick={() => handleActivate(member.id)}>Activer</DropdownItem>
                    ) : (
                      <DropdownItem href="#" onClick={() => handleDelete(member.id)}>Supprimer</DropdownItem>
                    )}
                  </DropdownContent>
                </DropdownMenu>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MemberList;
