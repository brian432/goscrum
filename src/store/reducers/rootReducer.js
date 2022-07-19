import { combineReducers } from "redux"

import { tasksReducer } from "./tasksReducer"
import { loginReducer } from "./loginReducer"
import { taskFormReducer } from "./taskFormReducer"
import { registerReducer } from "./registerReducer"

const rootReducer = combineReducers({
    tasksReducer,
    loginReducer,
    taskFormReducer,
    registerReducer
})

export default rootReducer