import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import { allAC } from "../store/reducers/actionsCreators";

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allAC, dispatch);
}