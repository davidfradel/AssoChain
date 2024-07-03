import { Request, Response } from 'express';
import { ethers } from 'ethers';
import UserManagement from '../../blockchain/contracts/UserManagement.json';

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const userManagementAddress = process.env.USER_MANAGEMENT_ADDRESS;
const userManagementContract = new ethers.Contract(userManagementAddress, UserManagement.abi, provider);

export const registerUser = async (req: Request, res: Response) => {
  const { name, address } = req.body;
  // Ajoutez la logique pour interagir avec le smart contract ici
  res.send('User registered');
};

export const getUser = async (req: Request, res: Response) => {
  const { address } = req.params;
  // Ajoutez la logique pour interagir avec le smart contract ici
  res.send('User details');
};
