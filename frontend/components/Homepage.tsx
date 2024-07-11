'use client';

import React from 'react';
import styled from 'styled-components';
import { FaUsers, FaFileInvoice, FaProjectDiagram, FaRunning } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 220px 20px;
  background-color: #f5f5f5;
  flex-grow: 1;
  justify-content: center;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #1F2937;
`;

const Description = styled.p`
  font-size: 1.2em;
  color: #777;
`;

const Features = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
`;

const Feature = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1 1 250px;
`;

const FeatureIcon = styled.div`
  font-size: 2em;
  color: #1F2937;
  margin-bottom: 10px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #1F2937;
`;

const FeatureDescription = styled.p`
  font-size: 1em;
  color: #1F2937;
`;

const HomePage = () => (
  <Wrapper>
    <Container>
      <Header>
        <Title>Bienvenue sur AssoChain</Title>
        <Description>La plateforme de gouvernance blockchain pour gérer vos contacts, adhésions, factures et projets documentaires de manière efficace et sécurisée.</Description>
      </Header>
      <Features>
        <Feature>
          <FeatureIcon><FaUsers /></FeatureIcon>
          <FeatureTitle>Gestion des contacts</FeatureTitle>
          <FeatureDescription>Organisez et gérez tous vos contacts en un seul endroit.</FeatureDescription>
        </Feature>
        <Feature>
          <FeatureIcon><FaFileInvoice /></FeatureIcon>
          <FeatureTitle>Facture et devis</FeatureTitle>
          <FeatureDescription>Créez et gérez vos factures et devis facilement.</FeatureDescription>
        </Feature>
        <Feature>
          <FeatureIcon><FaProjectDiagram /></FeatureIcon>
          <FeatureTitle>Projets documentaires</FeatureTitle>
          <FeatureDescription>Suivez et gérez vos projets documentaires avec facilité.</FeatureDescription>
        </Feature>
        <Feature>
          <FeatureIcon><FaRunning /></FeatureIcon>
          <FeatureTitle>Organisation sportive</FeatureTitle>
          <FeatureDescription>Coordonnez vos activités sportives et gérez les résultats.</FeatureDescription>
        </Feature>
      </Features>
    </Container>
  </Wrapper>
);

export default HomePage;
