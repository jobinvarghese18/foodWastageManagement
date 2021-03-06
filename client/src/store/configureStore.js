import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk                                         from 'redux-thunk'
import pgReducer                                     from '../reducers/pgReducer'
import userReducer                                   from '../reducers/userReducer'
import pgsReducer                                    from '../reducers/PgsReducer'
import residentMess                                  from '../reducers/residentMessReducer'
import pgMessReducer                                 from '../reducers/pgMessReducer'
import userRequestReducer                            from '../reducers/userRequestReducer'
const configureStore = ()=>{
    const store = createStore(combineReducers({
       user:userReducer,
       pg:pgReducer,
       pgs:pgsReducer,
       residentMess:residentMess,
       pgMess:pgMessReducer,
       userRequest:userRequestReducer
    }),applyMiddleware(thunk))
    return store
}

export default  configureStore