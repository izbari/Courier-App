import { connect } from "react-redux";
import CounterComponent from '../components/CounterComponent';

//Actions
import { increaseAction,decreaseAction } from "../actions";

const mapStateToProps = (state)=>{
    console.log("state",state.counterReducers)
    return{
        times: state.counterReducers
    }
};
const mapDispatchtoProps = (dispatch)=>{
    return {
        onIncrease: (step)=>{
            dispatch(increaseAction(step));

        },
        onDecrement: (step)=>{
            dispatch(decreaseAction(step));
        }
    }
}

const CounterContainer = connect(mapStateToProps,mapDispatchtoProps)(CounterComponent);
export default CounterContainer;




