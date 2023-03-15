import { useCallback, useState, useEffect } from 'react';
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

export const IpfsConfirmation = () => {

    const [data, setData] = useState(0);
    

    return(
        <div>
            <Card>
            <CardContent sx={{ pt: 0 }}>
                <CardHeader
                    title={title}
                    subheader={subheader}
                >
                </CardHeader>
            </CardContent>
            </Card>
        </div>
    );
};