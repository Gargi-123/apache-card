import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  login_paper: {
    width: "600px",
    margin: "50px auto",
    padding: "30px",
  },
  input_box: {
    width: "70%",
    margin: "10px",
  },
}));

export default function AddForm(props) {
  const classes = useStyles();
  const [add_data, setAdd_data] = useState({});

  return (
    <div>
      <form>
        <TextField
          className={classes.input_box}
          id="outlined-error-helper-text"
          label="Name"
          type="text"
          required
          value={add_data.name}
          onChange={(e) => setAdd_data({ ...add_data, name: e.target.value })}
          variant="outlined"
        />
        <br />
        <TextField
          className={classes.input_box}
          label="Blood Group"
          id="outlined-error-helper-text"
          required
          type="email"
          value={add_data.blood_group}
          onChange={(e) =>
            setAdd_data({ ...add_data, blood_group: e.target.value })
          }
          placeholder="Email"
          variant="outlined"
        />
        <br />
        <TextField
          className={classes.input_box}
          label="Email"
          required
          id="outlined-error-helper-text"
          type="email"
          value={add_data.email}
          onChange={(e) => setAdd_data({ ...add_data, email: e.target.value })}
          variant="outlined"
        />
        <br />
        <TextField
          className={classes.input_box}
          label="City"
          required
          id="outlined-error-helper-text"
          type="Text"
          value={add_data.city}
          onChange={(e) => setAdd_data({ ...add_data, city: e.target.value })}
          variant="outlined"
        />
        <br />
        <TextField
          className={classes.input_box}
          label="Image Link"
          required
          id="outlined-error-helper-text"
          type="text"
          value={add_data.image_link}
          onChange={(e) =>
            setAdd_data({ ...add_data, image_link: e.target.value })
          }
          variant="outlined"
        />
        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            className={classes.input_box}
            aria-label="gender"
            name="Gender"
            value={add_data.gender}
            onChange={(e) =>
              setAdd_data({ ...add_data, gender: e.target.value })
            }
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={() => props.handle_add(add_data)}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<CancelIcon />}
          onClick={props.set_status}
        >
          Cancle
        </Button>
      </form>
    </div>
  );
}
