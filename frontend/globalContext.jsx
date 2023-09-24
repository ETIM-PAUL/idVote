import React, { createContext, useReducer } from "react";
export const GlobalContext = createContext();

const initialState = {
  createElectionModal: false,
  voteElectionModal: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CREATE_ELECTION_MODAL":
      return {
        ...state,
        createElectionModal: true,
      };
    case "CLOSE_CREATE_ELECTION_MODAL":
      return {
        ...state,
        createElectionModal: false,
      };
    case "SET_VOTE_ELECTION_MODAL":
      return {
        ...state,
        createElectionModal: true,
      };
    case "CLOSE_VOTE_ELECTION_MODAL":
      return {
        ...state,
        createElectionModal: false,
      };
    default:
      return state;
  }
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;