//-----------------------------------------------------------------------------------------
//----------------------------- Third Party Library imports -------------------------------
//-----------------------------------------------------------------------------------------

import uploadcare from 'uploadcare-widget';

//-----------------------------------------------------------------------------------------
//---------------------------------- Internal imports -------------------------------------
//-----------------------------------------------------------------------------------------

import { DEFAULT_UPLOADCARE_SETTINGS, CONTRACT_VALUES, PROJECT_TYPES } from '../Constants';

//-----------------------------------------------------------------------------------------
//------------- Open uploadcare dialog/modal and pass uploaded files to handler -----------
//-----------------------------------------------------------------------------------------

/*

  Inputs: a callback function (called handleUploadedImages)
  The callback, handleUploadedImages, receives a single argument which is an array of object e.g.

  [
    { name: "nameA", url: "urlA" },
    { name: "nameB", url: "urlB" },
    { name: "nameC", url: "urlC" }
  ]

*/

const openUploadCareDialog = handleUploadedImages => {
  // Open the uploadcare dialog
  uploadcare
    .openDialog(null, DEFAULT_UPLOADCARE_SETTINGS)
    // Fail handler
    .fail(failedUpload => {
      console.log('upload failed: '.failedUpload);
    })
    // Once modal is closed and files have been converted to url's, fire done handler
    .done(info => {
      const files = info.files();
      const filesLength = files.length;
      const filesArray = [];
      files.forEach(file => {
        file.done(fileInfo => {
          filesArray.push({
            name: fileInfo.name,
            url: fileInfo.originalUrl
          });
          if (filesArray.length === filesLength) {
            // Pass uploaded files to handler
            handleUploadedImages(filesArray);
          }
        });
      });
    });
};

const findSuburb = components => {
  const suburb = components.find(component =>
    component.types.includes('locality')
  );
  return suburb ? suburb.long_name : '';
};

const findState = components => {
  const state = components.find(component =>
    component.types.includes('administrative_area_level_1')
  );
  return state ? state.short_name : '';
};

const getUnixTime = () => {
  return (new Date().getTime() / 1000) | 0;
};

const getFileNames = arr => {
  return arr.map(item => item.split('/')[3]);
};

const getContractValues = (contractId, flag) => {
  const contract = CONTRACT_VALUES.find(c => c.id === contractId);
  return flag === 'min' ? contract.min : contract.max;
};

const checkLocationValid = (
  { suburb, state, latitude, longitude, formatted_address },
  comp
) => {
  const isSuburbValid = suburb && suburb.length >= 2 && suburb.length <= 50;
  const isStateValid = state && state.length >= 2 && state.length <= 3;
  const isLatValid = latitude && !isNaN(latitude);
  const isLngValid = longitude && !isNaN(longitude);
  const isAddressValid =
    formatted_address.length >= 1 && formatted_address.length <= 255;
  const result =
    isSuburbValid && isStateValid && isLatValid && isLngValid && isAddressValid;
  comp.setState({
    isLocationError: !result
  });
  return result;
};

const checkDescriptionValid = (value, comp) => {
  const result =
    typeof value === 'string' && value.length >= 10 && value.length <= 250;
  comp.setState({
    isDescriptionError: !result
  });
  return result;
};

const checkImagesValid = (arr, comp) => {
  const result = arr.length > 0;
  comp.setState({
    isImagesError: !result
  });
  return result;
};

const getSuggestionValue = suggestion => {
  return suggestion.description;
};

const getProjectNameById = (id) => {
  return PROJECT_TYPES.find(project => project.id === id).name;
};

const getContractDescriptionById = id => {
  return CONTRACT_VALUES.find(contract => contract.id === id).description;
}

export {
  openUploadCareDialog,
  findSuburb,
  findState,
  getUnixTime,
  getFileNames,
  getContractValues,
  checkLocationValid,
  getSuggestionValue,
  checkDescriptionValid,
  checkImagesValid,
  getProjectNameById,
  getContractDescriptionById
};
