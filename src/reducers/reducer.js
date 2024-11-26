import {
  GET_USERS_SUCCESS,
  UPDATE_USER,
  DELETE_USER,
  SET_STORED_USERS,
} from "../actions/actions";

const myFirstReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return { ...state, users: action.users };
    case DELETE_USER:
      const userId = action.payload;
      const currentUsers = [...state.users];
      const newUsers = currentUsers.filter((user) => user.id !== userId);
      return { ...state, users: newUsers };
    case UPDATE_USER:
      const { id, name } = action.payload;
      const currentUsersUpdate = [...state.users];
      const newUsersUpdate = currentUsersUpdate.map((user) =>
        user.id === id ? { ...user, name } : user
      );
      return { ...state, users: newUsersUpdate };
    case SET_STORED_USERS:
      const storedUsers = action.payload;
      return { ...state, users: storedUsers };
    default:
      return state;
  }
};

export default myFirstReducer;
