import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function ContactForm(props) {
  const {
    tel,
    errors,
    inputChange,
    validateType,
    handleNext
  } = props

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>Contact info</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="tel"
            name="tel"
            label="Phone Number"
            error={errors.isTelValid === false}
            helperText={errors.isTelValid === false ? "10-11 digits" : ""}
            fullWidth
            autoComplete="tel"
            type="tel"
            value={tel}
            onChange={inputChange}
            onBlur={validateType}
          />
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
          disabled={errors.isTelValid === true?false:true}
        >Next</Button>
      </div>
    </React.Fragment>
  );
}