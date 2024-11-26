export const GET_USERS_FETCH = "GET_USERS_FETCH";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const SET_STORED_USERS = "SET_STORED_USERS";

export const getUsersFetch = () => ({
  type: GET_USERS_FETCH,
});

export const updateUser = (id, name) => ({
  type: UPDATE_USER,
  payload: { id, name },
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

export const setStoredUsers = (users) => ({
  type: SET_STORED_USERS,
  payload: users,
});
