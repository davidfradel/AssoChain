'use client';
import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const Card = styled.div`
  display: flex;
  align-items: start;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 20px;
  min-height: 70vh;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10%;
  margin-right: 40px;
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1.5em;
  margin: 0;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const DetailItem = styled.p`
  display: flex;
  align-items: center;
  font-size: 1em;
  color: #777;
  margin-right: 15px;
  margin-bottom: 0;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.p`
  font-size: 1.2em;
  margin: 0;
`;

const StatLabel = styled.p`
  font-size: 0.9em;
  color: #777;
  margin: 0;
`;

const ProfileCompletion = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 10px;
`;

const Progress = styled.div<{ percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-color: #4caf50;
`;

interface ProfileCardProps {
  avatar: string;
  name: string;
  role: string;
  location: string;
  email: string;
  fbbCommunityToken: number;
  documentsInProgress: number;
  documentsOnChain: number;
  profileCompletion: number;
}

const UserAdminProfile: React.FC<ProfileCardProps> = ({
  avatar,
  name,
  role,
  location,
  email,
  fbbCommunityToken,
  documentsInProgress,
  documentsOnChain,
  profileCompletion,
}) => {
  return (
    <Card>
      <Avatar src={avatar} alt={`${name}'s avatar`} />
      <Info>
        <Name>
          {name} <FaCheckCircle style={{ marginLeft: 5, color: 'SkyBlue' }} />
        </Name>
        <Details>
          <DetailItem>{role}</DetailItem>
          <DetailItem>
            <MdLocationOn style={{ marginRight: 5 }} />
            {location}
          </DetailItem>
          <DetailItem>
            <FaEnvelope style={{ marginRight: 5 }} />
            {email}
          </DetailItem>
        </Details>
        <Stats>
          <Stat>
            <StatNumber>{fbbCommunityToken}</StatNumber>
            <StatLabel>FFB-Community-Token</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>{documentsInProgress}</StatNumber>
            <StatLabel>Documents en cours</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>{documentsOnChain}%</StatNumber>
            <StatLabel>Documents onchain</StatLabel>
          </Stat>
          <ProfileCompletion>
            <StatLabel>Complétion du profil</StatLabel>
            <ProgressBarContainer>
              <ProgressBar>
                <Progress percentage={profileCompletion} />
              </ProgressBar>
              <span>{profileCompletion}%</span>
            </ProgressBarContainer>
          </ProfileCompletion>
        </Stats>
      </Info>
    </Card>
  );
};

export default UserAdminProfile;
