import { tassApiUrl } from "@utils/helper-functions";

const tokenKey      = process.env.TASS_TOKEN_KEY_T;
const appCode       = process.env.TASS_APP_CODE_T;
const companyCode   = process.env.TASS_COMPANY_CODE_T;
const version       = process.env.TASS_VERSION;
const method        = process.env.TASS_PARENT_METHOD;
const endPoint      = process.env.TASS_ENDPOINT_T;
let parameterString = process.env.TASS_PARAMETER_STRING;

tassApiUrl(tokenKey, appCode, companyCode, version, method, endPoint, parameterString);
