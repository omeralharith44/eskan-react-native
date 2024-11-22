import axios from "axios";

const getTenantTypeItems = async () => {
  return await axios.get("Propertieslookups/tenantType");
};

const getRentalTermItems = async () => {
  return await axios.get("Propertieslookups/rentalTerm");
};

const getPropertyTypeItems = async () => {
  return await axios.get("Propertieslookups/propertyType");
};

const getACTypeItems = async () => {
  return await axios.get("Propertieslookups/aC_Type");
};

const getAreaItems = async () => {
  return await axios.get("Propertieslookups/area");
};

const getCityItems = async () => {
  return await axios.get("Propertieslookups/city");
};

const getPaymentMethodItems = async () => {
  return await axios.get("Propertieslookups/paymentMethod");
};

const getPropertyCategoryItems = async () => {
  return await axios.get("Propertieslookups/propertyCategory");
};

const getStatusItems = async () => {
  return await axios.get("Propertieslookups/status");
};

export const PropertyLookupService = {
  getTenantTypeItems,
  getRentalTermItems,
  getPropertyTypeItems,
  getACTypeItems,
  getAreaItems,
  getCityItems,
  getPaymentMethodItems,
  getPropertyCategoryItems,
  getStatusItems,
};
