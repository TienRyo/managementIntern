import {applyMiddleware, createStore} from "redux";
import  reducer from "../reducers/index";
import courseApi from "../components/middlewares/courseApi";
import companyApi from "../components/middlewares/companyApi";
import internshipApi from "../components/middlewares/internshipApi";
import lecturerApi from "../components/middlewares/lecturerApi";
import internApi from "../components/middlewares/internApi";
import areaApi from "../components/middlewares/areaApi";

const store = createStore(reducer, applyMiddleware(...[courseApi, companyApi, internshipApi, lecturerApi, internApi, areaApi]));

export default store;