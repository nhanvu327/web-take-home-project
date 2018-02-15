import React from 'react';
import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Icon from 'material-ui/Icon';
import classnames from 'classnames';
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

  updateInput = searchText => {
    if (searchText.length > 0) {
      this.setState(
        {
          searchText
        },
        () => {
          const outerScope = this;
          this.service.getPlacePredictions(
            {
              input: this.state.searchText,
              componentRestrictions: this.props.componentRestrictions,
              types: this.props.types
            },
            suggestions => {
              if (suggestions) {
                outerScope.setState({ suggestions });
              }
            }
          );
        }
      );
    }
  };

  render() {
    return (
      <Downshift onInputValueChange={this.updateInput}>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex
        }) => {
          return (
            <div>
              <TextField
                fullWidth
                InputProps={getInputProps({
                  placeholder: 'Add location',
                  id: 'address-auto-complete'
                })}
              />
              {isOpen ? (
                <Paper square>
                  {this.state.suggestions.map((suggestion, index) => (
                    <MenuItem
                      {...getItemProps({ item: suggestion.description })}
                      key={suggestion.id}
                      selected={highlightedIndex === index}
                      component="div"
                      className={classnames('address-autocomplete-item', {
                        highlighted: highlightedIndex === index
                      })}
                    >
                      {suggestion.description}
                    </MenuItem>
                  ))}
                </Paper>
              ) : null}
            </div>
          );
        }}
      </Downshift>
    );
  }
}

export default AddressAutoComplete;
