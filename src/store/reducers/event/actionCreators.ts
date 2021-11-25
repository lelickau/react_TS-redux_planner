import { EventActionEnum, SetGuestsAction, SetEventAction } from './types';
import { IUser } from "../../../models/IUser";
import { IEvent } from '../../../models/IEvent';
import { AppDispatch } from '../../index';
import UserService from '../../../api/UserService';


export const EventAC = {
    setGuests: (payload: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]): SetEventAction => ({type: EventActionEnum.SET_EVENTS, payload}),

    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers()
            dispatch(EventAC.setGuests(response.data))
        } catch (error) {
            console.log(error)
        }
    },

    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || "[]"
            const json = JSON.parse(events) as IEvent[]
            json.push(event)
            dispatch(EventAC.setEvents(json))
            localStorage.setItem('events', JSON.stringify(json))
        } catch (error) {
            console.log(error)
        }
    },

    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || "[]"
            const json = JSON.parse(events) as IEvent[]
            const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username)
            dispatch(EventAC.setEvents(currentUserEvents))
        } catch (error) {
            console.log(error)
        }
    }
}