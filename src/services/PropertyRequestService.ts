import axios from "axios";

const getPropertiesRequest = async () => {
  return await axios.get("propertiesRequest");
};

const savePropertyRequest = async (
  property_id: number,
  tenant_type_id: number,
  rental_term_id: number,
  period: number,
  status_id: number,
  user_id: number
) => {
  return await axios.post("propertiesRequest", {
    property_id,
    tenant_type_id,
    rental_term_id,
    period,
    status_id,
    user_id,
  });
};

const savePropertyRequestStatus = async (id: number, status_id: number) => {
  return await axios.post("propertiesRequest/request", {
    id,
    status_id,
  });
};

export const PropertyRequestService = {
  getPropertiesRequest,
  savePropertyRequest,
  savePropertyRequestStatus,
};
