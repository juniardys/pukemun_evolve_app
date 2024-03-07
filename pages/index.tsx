import { ConnectWallet, ThirdwebNftMedia, Web3Button, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { CONTRACT_ADDRESS } from "../constants/common.constants";

const Home: NextPage = () => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const address = useAddress();

  const { data: nfts } = useOwnedNFTs(contract, address);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className="py-6">
          <ConnectWallet />
        </div>
        <hr />
        <div className="py-4 flex items-center justify-center">
          {nfts?.map((nft) => (
            <div key={nft.metadata.id.toString()} className="flex flex-col border-white border-2 rounded-md p-2">
              <ThirdwebNftMedia metadata={nft.metadata} />
              <p className="text-center">{nft.metadata.name} (x{nft.quantityOwned})</p>
            </div>
          ))}
        </div>
        <hr />
        <div className="py-4 flex items-center justify-center gap-2">
          <Web3Button
            contractAddress={CONTRACT_ADDRESS}
            className="bg-green-500 text-white"
            action={(contract) => contract.erc1155.claim(0, 1)}
          >Claim a Squirtle</Web3Button>
          <Web3Button
            contractAddress={CONTRACT_ADDRESS}
            className="bg-red-500 text-white"
            action={(contract) => contract.call('evolve')}
          >Evolve</Web3Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
