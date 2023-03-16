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


export const RetrieveIPFSHash = ({conHash}) => {

    const [ipfsHash, setIpfsHash] = useState();
    const [hashSuccess, setHashSuccess] = useState('');

    const CCMABI = require("../../ABI/CrossChainMessaging.json")
    const StoringHashABI = require("../../ABI/storingHashABI.json")
    const CCMAddress = "0x0f6Df6a4B8D4E4c48b9FCDbFFE5f4A0F395Bdf9e"
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

        const CCMcontract = new ethers.Contract(CCMAddress, CCMABI, signer)
        console.log("ok")

        const sendMessage = await CCMcontract.sendMessage("moonbeam-alpha", ipfsHash)
        console.log(sendMessage)

    }
    }
    
    return(
        <div>
            <Card>
                <CardHeader
                    subheader="Click to retrieve the IPFS hash"
                    title="Step 2: Retrieve IPFS Hash from blockchain"
                />
                
                <CardContent>
                    <Button variant="contained" onClick={callIPFS}>
                    Submit
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader
                    subheader="Click to crosschain the IPFS hash to the Moonbeam Network"
                    title="Step 3: Crosschain the IPFS Hash"
                />
                
                <CardContent>
                    <Button variant="contained" onClick={sendMessage}>
                    Submit
                    </Button>
                </CardContent>
            </Card>
        </div>
        
    );
};