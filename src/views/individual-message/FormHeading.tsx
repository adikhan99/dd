import { Grid } from '@mui/material'
import React from 'react'

const FormHeading: React.FC<{ campusName: string }> = ({ campusName }) => {
    return (
        <Grid container className="top-section" style={{ backgroundColor: '#273b4a', padding: '20px', color: 'white', borderRadius: '5px', alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid item xs={12} md={8} style={{ marginBottom: '0px', textAlign: 'left' }}>
                <h1 className="form-heading" style={{ margin: '0', fontSize: '1.5rem' }}>
                    Send an Individual Message - {campusName}
                </h1>
            </Grid>
        </Grid>
    )
}

export default FormHeading