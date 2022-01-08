export const initialState = { user: null };

export const reducer = async (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER": {
      return { ...state, user: action.user };
    }
    default: {
      return state;
    }
  }
};
