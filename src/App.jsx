import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersFetch,
  updateUser,
  deleteUser,
  setStoredUsers,
} from "./actions/actions";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.myFirstReducer.users);

  useEffect(() => {
    if (users.length === 0) {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        try {
          const parsedUsers = JSON.parse(storedUsers);
          dispatch(setStoredUsers(parsedUsers));
        } catch (error) {
          console.error("Failed to parse users from localStorage", error);
        }
      }
    } else {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users, dispatch]);

  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const [userIdUpdate, setUserIdToUpdate] = useState(-1);
  const [name, setName] = useState("");

  const handleClick = () => {
    dispatch(getUsersFetch());
  };

  const updateUserBtnClick = (id, name) => {
    setUpdateBtnClicked(true);
    setUserIdToUpdate(id);
    setName(name);
  };

  const cancelUserUpdate = () => {
    setUpdateBtnClicked(false);
    setUserIdToUpdate(-1);
    setName("");
  };

  const deleteUserBtnClick = (id) => {
    dispatch(deleteUser(id));
  };

  const updateUserInfo = (id) => {
    setUserIdToUpdate(-1);
    setUpdateBtnClicked(false);
    dispatch(updateUser(id, name));
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setName(name);
  };

  return (
    <div className="app">
      <button onClick={handleClick} className="get-users-btn">
        Get Users
      </button>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="user-item">
            {user.id !== userIdUpdate && <p>{user.name}</p>}
            {updateBtnClicked && user.id === userIdUpdate && (
              <div className="update-user-info">
                <input
                  onChange={(e) => handleNameChange(e)}
                  placeholder="Enter new name"
                  value={name}
                />
                <div className="update-actions-btn-grp">
                  <button
                    className="cancel-btn"
                    onClick={() => cancelUserUpdate(user.id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="save-btn"
                    onClick={() => updateUserInfo(user.id)}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
            <div className="actions-btn-grp">
              <button onClick={() => updateUserBtnClick(user.id, user.name)}>
                Update
              </button>
              <button onClick={() => deleteUserBtnClick(user.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
