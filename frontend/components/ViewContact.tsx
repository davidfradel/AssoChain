'use client';

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 20px;
  max-width: 1200px;
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

const ContactDetails = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ContactHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
`;

const Name = styled.h2`
  margin: 0;
`;

const ContactInfo = styled.div`
  margin-bottom: 20px;
`;

const InfoLabel = styled.p`
  margin: 5px 0;
  color: #777;
`;

const Tabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const ContactNotes = styled.div`
  margin-top: 20px;
`;

const ContactNote = styled.p`
  margin: 5px 0;
`;

const ViewContact = () => (
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
    <ContactDetails>
      <ContactHeader>
        <Avatar src="https://via.placeholder.com/80" alt="Avatar" />
        <Name>Emma Smith</Name>
      </ContactHeader>
      <ContactInfo>
        <InfoLabel>Email: smith@kpmg.com</InfoLabel>
        <InfoLabel>Phone: +6141234567</InfoLabel>
        <InfoLabel>Organisation: Keenthemes Inc</InfoLabel>
        <InfoLabel>Ville: Melbourne</InfoLabel>
        <InfoLabel>Pays: Australia</InfoLabel>
      </ContactInfo>
      <Tabs>
        <Tab>General</Tab>
        <Tab>Meetings</Tab>
        <Tab>Activités</Tab>
      </Tabs>
      <ContactNotes>
        <h3>Notes</h3>
        <ContactNote>Emma Smith joined the team on September 2019 as a junior associate. She soon showcased her expertise and experience in knowledge and skill in the field, which was very valuable to the company. She was promptly promoted to senior associate on July 2020.</ContactNote>
        <ContactNote>Emma Smith now heads a team of 5 associates and leads the company&apos;s sales growth by 7%.</ContactNote>
      </ContactNotes>
    </ContactDetails>
  </Container>
);

export default ViewContact;
