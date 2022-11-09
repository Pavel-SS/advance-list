import {useDispatch} from 'react-redux'
import {bindActionCreators} from '@reduxjs/toolkit'
import { hubActions } from '../store/hub/hub.slice'

const actions = {
    ...hubActions
}


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}