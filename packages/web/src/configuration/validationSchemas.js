import * as yup from 'yup';
import { string, number, date, mixed } from 'yup';

const mobileNumberRegex = /^(01)[0-9]{9}$/;
const countryCodeRegex = /^(002)/;

const today = new Date();
const formattedDate = `${today.getFullYear()}-${today.getMonth() +
  1}-${today.getDate()}`;

export const agentBatchSchema = yup.object().shape({
  batchFile: mixed()
    .required('required.field.label')
    // 20MB in Bytes
    .test(
      'fileSize',
      'validation.max.file.size.20.mb',
      value => value.size <= 20971520
    )
    .test('fileType', 'validation.file.type.spreadsheet.csv.only', value =>
      [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv'
      ].includes(value.type)
    )
});

export const consumerBatchSchema = yup.object().shape({
  batchFile: mixed()
    .required('required.field.label')
    .test('fileSize', 'validation.max.file.size.20.mb', value => {
      // 20MB in Bytes
      return value.size <= 20971520;
    })
    .test('fileType', 'validation.file.type.spreadsheet.csv.only', value =>
      [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv'
      ].includes(value.type)
    )
});

export const unregisterSchema = yup.object().shape({
  reason: string()
    .required('required.field.label')
    .min(1, 'validation.char.len.min.1')
    .max(256, 'validation.char.len.max.256')
});

export const pinSchema = yup.object().shape({
  mPin: string()
    .required('required.field.label')
    .test('len', 'validation.pin.6', val => val?.length === 6)
});

export const cashInOutSchema = yup.object().shape({
  transactionCurrency: string().required(),
  transactionAmount: number()
    .required('required.field.label')
    .positive('validation.positive.number.invalid')
    .min(1, 'validation.amount.min.1')
    .max(100000, 'validation.amount.max.100k'),
  receiverMobileNumber: string()
    .required('required.field.label')
    .matches(mobileNumberRegex, 'validation.mobile.not.valid'),
  countryCode: string()
    .required('required.field.label')
    .matches(countryCodeRegex, 'validation.country.code.not.valid')
});

export const confirmTransactionSchema = yup.object().shape({
  mPin: string()
    .required('required.field.label')
    .test('len', 'validation.pin.6', val => val?.length === 6)
});

export const inquiryByMobileNumberSchema = yup.object().shape({
  mobileNumber: string()
    .required('mobile.number.required')
    .matches(mobileNumberRegex, 'validation.mobile.not.valid'),
  countryCode: string()
    .required('required.field.label')
    .matches(countryCodeRegex, 'validation.country.code.not.valid')
});

export const loginSchema = yup.object().shape({
  email: string()
    .email('validation.email.field.label')
    .required('required.field.label'),
  password: string().required('required.field.label')
});

export const kycSchema = yup.object().shape({
  mobileNo: string().required('mobile.number.required'),
  countryCode: string()
    .required('required.field.label')
    .matches(countryCodeRegex, 'validation.country.code.not.valid'),
  customerSoleProoLicense: string()
    .min(1, 'validation.char.len.min.1')
    .max(35, 'validation.char.len.max.35'),
  customerServLineNum: string()
    .min(1, 'validation.char.len.min.1')
    .max(35, 'validation.char.len.max.35'),
  customerLandline: string()
    .min(9, 'validation.landline.min.9')
    .max(10, 'validation.landline.max.10'),
  birthDate: string().required('required.field.label'),
  customerNationalId: string()
    .required('required.field.label')
    .min(14, 'min.nationalId.14')
    .max(14, 'max.nationalId.14'),
  // TODO: check this
  customerNationalIdExpiryDate: date()
    // .required('required.field.label')
    .min(formattedDate, 'national.id.exp.date.error'),
  customerName: string()
    .required('required.field.label')
    .min(1, 'min.char.len.1')
    .max(64, 'max.char.len.64'),
  customerEmail: string().email('validation.email.field.label'),
  gender: string(),
  customerAddrGovernate: string().required('required.field.label'),
  customerAddrDistrict: string().required('required.field.label'),
  customerAddrDescription: string().required('required.field.label')
});

export const userSchema = yup.object().shape({
  mobileNo: string().required('mobile.number.required'),
  countryCode: string()
    .required('required.field.label')
    .matches(countryCodeRegex, 'validation.country.code.not.valid'),
  landLine: string()
    .min(9, 'validation.landline.min.9')
    .max(10, 'validation.landline.max.10'),
  birthDate: string().required('required.field.label'),
  nationalId: string()
    .required('required.field.label')
    .min(14, 'min.nationalId.14')
    .max(14, 'max.nationalId.14'),
  nationalIdExpiryDate: date()
    .required('required.field.label')
    .min(formattedDate, 'national.id.exp.date.error'),
  login: string()
    .required('required.field.label')
    .min(1, 'min.char.len.1')
    .max(64, 'max.char.len.64'),
  name: string()
    .required('required.field.label')
    .min(1, 'min.char.len.1')
    .max(64, 'max.char.len.64'),
  branch: string().required('required.field.label'),
  email: string().email('validation.email.field.label'),
  addrGovernate: string().required('required.field.label'),
  addrDistrict: string().required('required.field.label'),
  addrDescription: string().required('required.field.label')
});

export const kycBatchRegistrationRecordSchema = yup.object().shape({
  mobileNo: string().required('mobile.number.required'),
  countryCode: string()
    .required('required.field.label')
    .matches(countryCodeRegex, 'validation.country.code.not.valid'),
  solePropLicence: string()
    .min(1, 'validation.char.len.min.1')
    .max(35, 'validation.char.len.max.35'),
  serviceLicenceNo: string()
    .min(1, 'validation.char.len.min.1')
    .max(35, 'validation.char.len.max.35'),
  landline: string()
    .min(9, 'validation.landline.min.9')
    .max(10, 'validation.landline.max.10'),
  birthDt: string().required('required.field.label'),
  nationalIdNumber: string()
    .required('required.field.label')
    .min(14, 'min.nationalId.14')
    .max(14, 'max.nationalId.14'),
  nationalIdExpiryDate: date().min(formattedDate, 'national.id.exp.date.error'),
  fullName: string()
    .required('required.field.label')
    .min(1, 'min.char.len.1')
    .max(64, 'max.char.len.64'),
  email: string().email('validation.email.field.label'),
  gender: string().required('required.field.label'),
  addrGovernate: string().required('required.field.label'),
  addrCity: string().required('required.field.label'),
  addrDescription: string().required('required.field.label')
});

export const userBatchRegistrationRecordSchema = yup.object().shape({
  mobileNo: string().required('mobile.number.required'),
  landline: string()
    .min(9, 'validation.landline.min.9')
    .max(10, 'validation.landline.max.10'),
  birthDt: string().required('required.field.label'),
  nationalIdNumber: string()
    .required('required.field.label')
    .min(14, 'min.nationalId.14')
    .max(14, 'max.nationalId.14'),
  nationalIdExpiryDate: date()
    .required('required.field.label')
    .min(formattedDate, 'national.id.exp.date.error'),
  login: string()
    .required('required.field.label')
    .min(1, 'min.char.len.1')
    .max(64, 'max.char.len.64'),
  fullName: string()
    .required('required.field.label')
    .min(1, 'min.char.len.1')
    .max(64, 'max.char.len.64'),
  branchName: string().required('required.field.label'),
  email: string().email('validation.email.field.label'),
  addrGovernate: string().required('required.field.label'),
  addrDescription: string().required('required.field.label')
});
