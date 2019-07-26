import { configureStore } from "redux-starter-kit";
import users from "./reducers/users";


console.log(users);
const store = configureStore({
  reducer: {
    users
  }
});

export default store;