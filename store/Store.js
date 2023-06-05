import saveDataSlice from "./slice/saveDataSlice";

const { configureStore } = require("@reduxjs/toolkit");

const Store = configureStore({
    reducer: {
        saveDataSlice
    }
})
export default Store