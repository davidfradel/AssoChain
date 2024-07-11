import styled from 'styled-components';
import { FaCheckCircle, FaEnvelope, FaWallet } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useAccount, useBalance, useEnsName } from 'wagmi';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 20px;
  min-height: 70vh;
  width: 70%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10%;
  margin-right: 20px;
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
  flex-wrap: wrap;
  align-items: center;
  margin: 10px 0;
`;

const DetailItem = styled.p`
  display: flex;
  align-items: center;
  font-size: 1em;
  color: #777;
  margin-right: 15px;
  margin-bottom: 0;
`;

const WalletInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  justify-items: center;
  margin-top: 50px;
  padding-top: 50px;
  border-top: solid #777;
`;

const Balance = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BalanceLabel = styled.p`
  font-size: 1em;
  color: #777;
  margin-right: 10px;
`;

const BalanceValue = styled.p`
  font-size: 1.2em;
  margin: 0;
`;

const NFTImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10%;
  margin-top: 20px;
`;

interface ProfileCardProps {
  avatar: string;
  name: string;
  role: string;
  location: string;
  email: string;
  fbbCommunityToken: number;
  nftImageUrl: string;
}

const UserProfile: React.FC<ProfileCardProps> = ({
  avatar,
  name,
  role,
  location,
  email,
  fbbCommunityToken,
  nftImageUrl
}) => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <Card>
      <Header>
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
            <DetailItem>
              <FaWallet style={{ marginRight: 5 }} />
              {address}
            </DetailItem>
          </Details>
        </Info>
      </Header>
      <WalletInfo>
        <Balance>
          <BalanceLabel>Votre solde ETH:</BalanceLabel>
          <BalanceValue>{balance?.formatted} ETH</BalanceValue>
        </Balance>
        <Balance>
          <BalanceLabel>Votre solde FFB Community Token:</BalanceLabel>
          <BalanceValue>{fbbCommunityToken} FFB</BalanceValue>
        </Balance>
         <Balance>
          <BalanceLabel>Votre NFT unique:</BalanceLabel>
          <BalanceValue> {nftImageUrl && (
              <NFTImage src={nftImageUrl} alt="NFT" />
            )}
      </BalanceValue>
        </Balance>
      </WalletInfo>
     
    </Card>
  );
};

export default UserProfile;
