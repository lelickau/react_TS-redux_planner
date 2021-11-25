import {AuthAC} from './auth/actionCreators'
import { EventAC } from './event/actionCreators'
export const allAC = {
    ...AuthAC,
    ...EventAC
}