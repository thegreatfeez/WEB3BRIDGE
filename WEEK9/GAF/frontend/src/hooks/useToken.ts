import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useWriteToken } from './specific/useWriteToken';
import { isAddress, parseUnits } from "ethers";

export interface Mint{
    mintAmount: number;
}

export const useToken = () => {
    const[amount, setAmount] = useState<Mint>();
    const[inputAmount, setInputAmount] = useState("");
    const[error, setError] = useState("");
    const[transferAmount, setTransferAmount] = useState("");
    const[transferRecipient, setTransferRecipient] = useState("");
    const[transferError, setTransferError] = useState("");

    const { mintToken, requestToken, transferToken } = useWriteToken();

    

    const handleMintToken = useCallback(async()=>{
        const amountValue = inputAmount.trim();
        if(!amountValue){
            setError("Amount Can't be Empty");
            return;
        }
        const parsedAmount = Number(amountValue);
        if(Number.isNaN(parsedAmount) || parsedAmount <= 0){
            setError("Enter a valid positive amount");
            return;
        }

        setError("");
        const amountInWei = parseUnits(amountValue, 18);
        const result = await mintToken(amountInWei);
        if(!result.ok){
            toast.error(result.error ?? "Mint failed");
            return;
        }

        if (result.event?.name === "Minted") {
            const to = result.event.args[1];
            const value = result.event.args[2];
            toast.success(`Minted ${String(value)} to ${String(to)}`);
        } else if (result.info) {
            toast.success(result.info);
        } else {
            toast.success("Minted successfully!");
        }

        setInputAmount("");
    },[inputAmount, mintToken])

    const handleRequestToken = useCallback(async()=>{
        const result = await requestToken();
        if(!result.ok){
            toast.error(result.error ?? "Request failed");
            return;
        }

        if (result.event?.name === "Claimed") {
            const user = result.event.args[0];
            const amount = result.event.args[1];
            toast.success(`Claimed ${String(amount)} for ${String(user)}`);
        } else if (result.info) {
            toast.success(result.info);
        } else {
            toast.success("Tokens claimed successfully!");
        }
    }, [requestToken])

    const handleTransferToken = useCallback(async()=>{
        const amountValue = transferAmount.trim();
        const recipientValue = transferRecipient.trim();

        if(!recipientValue){
            setTransferError("Recipient address is required");
            return;
        }
        if(!isAddress(recipientValue)){
            setTransferError("Enter a valid address");
            return;
        }
        if(!amountValue){
            setTransferError("Amount can't be empty");
            return;
        }
        const parsedAmount = Number(amountValue);
        if(Number.isNaN(parsedAmount) || parsedAmount <= 0){
            setTransferError("Enter a valid positive amount");
            return;
        }

        setTransferError("");
        const amountInWei = parseUnits(amountValue, 18);
        const result = await transferToken(recipientValue, amountInWei);
        if(!result.ok){
            toast.error(result.error ?? "Transfer failed");
            return;
        }

        if (result.event?.name === "Transfer") {
            const to = result.event.args[1];
            const value = result.event.args[2];
            toast.success(`Transferred ${String(value)} to ${String(to)}`);
        } else if (result.info) {
            toast.success(result.info);
        } else {
            toast.success("Transfer successful!");
        }

        setTransferAmount("");
        setTransferRecipient("");
    }, [transferAmount, transferRecipient, transferToken])

    return {
        inputAmount,
        amount,
        setInputAmount,
        error,
        setError,
        handleMintToken,
        handleRequestToken,
        transferAmount,
        setTransferAmount,
        transferRecipient,
        setTransferRecipient,
        transferError,
        handleTransferToken,
        setAmount
    }
}
