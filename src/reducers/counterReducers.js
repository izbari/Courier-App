import { INCREMENT,DECREMENT } from "../actions/actionTypes";

const counterReducers = (times = 0, action) => {
  console.log("actions",action)
  switch (action.type) {
    case INCREMENT:
      console.log("arttırmaya girdi")
      return times+ action.step;
    case DECREMENT:
      return times - action.step;
    default:
      console.log("girmedi")
      return times;
  }

};
export default counterReducers;
