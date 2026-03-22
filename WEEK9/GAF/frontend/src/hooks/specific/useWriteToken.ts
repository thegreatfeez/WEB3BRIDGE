import { useAppKitAccount } from "@reown/appkit/react";
import { useGAFContract } from "../useContract";
import { useCallback, useState } from "react";
import { ErrorDecoder } from "ethers-decode-error";
import { formatUnits } from "ethers";

const errorDecoder = ErrorDecoder.create();

export type WriteEvent = {
    name: string;
    args: readonly unknown[];
};

export type WriteResult = {
    ok: boolean;
    event?: WriteEvent;
    info?: string;
    error?: string;
};

export const useWriteToken = () => { 
    const GAFContract = useGAFContract(true);
    const {address} = useAppKitAccount();
    const [isMinting, setIsMinting] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);
    const [isTransferring, setIsTransferring] = useState(false);

    const getEventArgs = useCallback((receipt: any, eventName: string) => {
        if (!GAFContract) return null;
        for (const log of receipt?.logs ?? []) {
            try {
                const parsed = GAFContract.interface.parseLog(log);
                if (parsed?.name === eventName) return parsed.args;
            } catch {
                // not this contract's event
            }
        }
        return null;
    }, [GAFContract]);

    const mintToken = useCallback(async (amount: bigint) : Promise<WriteResult> => {
        if(!address){
            return { ok: false, error: "Wallet not connected!" };
        }
        if(!GAFContract){
            return { ok: false, error: "Todo contract not found!" };
        }
        try {
            setIsMinting(true);
            const createTx = await GAFContract.mint(amount);
            const receipt = await createTx.wait();
            const Minted = getEventArgs(receipt, "Minted");
            if (Minted) {
                return {
                    ok: receipt.status === 1,
                    event: { name: "Minted", args: Minted },
                };
            }
            return {
                ok: receipt.status === 1,
                info: `Successfully minted ${formatUnits(amount, 18)} token(s)!`,
            };
        } catch (error) {
            let message = "Mint failed";
            try {
                const decodedError = await errorDecoder.decode(error as Error);
                const reason = decodedError?.reason;
                if (reason && reason.startsWith("No ABI for custom error")) {
                    message = "Transaction reverted (unknown custom error).";
                } else {
                    message = reason ?? message;
                }
            } catch {
                // fallback to default message
            }
            return { ok: false, error: message };
        } finally {
            setIsMinting(false);
        }
    }, [address, GAFContract, getEventArgs]);



    const requestToken = useCallback(async (): Promise<WriteResult> => {
        if(!address){
            return { ok: false, error: "Wallet not connected!" };
        }
        if(!GAFContract){
            return { ok: false, error: "Todo contract not found!" };
        }
        try {
            setIsRequesting(true);
            const tx = await GAFContract.requestToken();
            const receipt = await tx.wait();
            const claimed = getEventArgs(receipt, "Claimed");
            if (claimed) {
                return {
                    ok: receipt.status === 1,
                    event: { name: "Claimed", args: claimed },
                };
            }
            const claimAmount = await GAFContract.CLAIM_AMOUNT();
            return {
                ok: receipt.status === 1,
                info: `Successfully minted ${claimAmount.toString()} token(s)!`,
            };
        } catch (error) {
            let message = "Request failed";
            try {
                const decodedError = await errorDecoder.decode(error as Error);
                const reason = decodedError?.reason;
                if (reason && reason.startsWith("No ABI for custom error")) {
                    message = "Transaction reverted (unknown custom error).";
                } else {
                    message = reason ?? message;
                }
            } catch {
                // fallback to default message
            }
            return { ok: false, error: message };
        } finally {
            setIsRequesting(false);
        }
    }, [address, GAFContract, getEventArgs]);

    const transferToken = useCallback(async (to: string, amount: bigint): Promise<WriteResult> => {
        if(!address){
            return { ok: false, error: "Wallet not connected!" };
        }
        if(!GAFContract){
            return { ok: false, error: "Todo contract not found!" };
        }
        try {
            setIsTransferring(true);
            const tx = await GAFContract.transfer(to, amount);
            const receipt = await tx.wait();
            const transfer = getEventArgs(receipt, "Transfer");
            if (transfer) {
                return {
                    ok: receipt.status === 1,
                    event: { name: "Transfer", args: transfer },
                };
            }
            return {
                ok: receipt.status === 1,
                info: "Transfer completed successfully.",
            };
        } catch (error) {
            let message = "Transfer failed";
            try {
                const decodedError = await errorDecoder.decode(error as Error);
                const reason = decodedError?.reason;
                if (reason && reason.startsWith("No ABI for custom error")) {
                    message = "Transaction reverted (unknown custom error).";
                } else {
                    message = reason ?? message;
                }
            } catch {
                // fallback to default message
            }
            return { ok: false, error: message };
        } finally {
            setIsTransferring(false);
        }
    }, [address, GAFContract, getEventArgs]);

    return { mintToken, requestToken, transferToken, isMinting, isRequesting, isTransferring };
}
