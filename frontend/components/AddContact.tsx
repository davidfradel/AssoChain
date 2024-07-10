'use client';

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

const GroupList = styled.div`
  width: 25%;
  margin-right: 20px;
`;

const GroupHeader = styled.h2`
  margin-bottom: 10px;
`;

const GroupItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const AddContactForm = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddContact = () => (
  <Container>
    <GroupList>
      <GroupHeader>Groupes</GroupHeader>
      {['Tous les Contacts', 'Comptabilité', 'RSE', 'Juridique', 'En cours de validation', 'Bloqués'].map((group) => (
        <GroupItem key={group}>
          <span>{group}</span>
          <span>9</span>
        </GroupItem>
      ))}
    </GroupList>
    <AddContactForm>
      <h2>Ajouter un nouveau contact</h2>
      <FormField>
        <Label>Nom</Label>
        <Input type="text" placeholder="Nom" />
      </FormField>
      <FormField>
        <Label>Email</Label>
        <Input type="email" placeholder="Email" />
      </FormField>
      <FormField>
        <Label>Téléphone</Label>
        <Input type="tel" placeholder="Téléphone" />
      </FormField>
      <FormField>
        <Label>Ville</Label>
        <Input type="text" placeholder="Ville" />
      </FormField>
      <FormField>
        <Label>Pays</Label>
        <Input type="text" placeholder="Pays" />
      </FormField>
      <ButtonGroup>
        <Button>Annuler</Button>
        <Button>Enregistrer</Button>
      </ButtonGroup>
    </AddContactForm>
  </Container>
);

export default AddContact;
