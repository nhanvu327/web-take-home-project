import React from 'react';
import TextField from 'material-ui/TextField';

const SuggestionInput = inputProps => {
  const { classes, ref, ...other } = inputProps;
  return (
    <TextField
      fullWidth
      required
      label="Add location"
      inputRef={ref}
      InputProps={{
        ...other
      }}
    />
  );
};

export default SuggestionInput;
