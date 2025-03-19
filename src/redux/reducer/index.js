import { AddBusinessLocationReducer } from "./AddBusinessLocationReducer";
import { AddNewServiceReducer } from "./AddNewServiceReducer";
import { SignUpReducer } from "./AddNewUserReducer";
import { AddPrepaidPackageReducer } from "./AddPrepaidPackageReducer";
import { AddPrepaidReducer } from "./AddPrepaidReducer";
import { AddStaffReducer } from "./AddStaffReducer";
import { AddSubServiceReducer } from "./AddSubServiceReducer";
import { AuthReducer } from "./AuthReducer";
import { CheckOTPReducer } from "./CheckOTPReducer";
import { CreatePostReducer } from "./CreatePostReducer";
import { CreatePromoReducer } from "./CreatePromoReducer";
import { DeleteBusinessImageReducer } from "./DeleteBusinessImageReducer";
import { ForgetEmailReducer } from "./ForgetEmailReducer";
import { GetAllServicesReducer } from "./GetAllServicesReducer";
import { GetBusinessTypeReducer } from "./GetBusinessTypeReducer";
import { GetCategoryReducer } from "./GetCategoryReducer";
import { GetCustomerDetailsReducer } from "./GetCustomerDetailsReducer";
import { GetGiftCardBackgroundReducer } from "./GetGiftCardBackgroundReducer";
import { GetNotificationReducer } from "./GetNotificationReducer";
import { GetPostReducer } from "./GetPostReducer";
import { GetPrepaidPackageReducer } from "./GetPrepaidPackageReducer";
import { GetPromotionsReducer } from "./GetPromotionsReducer";
import { GetSelectedServiceReducer } from "./GetSelectedServiceReducer";
import { GetSendGiftReducer } from "./GetSendGiftReducer";
import { GetServicesDetailReducer } from "./GetServicesDetailReducer";
import { GetSettingDetailsReducer } from "./GetSettingDetailsReducer";
import { GetStaffReducer } from "./GetStaffReducer";
import { GetUserDetailReducer } from "./GetUserDetailReducer";
import { SendGiftsReducer } from "./SendGiftsReducer";
import { SubmitReportReducer } from "./SubmitReportReducer";
import { UpdateBusinessPasswordReducer } from "./UpdateBusinessPasswordReducer";
import { UpdateBusinessProfileReducer } from "./UpdateBusinessProfileReducer";
import { UpdateCustomerStatusReducer } from "./UpdateCustomerStatusReducer";
import { UpdatePasswordReducer } from "./UpdatePasswordReducer";
import { UpdatePromoStatusReducer } from "./UpdatePromoStatusReducer";
import { UpdateSettingReducer } from "./UpdateSettingReducer";


export default {
    authData: AuthReducer,
    signUpData: SignUpReducer,
    getBusinessTypeData: GetBusinessTypeReducer,
    forgetEmailData: ForgetEmailReducer,
    checkOTPData: CheckOTPReducer,
    updatePasswordData: UpdatePasswordReducer,
    getCategoryData: GetCategoryReducer,
    addNewServiceData: AddNewServiceReducer,
    getSelectedServiceData: GetSelectedServiceReducer,
    getServicesDetailData: GetServicesDetailReducer,
    createPostData: CreatePostReducer,
    getStaffData: GetStaffReducer,
    getPostData: GetPostReducer,
    getNotificationData: GetNotificationReducer,
    getUserDetailData: GetUserDetailReducer,
    addSubServiceData: AddSubServiceReducer,
    updateBusinessProfileData: UpdateBusinessProfileReducer,
    addBusinessLocationData: AddBusinessLocationReducer,
    updateBusinessPasswordData : UpdateBusinessPasswordReducer,
    addStaffData : AddStaffReducer,
    DeleteBusinessImageData : DeleteBusinessImageReducer,
    getAllServicesData : GetAllServicesReducer,
    createPromoData : CreatePromoReducer,
    getPromotionsData : GetPromotionsReducer,
    updatePromoStatusData : UpdatePromoStatusReducer,
    getSettingDetailsData : GetSettingDetailsReducer,
    updateSettingData : UpdateSettingReducer,
    getGiftCardBackgroundData : GetGiftCardBackgroundReducer,
    getCustomerDetailsData : GetCustomerDetailsReducer,
    sendGiftsData : SendGiftsReducer,
    getSendGiftData : GetSendGiftReducer,
    updateCustomerStatusData : UpdateCustomerStatusReducer,
    submitReportData : SubmitReportReducer,
    addPrepaidPackageData : AddPrepaidPackageReducer,
    getPrepaidPackageData : GetPrepaidPackageReducer,
    addPrepaidData : AddPrepaidReducer
 }