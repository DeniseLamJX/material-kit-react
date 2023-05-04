import {ethers} from "ethers"
import { Formik, Form } from 'formik';
import { useCallback, useState } from 'react';
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
import { RetrieveIPFSInfo } from "./company-card";

export const RetrieveCandidate = () => {

  const [contractHash, setContractHash] = useState('');
  const [message, setMessage] = useState('');

  const CCMABI = require("../../ABI/CrossChainContractABI.json")

  async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts'});
  }

  async function retrieveMessage(){
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      await ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("working")
      console.log(contractHash)
      const contract = new ethers.Contract(contractHash, CCMABI, provider)
      const message = await contract.checkMessage()
      console.log(message)
      setMessage(message)
    }
  }


  return(
    <div>
    <Formik 
      initialValues={{ retrieveAddress:""}}
      validator={() => ({})}
      onSubmit={async (values) => {
        const json = values.retrieveAddress
        console.log(json)
        setContractHash(json)
        retrieveMessage()
    }}
    >

      {formik => (
        <Form>
        <Card>
        <CardHeader
          subheader="Ensure that your Metamask is switched to the account and network that was used to deploy the retrieve contract. "
          title="Enter Retrieve Contract Address"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >

            <TextField className={styles.textfield}
              fullWidth
              label="Retrieve Contract Address"
              name="retrieveAddress"
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
    {message &&
    <div>
      <Card>
        <CardHeader
          subheader="Message retrieve success!"
        ></CardHeader>
        <CardContent>
          <div>
            Message obtained: {message}
          </div>
        </CardContent>
      </Card>

      <RetrieveIPFSInfo></RetrieveIPFSInfo>
     </div>
    }
     </div>
  )
};

