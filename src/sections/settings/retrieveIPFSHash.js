import { useCallback, useState } from 'react';
//import axios from "axios";
import {ethers} from "ethers"
import { Formik, Form } from 'formik';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
} from '@mui/material';
import styles from "../../styles/textfield.module.css"


export const RetrieveIPFSHash = ({conHash, retrieveAdd}) => {

    const [ipfsHash, setIpfsHash] = useState();
    const [hashSuccess, setHashSuccess] = useState('');
    const [sendSuccess, setSendSuccess] = useState('');
    const [retrieveAddSuccess, setRetrieveAddSuccess] = useState('');
    const [transactionHash, setTransactionHash] = useState('');

    const CCMABI = require("../../ABI/CrossChainContractABI.json")
    const StoringHashABI = require("../../ABI/storingHashABI.json")
    const CCMFantomAddress = "0x54A7457eFcBd91d40697F71e0e8C965F236f52f5"
    const destChainId = "10126";

    console.log(conHash)
    async function requestAccount() {
        await window.ethereum.request({method: 'eth_requestAccounts'});
    }
    async function callIPFS(){
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            await ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log("checkpoint3")
            const contract = new ethers.Contract("0x91ff09e62b31df5e98546c2a181d69889Bb4a2E3", StoringHashABI, provider)
            const IpfsHash = await contract.getHash()
            console.log(IpfsHash)
    
            setIpfsHash(IpfsHash)
            setHashSuccess("ok")
      }
    }
      async function sendMessage(){
        if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        await ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("ok")

        const CCMcontract = new ethers.Contract(CCMFantomAddress, CCMABI, signer)
        console.log("ok")

        const sendMessage = await CCMcontract.send(ipfsHash, {gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 1000000})
        console.log(sendMessage)
        console.log(sendMessage.hash)
        setTransactionHash(sendMessage.hash)
        setSendSuccess("ok")

    }
    }

    async function setTrustedAdd(){
        if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        await ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("ok")
        const CCMcontract = new ethers.Contract(CCMFantomAddress, CCMABI, signer)
        const sendMessage = await CCMcontract.trustAddress(retrieveAdd, {gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 1000000})
        console.log(sendMessage)
        setRetrieveAddSuccess("ok")
    }
    }
    
    return(
        <div>
            <Card>
                <CardHeader
                    subheader="Click to retrieve the IPFS hash"
                    title="Step 2: Retrieve IPFS Hash from blockchain"
                />
                {hashSuccess==('ok') &&
                    <div className={styles.ipfsLink}>Success!</div>
                }
                <CardContent>
                    <Button variant="contained" onClick={callIPFS}>
                    Submit
                    </Button>
                </CardContent>
            </Card>

            {hashSuccess==('ok') &&
                <Card>
                    <CardHeader
                        subheader="Set retrieve address for the crosschain"
                        title="Step 3: Set Retrieve Address"
                    />
                    {retrieveAddSuccess==('ok') &&
                    <div className={styles.ipfsLink}>Success!</div>
                }
                    <CardContent>
                        <Button variant="contained" onClick={setTrustedAdd}>
                        Submit
                        </Button>
                    </CardContent>
                </Card>
            }
            {retrieveAddSuccess==('ok') &&
            <Card>
                <CardHeader
                    subheader="Click to request the desired IPFS Hash. The information will be sent 
                    cross-chain from the Fantom Network to the Moonbeam Network."
                    title="Step 4: Crosschain the IPFS Hash"
                />
                {sendSuccess=='ok' &&
                    <div className={styles.ipfsLink}>
                        <div>Transaction Hash: {transactionHash}</div>
                        <div>Information request successful. Please check back in about an hour. 
                            You can enter the transaction hash given in the following link to check if the
                            transaction is complete: https://testnet.layerzeroscan.com/
                        </div>
                    </div>
                }
                <CardContent>
                    <Button variant="contained" onClick={sendMessage}>
                    Submit
                    </Button>
                </CardContent>
            </Card>
}
        </div>
        
    );
};