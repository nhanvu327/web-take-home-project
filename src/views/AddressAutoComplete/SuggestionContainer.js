import React from 'react';
import Paper from 'material-ui/Paper';

const SuggestionContainer = options => {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} elevation={4} className="react-autosuggest__suggestions__wrapper" square>
      {children}
    </Paper>
  );
};

export default SuggestionContainer;
