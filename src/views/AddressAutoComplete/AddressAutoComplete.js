import React from 'react';
import Autosuggest from 'react-autosuggest';
import SuggestionItem from './SuggestionItem';
import SuggestionContainer from './SuggestionContainer';
import SuggestionInput from './SuggestionInput';
import {
  findSuburb,
  findState,
  getSuggestionValue
} from '../../util/helpers/ProjectHelpers';
import './AddressAutoComplete.css';

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
        input: value,
        componentRestrictions: {
          country: ['au', 'us']
        }
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
    this.geocoder.geocode(
      { placeId: suggestion.place_id },
      (results, status) => {
        if (results && results.length >= 1) {
          const data = {
            ...suggestion,
            formatted_address: results[0].formatted_address,
            latitude: results[0].geometry.location.lat(),
            longitude: results[0].geometry.location.lng(),
            suburb: findSuburb(results[0].address_components),
            state: findState(results[0].address_components),
            status
          };
          this.props.selectAddress(data);
        }
      }
    );
  };

  render() {
    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionSelected={this.handleSelectSuggestion}
        getSuggestionValue={getSuggestionValue}
        renderSuggestionsContainer={SuggestionContainer}
        renderSuggestion={SuggestionItem}
        renderInputComponent={SuggestionInput}
        inputProps={{
          value: this.state.searchText,
          onChange: this.updateInput
        }}
      />
    );
  }
}

export default AddressAutoComplete;
