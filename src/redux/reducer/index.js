import { AddNewServiceReducer } from "./AddNewServiceReducer";
import { SignUpReducer } from "./AddNewUserReducer";
import { AuthReducer } from "./AuthReducer";
import { CheckOTPReducer } from "./CheckOTPReducer";
import { ForgetEmailReducer } from "./ForgetEmailReducer";
import { GetBusinessTypeReducer } from "./GetBusinessTypeReducer";
import { GetCategoryReducer } from "./GetCategoryReducer";
import { GetSelectedServiceReducer } from "./GetSelectedServiceReducer";
import { UpdatePasswordReducer } from "./UpdatePasswordReducer";


export default {
    authData: AuthReducer,
    signUpData: SignUpReducer,
    getBusinessTypeData : GetBusinessTypeReducer,
    forgetEmailData : ForgetEmailReducer,
    checkOTPData : CheckOTPReducer,
    updatePasswordData : UpdatePasswordReducer,
    getCategoryData : GetCategoryReducer,
    addNewServiceData : AddNewServiceReducer,
    getSelectedServiceData : GetSelectedServiceReducer
}