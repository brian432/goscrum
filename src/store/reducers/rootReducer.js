import { combineReducers } from "redux"

import { tasksReducer } from "./tasksReducer"
import { loginReducer } from "./loginReducer"

const rootReducer = combineReducers({
    tasksReducer,
    loginReducer
})

export default rootReducer