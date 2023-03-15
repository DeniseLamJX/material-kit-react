import {ethers} from "ethers"
import { useState } from "react";
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

export const StoreHashContract = ({hash}) =>{

    const storeFactoryABI = require("../../ABI/storeFactoryABI.json")
    const storeFactoryAddress = "0x6AbAdea7c4c1dBac9E07CB41b0E125c3d42eE93c"

    const [contractHash, setContractHash]= useState("")
    const [uploadDone, setUploadDone]=useState("")

    async function requestAccount() {
        await window.ethereum.request({method: 'eth_requestAccounts'});
    }

    async function deployHashContract(){
        // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        await ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(storeFactoryAddress, storeFactoryABI, signer)
        const newStore = await contract.createStore(hash)
        console.log(newStore)
        setUploadDone("ok");
    }
}
    async function checkAllStores(){
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            await ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(storeFactoryAddress, storeFactoryABI, provider)
            const allStore = await contract.allStores();
            console.log("newStore: ", allStore);
            console.log(allStore[allStore.length-1])
            setContractHash(allStore[allStore.length-1])
    }


}
    

    return(
        <div>
            <Card>
            <CardContent sx={{ pt: 0 }}>
                <CardHeader
                    title="Step 2: Uploading the hash to the Blockchain "
                    subheader="Click the button below!"
                >
                </CardHeader>
                <Button onClick={deployHashContract} className={styles.submitButtons} sx={{ justifyContent: 'flex-end' }}>
                    Upload Hash
                </Button>
                    
                </CardContent>
        </Card>

        {uploadDone=='ok' &&
            <Card>
                <CardContent sx={{ pt: 0 }}>
                    <CardHeader
                        title="Storage Complete! "
                        subheader="Click the button below to reveal Contract Hash"
                    >
                    </CardHeader>
                    
                    <Button onClick={checkAllStores} className={styles.submitButtons} sx={{ justifyContent: 'flex-end' }}>
                        Reveal Hash
                    </Button>
                    {contractHash && <div className={styles.ipfsLink}>{contractHash}</div> }
                    </CardContent>
            </Card>
        }

        
            
        </div>
        
    )
    
}