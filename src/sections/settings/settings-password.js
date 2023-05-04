import { useCallback, useState } from 'react';
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
  const [retrieveAddress, setRetrieveAddress] = useState("");
  const [ipfsHash, setIpfsHash] = useState();
  const [hashSuccess, setHashSuccess] = useState('');
  const [storeConSuccess, setStoreConSuccess] = useState('')

  // const [values, setValues] = useState({
  //   conHash:''
  // });

  async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts'});
}


  return (
    <div>
    <Formik 
      initialValues={{conHash:"", retrieveAddress:""}}
      validator={() => ({})}
      onSubmit={async (values) => {
        const json = values.conHash
        const json1 = values.retrieveAddress
       // console.log(json)
        setContractHash(json)
        console.log(contractHash)
        setRetrieveAddress(json1)
        setStoreConSuccess("ok")
    }}
    >

      {formik => (
        <Form>
        <Card>
        <CardHeader
          subheader="Please enter the candidate contract address and the address of the retrieve contract which was provided to you"
          title="Step 1: Enter Addresses"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField className={styles.textfield}
              fullWidth
              label="Candidate Contract Address"
              name="conHash"
              required
            />

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

    {storeConSuccess=="ok" &&
      <RetrieveIPFSHash conHash = {contractHash} retrieveAdd={retrieveAddress}></RetrieveIPFSHash>
      }

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
