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

export const RetrieveCandidate = () => {

  const [contractHash, setContractHash] = useState('');

  return(
    <div>
    <Formik 
      initialValues={{ retrieveAddress:""}}
      validator={() => ({})}
      onSubmit={async (values) => {
        const json = values.retrieveAddress
        console.log(json)
        setContractHash(json)
        
    }}
    >

      {formik => (
        <Form>
        <Card>
        <CardHeader
          subheader="Please check if your hash transaction has been completed at https://testnet.layerzeroscan.com/ before attempting to retrieve the hash. "
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
    </div>
  )
};

