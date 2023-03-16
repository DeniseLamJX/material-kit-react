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

import { TextField } from 'src/components/TextField';
import styles from "../../styles/textfield.module.css"
import { RetrieveIPFSHash } from './retrieveIPFSHash';

export const SettingsPassword = () => {
  const [contractHash, setContractHash] = useState('');
  const [ipfsHash, setIpfsHash] = useState();
  const [hashSuccess, setHashSuccess] = useState('');
  const [storeConSuccess, setStoreConSuccess] = useState('')

  const [values, setValues] = useState({
    conHash:''
  });

  async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts'});
}

  const CCMABI = require("../../ABI/CrossChainMessaging.json")
  const StoringHashABI = require("../../ABI/storingHashABI.json")
  const CCMAddress = "0x0f6Df6a4B8D4E4c48b9FCDbFFE5f4A0F395Bdf9e"
  const destChainId = 10126

  // async function sendMessage(){
  //   if (typeof window.ethereum !== "undefined") {
  //     await requestAccount();
  //     await ethereum.request({ method: 'eth_requestAccounts' })
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();

  //     const CCMcontract = new ethers.Contract(CCMAddress, CCMABI, signer)
  //     const sendMessage = await CCMcontract.sendMessage(destChainId, ipfsHash)
  //     console.log(sendMessage)

  // }
// }

  //   async function callIPFS(){
  //     if (typeof window.ethereum !== "undefined") {
  //       await requestAccount();
  //       await ethereum.request({ method: 'eth_requestAccounts' });
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const contract = new ethers.Contract(contractHash, StoringHashABI, provider)
  //       // const allStore = await contract.allStores();
  //       // console.log("newStore: ", allStore);
  //       // console.log(allStore[allStore.length-1])
  //       // setContractHash(allStore[allStore.length-1])
  //   }
  // }


  return (
    <div>
    <Formik 
      initialValues={{conHash:" "}}
      validator={() => ({})}
      onSubmit={async (values) => {
        const json = values.conHash
        console.log(json)
        setContractHash(json)
        setStoreConSuccess("ok")
    }}
    >

      {formik => (
        <Form>
        <Card>
        <CardHeader
          subheader="Please Enter The Address of the Contract Containing the IPFS Hash"
          title=""
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField className={styles.textfield}
              fullWidth
              label="Contract Hash"
              name="conHash"
              required
              
            />
        
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Submit
          </Button>
        </CardActions>
      </Card>
      </Form>
      )}
      
    </Formik>

    <RetrieveIPFSHash conhash = {contractHash}></RetrieveIPFSHash>
    
    {/* {storeConSuccess=="ok" &&
      <Card>
      <CardHeader
        subheader="Retrieve the IPFS hash from smart contract"
        title="Step 1: Retrieve the Hash"
      />
      
      <CardContent>
        <Button variant="contained" onClick={callIPFS}>
          Submit
        </Button>
      </CardContent>
      
      
        
    </Card>

    {/* } */}

    {/* {hashSuccess=="ok" &&
      <Card>
      <CardHeader
        subheader="Retrieve the IPFS hash via crosschain mechanism"
        title="Step 2: Crosschain the Hash"
      />
      
      <CardContent>
        <Button variant="contained" onclick={sendMessage}>
          Submit
        </Button>
      </CardContent>
      
      
        
    </Card>

    }  */}

    </div>
  );
};
