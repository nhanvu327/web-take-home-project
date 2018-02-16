import { ADD_PROJECT } from '../util/Constants';

const addProjectAction = payload => {
  return {
    type: ADD_PROJECT,
    payload
  }
}

export {
  addProjectAction
};