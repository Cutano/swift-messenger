import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function PasswordForm(props) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Password Settings
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        autoComplete="password"
                        variant="standard"
                        value={props.password}
                        onChange={props.onPasswordChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="confirmedPassword"
                        label="ConfirmedPassword"
                        type="password"
                        fullWidth
                        autoComplete="no"
                        variant="standard"
                        value={props.confirmedPassword}
                        onChange={props.onConfirmedPasswordChange}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
