import { createContext, useReducer, useContext } from "react";

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

// export const useUserValue = () => {
//   const valueAndDispatch = useContext(UserContext);
//   return valueAndDispatch[0];
// };

// export const useUserDispatch = () => {
//   const valueAndDispatch = useContext(UserContext);
//   return valueAndDispatch[1];
//   // const dispatch = valueAndDispatch[1];
//   // return (message, error) => {
//   //   dispatch({ type: "SET", payload: { message, error } });
//   //   setTimeout(() => {
//   //     dispatch({ type: "CLEAR" });
//   //   }, 5000);
//   // };
// };

export default UserContext;
