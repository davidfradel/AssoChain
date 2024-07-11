'use client';

import React from 'react';
import styled from 'styled-components';
import { FaFilter, FaFileExport, FaPlus } from 'react-icons/fa';

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

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-weight: bold;
`;

const Email = styled.div`
  color: #777;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Tag = styled.span`
  background-color: #28a745;
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

const MemberList = () => (
  <Container>
    <Header>
        <div className="title-container">
          <h1 className="title-text">Liste des contacts</h1>
        </div>
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
          Ajouter un adhérent
        </Button>
      </ButtonGroup>
    </Header>
    <List>
      {Array(10).fill(0).map((_, index) => (
        <ListItem key={index}>
          <Avatar src="https://via.placeholder.com/40" alt="Avatar" />
          <Info>
            <Name>Nom de l&apos;utilisateur</Name>
            <Email>email@example.com</Email>
          </Info>
          <Status>
            <Tag>Actif</Tag>
            <div>22 Sep 2023, 10:10 pm</div>
          </Status>
          <ActionButton>Actions</ActionButton>
        </ListItem>
      ))}
    </List>
  </Container>
);

export default MemberList;
