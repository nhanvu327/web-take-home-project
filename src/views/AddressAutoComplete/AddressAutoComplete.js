import React from 'react';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Icon from 'material-ui/Icon';
import classnames from 'classnames';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import './AddressAutoComplete.css';
import { findSuburb, findState } from '../../util/helpers/ProjectHelpers';

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      inputRef={ref}
      InputProps={{
        ...other
      }}
    />
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.description, query);
  const parts = parse(suggestion.description, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.description;
}

class AddressAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      searchText: ''
    };

    const { google } = window;
    this.geocoder = new google.maps.Geocoder();
    this.service = new google.maps.places.AutocompleteService(null);
  }

  updateInput = (event, { newValue }) => {
    this.setState({
      searchText: newValue
    });
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.service.getPlacePredictions(
      {
        input: value
      },
      suggestions => {
        if (suggestions) {
          this.setState({ suggestions });
        }
      }
    );
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleSelectSuggestion = (event, { suggestion }) => {
    this.geocoder.geocode({ placeId: suggestion.place_id }, (results, status) => {
      if (results && results.length >= 1) {
        this.props.selectAddress({
          ...suggestion,
          formatted_address: results[0].formatted_address,
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
          suburb: findSuburb(results[0].address_components),
          state: findState(results[0].address_components),
          status
        })
      }
    });
  }

  render() {
    return (
      <Autosuggest
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionSelected={this.handleSelectSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'Add location',
          value: this.state.searchText,
          onChange: this.updateInput
        }}
      />
    );
  }
}

export default AddressAutoComplete;
