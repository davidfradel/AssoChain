import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = parseEther("0.001");

const UserManagementModule = buildModule("UserManagementModule", (m) => {
  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const lock = m.contract("UserManagement", [unlockTime], {
    value: lockedAmount,
  });

  return { lock };
});

export default UserManagementModule;