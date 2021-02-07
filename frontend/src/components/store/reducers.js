const initState = {
  loading: "False",
  name:"",
  email:""
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "Loading":
      return state.loading;
    case "Signup":
        return {
            ...state,
            name:action.name,
            email:action.email
        }
    default:
      return state;
  }
};

export default reducer
