import { useMemo } from "react";
import { Contract } from "ethers";
import { getAddress } from "ethers";
import useRunners from "./useRunner";
import { GAF_TOKEN_ABI } from "../ABI/GAFToken";

export const useGAFContract = (withSigner = false) => {
  const { readOnlyProvider, signer } = useRunners();

  return useMemo(() => {
    if (withSigner) {
      if (!signer) return null;
      return new Contract(
        getAddress(import.meta.env.VITE_TODO_CONTRACT_ADDRESS),
        GAF_TOKEN_ABI,
        signer
      );
    }
    return new Contract(
      getAddress(import.meta.env.VITE_TODO_CONTRACT_ADDRESS),
      GAF_TOKEN_ABI,
      readOnlyProvider
    );
  }, [readOnlyProvider, signer, withSigner]);
};
