"use client";

import { useEffect, useState } from "react";
import { ArgentTMA, SessionAccountInterface } from "@argent/tma-wallet";
import { Account } from "starknet";

const argentTMA = ArgentTMA.init({
  environment: "sepolia",
  appName: "Oxland",
  appTelegramUrl: "https://t.me/oxLand_bot?game=oxLand",
  sessionParams: {
    allowedMethods: [
      {
        contract:
          "0x036133c88c1954413150db74c26243e2af77170a4032934b275708d84ec5452f",
        selector: "increment",
      },
    ],
    validityDays: 90,
  },
});

export default function ArgentWallet() {
  const [account, setAccount] = useState<SessionAccountInterface | undefined>();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    argentTMA
      .connect()
      .then((res) => {
        if (!res) {
          setIsConnected(false);
          return;
        }

        const { account: newAccount } = res;

        if (newAccount.getSessionStatus() !== "VALID") {
          setAccount(newAccount);
          setIsConnected(false);
          return;
        }

        setAccount(newAccount);
        setIsConnected(true);
      })
      .catch((error) => {
        console.error("Connection error:", error);
        setIsConnected(false);
      });
  }, []);

  const handleConnectButton = async () => {
    await argentTMA.requestConnection();
  };

  const handleClearSessionButton = async () => {
    await argentTMA.clearSession();
    setAccount(undefined);
    setIsConnected(false);
  };

  return (
    <div>
      {!isConnected && (
        <button onClick={handleConnectButton}>Connect Wallet</button>
      )}

      {isConnected && (
        <>
          <h1>Wallet Connected</h1>
          <p>
            Account address: <code>{account?.address}</code>
          </p>
          <button onClick={handleClearSessionButton}>Clear Session</button>
        </>
      )}
    </div>
  );
}
