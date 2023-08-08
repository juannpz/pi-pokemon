import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import reducer from "./reducer";

// creo el store de redux pasandole el reducer
const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk }),
  });

export default store