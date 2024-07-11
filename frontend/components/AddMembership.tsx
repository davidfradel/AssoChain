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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  color: #333;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  color: #333;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Summary = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const SummaryTitle = styled.h3`
  margin-bottom: 10px;
  color: #333;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #555;
`;

const AddMembership = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paymentMethod: '',
    membershipType: '',
    startDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Container>
      <Header>
        <div className="title-container">
          <h1 className="title-text">Ajouter une adhésion</h1>
        </div>
      </Header>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="name">Nom</Label>
          <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="paymentMethod">Méthode de paiement</Label>
          <Select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
            <option value="">Sélectionnez une méthode</option>
            <option value="auto-debit">Auto-debit</option>
            <option value="credit-card">Credit Card</option>
            <option value="cash">Cash</option>
            <option value="paypal">Paypal</option>
          </Select>
        </InputGroup>
        <InputGroup>
          <Label htmlFor="membershipType">Type d&apos;adhésion</Label>
          <Select id="membershipType" name="membershipType" value={formData.membershipType} onChange={handleChange} required>
            <option value="">Sélectionnez un type</option>
            <option value="FFB-loisir-majeur">FFB loisir majeur</option>
            <option value="FFB-BEA">FFB BEA</option>
            <option value="FMMAF-pro">FMMAF pro</option>
            <option value="FFKMDA-Amateur">FFKMDA Amateur</option>
            <option value="FMMAF-Amateur">FMMAF Amateur</option>
          </Select>
        </InputGroup>
        <InputGroup>
          <Label htmlFor="startDate">Date de début</Label>
          <Input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </InputGroup>
        <Button type="submit">Ajouter Adhésion</Button>
      </Form>
      <Summary>
        <SummaryTitle>Résumé</SummaryTitle>
        <SummaryItem>
          <span>Nom:</span>
          <span>{formData.name}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Email:</span>
          <span>{formData.email}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Méthode de paiement:</span>
          <span>{formData.paymentMethod}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Type d&apos;adhésion:</span>
          <span>{formData.membershipType}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Date de début:</span>
          <span>{formData.startDate}</span>
        </SummaryItem>
      </Summary>
    </Container>
  );
};

export default AddMembership;
