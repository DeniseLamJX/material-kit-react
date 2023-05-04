import {ethers} from "ethers"
import { Formik, Form } from 'formik';
import { useCallback, useState } from 'react';
import axios from "axios";
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

export const RetrieveIPFSInfo = () => {
  
  const [success, setSuccess] = useState();
  const [error, setError] = useState(null);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')

  const [dValues, setDValues]=useState([]);

  return (
    <div>
    <Formik 
      initialValues={{ ipfsAddress:""}}
      validator={() => ({})}
      onSubmit={async (values) => {
        const { ...data} =  values;
        console.log(data.ipfsAddress);
       
        const response = await axios
          .post("http://localhost:5000/retrieve", data.ipfsAddress)
          .catch((err) => {
            if (err && err.response) 
            setError(err.response.data.message);
            setSuccess(null);
            console.log("sent failed");
          })
          .then((res)=>{
            //console.log(res)
            console.log(res.data);
            console.log(res.data.firstName);
            setFirstName(res.data.firstName)
            setLastName(res.data.lastName)
            setEmail(res.data.email)
            setPhone(res.data.phone)
            setDob(res.data.dob)
            setCountry(res.data.country)
      })
    }}
    >

      {formik => (
        <Form>
        <Card>
        <CardHeader
          subheader= "Once message has been received, retrieve IPFS Data by entering the IPFS Hash below."
          title="Retrieve Candidate Info from IPFS"
        ></CardHeader>
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >

            <TextField className={styles.textfield}
              fullWidth
              label="IPFS Address"
              name="ipfsAddress"
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

    {firstName &&
      <Card>
          <CardContent>
            <div>First Name: {firstName}</div>
            <div>Last Name: {lastName}</div>
            <div>Phone Number: {phone}</div>
            <div>Email: {email}</div>
            <div>Date of Birth: {dob}</div>
            <div>Country: {country}</div>
          </CardContent>
          
      </Card>
    }
    
    </div>
  );
};

