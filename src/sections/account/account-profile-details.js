import { useCallback, useState } from 'react';
import axios from "axios";
import { Formik, Form } from 'formik';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import styles from "../../styles/textfield.module.css"
import {TextField} from './TextField.js';
import {StoreHashContract} from "./StoreHashContract.js"

export const AccountProfileDetails = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    country: ''
  });

  const [ipfsHash, setIpfsHash] = useState(0)
  
  const [success, setSuccess] = useState();
  const [error, setError] = useState(null);

  return (
    <div>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        country: ''
      }}
      validator={() => ({})}
      onSubmit={ async (values) => {
        const { ...data} =  values;
        console.log(data);
        const response = await axios
          .post("http://localhost:5000", data)
          .catch((err) => {
            if (err && err.response) 
            setError(err.response.data.message);
            setSuccess(null);
            console.log("sent failed");
          })
          .then((res)=>{
            console.log(res)
            setIpfsHash(res.data)
            setSuccess("ok");
            console.log(success);
          });

      //     if (response && response.data) {
      //       setError(null);
      //       setSuccess(response.data.message);
      //       console.log("sent success");

      // }
      }}
    >
      {formik => (
      <Form>
      <Card>
        <CardHeader
          subheader="Fill test the change the below fields with the candidate's information"
          title=""
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField className ={styles.textfield}
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onInput={e => setValues(e.target.value)}
                  required
                  
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField className ={styles.textfield}
                  fullWidth
                  label="Last name"
                  name="lastName"
                  required
                  />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField className ={styles.textfield}
                  fullWidth
                  label="Email Address"
                  name="email"
                 required 
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField className ={styles.textfield}
                  fullWidth
                  label="Phone Number"
                  name="phone" 
                  type="number"
                  required
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField className ={styles.textfield}
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  required
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField className ={styles.textfield}
                  fullWidth
                  label="Country"
                  name="country"
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Save details
          </Button>
        </CardActions>
      </Card>
      </Form>
      )}
    </Formik>

    {success=='ok' &&
    <div>
      <Card>
        <CardContent sx={{ pt: 0 }}>
            <CardHeader
                title="IPFS Upload Successful"
                subheader="Click on the following link if you wish to view your record in IPFS"
            >
            </CardHeader>
            <div className = {styles.ipfsLink}>https://fypipfskyc.infura-ipfs.io/ipfs/{ipfsHash}</div>
        </CardContent>
    </Card>
    <StoreHashContract hash={ipfsHash}></StoreHashContract>
    </div>
    }

    


    
    </div>
  );
};
