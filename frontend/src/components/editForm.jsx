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

export default function EditForm(props) {
  const classes = useStyles();
  const [edit_data, setEdit_data] = useState(props.student_data);

  return (
    <div>
      <form>
        <TextField
          className={classes.input_box}
          id="outlined-error-helper-text"
          label="Name"
          type="text"
          required
          value={edit_data.name}
          onChange={(e) => setEdit_data({ ...edit_data, name: e.target.value })}
          variant="outlined"
        />
        <br />
        <TextField
          className={classes.input_box}
          label="Blood Group"
          id="outlined-error-helper-text"
          required
          type="email"
          value={edit_data.blood_group}
          onChange={(e) =>
            setEdit_data({ ...edit_data, blood_group: e.target.value })
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
          value={edit_data.email}
          onChange={(e) =>
            setEdit_data({ ...edit_data, email: e.target.value })
          }
          variant="outlined"
        />
        <br />
        <TextField
          className={classes.input_box}
          label="City"
          required
          id="outlined-error-helper-text"
          type="Text"
          value={edit_data.city}
          onChange={(e) => setEdit_data({ ...edit_data, city: e.target.value })}
          variant="outlined"
        />
        <br />
        <TextField
          className={classes.input_box}
          label="Image Link"
          required
          id="outlined-error-helper-text"
          type="text"
          value={edit_data.image_link}
          onChange={(e) =>
            setEdit_data({ ...edit_data, image_link: e.target.value })
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
            value={edit_data.gender}
            onChange={(e) =>
              setEdit_data({ ...edit_data, gender: e.target.value })
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
          onClick={() => props.handle_edit(edit_data)}
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
