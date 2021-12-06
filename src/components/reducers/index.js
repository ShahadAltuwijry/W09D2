import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import signIn from "./login";
import {
  create,
  get_tasks,
  user_tasks,
  delete_tasks,
  comp_task,
} from "./tasks";

const reducers = combineReducers({
  signIn,
  create,
  get_tasks,
  user_tasks,
  delete_tasks,
  comp_task,
});

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
