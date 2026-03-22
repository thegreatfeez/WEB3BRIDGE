import { useAppKitAccount } from "@reown/appkit/react";
import { useGAFContract } from "../useContract";
import { useCallback, useEffect, useState } from "react";
import { getAddress, ZeroAddress } from "ethers";

export type TokenReadState = {
  totalSupply: bigint | null;
  maxSupply: bigint | null;
  claimAmount: bigint | null;
  cooldown: bigint | null;
  owner: string | null;
  balance: bigint | null;
  nextClaimTime: bigint | null;
  claimHistory: Array<{
    recipient: string;
    amount: bigint;
    txHash: string;
    blockNumber: number;
  }>;
  mintHistory: Array<{
    recipient: string;
    amount: bigint;
    txHash: string;
    blockNumber: number;
  }>;
  isLoading: boolean;
  refresh: () => Promise<void>;
};

export const useReadToken = (): TokenReadState => {
  const { address } = useAppKitAccount();
  const GAFContract = useGAFContract(false);

  const [totalSupply, setTotalSupply] = useState<bigint | null>(null);
  const [maxSupply, setMaxSupply] = useState<bigint | null>(null);
  const [claimAmount, setClaimAmount] = useState<bigint | null>(null);
  const [cooldown, setCooldown] = useState<bigint | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [balance, setBalance] = useState<bigint | null>(null);
  const [nextClaimTime, setNextClaimTime] = useState<bigint | null>(null);
  const [claimHistory, setClaimHistory] = useState<
    Array<{ recipient: string; amount: bigint; txHash: string; blockNumber: number }>
  >([]);
  const [mintHistory, setMintHistory] = useState<
    Array<{ recipient: string; amount: bigint; txHash: string; blockNumber: number }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!GAFContract) return;
    try {
      setIsLoading(true);
      const [
        totalSupplyValue,
        maxSupplyValue,
        claimAmountValue,
        cooldownValue,
        ownerValue,
      ] = await Promise.all([
        GAFContract.totalSupply(),
        GAFContract.MAX_SUPPLY(),
        GAFContract.CLAIM_AMOUNT(),
        GAFContract.COOLDOWN(),
        GAFContract.owner(),
      ]);

      setTotalSupply(totalSupplyValue);
      setMaxSupply(maxSupplyValue);
      setClaimAmount(claimAmountValue);
      setCooldown(cooldownValue);
      setOwner(ownerValue);

      const runner = GAFContract.runner as unknown as {
        getBlockNumber?: () => Promise<number>;
      };
      if (runner?.getBlockNumber) {
        const latestBlock = await runner.getBlockNumber();
        const fromBlock = Math.max(latestBlock - 50_000, 0);
        const contractAddress = getAddress(import.meta.env.VITE_TODO_CONTRACT_ADDRESS);

        const mintLogs = await GAFContract.queryFilter(
          GAFContract.filters.Transfer(ZeroAddress, contractAddress),
          fromBlock,
          "latest"
        );
        const mints = mintLogs
          .map((log) => {
            try {
              const parsed = GAFContract.interface.parseLog(log);
              if (!parsed) return null;
              return {
                recipient: parsed.args[1] as string,
                amount: parsed.args[2] as bigint,
                txHash: log.transactionHash,
                blockNumber: log.blockNumber,
              };
            } catch {
              return null;
            }
          })
          .filter((item): item is { recipient: string; amount: bigint; txHash: string; blockNumber: number } => !!item)
          .sort((a, b) => b.blockNumber - a.blockNumber)
          .slice(0, 5);
        setMintHistory(mints);

        const claimedLogs = await GAFContract.queryFilter(
          GAFContract.filters.Claimed(),
          fromBlock,
          'latest'
        );
        const history = claimedLogs
          .map((log) => {
            try {
              const parsed = GAFContract.interface.parseLog(log);
              if (!parsed) return null;
              return {
                recipient: parsed.args[0] as string,
                amount: parsed.args[1] as bigint,
                txHash: log.transactionHash,
                blockNumber: log.blockNumber,
              };
            } catch {
              return null;
            }
          })
          .filter((item): item is { recipient: string; amount: bigint; txHash: string; blockNumber: number } => !!item)
          .sort((a, b) => b.blockNumber - a.blockNumber);
        setClaimHistory(history);
      }

      if (address) {
        const [balanceValue, nextClaimValue] = await Promise.all([
          GAFContract.balanceOf(address),
          GAFContract.nextClaimTime(address),
        ]);
        setBalance(balanceValue);
        setNextClaimTime(nextClaimValue);
      } else {
        setBalance(null);
        setNextClaimTime(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [GAFContract, address]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    totalSupply,
    maxSupply,
    claimAmount,
    cooldown,
    owner,
    balance,
    nextClaimTime,
    claimHistory,
    mintHistory,
    isLoading,
    refresh,
  };
};