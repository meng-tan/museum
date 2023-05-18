import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

export default function ContactForm(props) {
  const { tel, errors, inputChange, validateType, handleNext } = props;

  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Contact info
      </Typography>
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
          disabled={errors.isTelValid !== true}
        >
          Next
        </Button>
      </div>
    </>
  );
}
