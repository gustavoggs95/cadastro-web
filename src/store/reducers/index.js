import busca from './busca'
import adicionar from './adicionar'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    busca,
    adicionar
})

export default rootReducer