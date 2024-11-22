import axios from "axios";

import { Property } from "../models";

const getLikedProperties = async () => {
  return await axios.get("properties/likes");
};

const getMyProperties = async () => {
  return await axios.get("properties/myProperties");
};

const getMyPropertiesRequest = async () => {
  return await axios.get("properties/mypropertiesRequest");
};

const getShowPropertiesRequestByAdmin = async () => {
  return await axios.get("properties/showPropertiesRequestByAdmin");
};

const likeProperty = async (propertyId: number, isLiked: boolean) => {
  return await axios.post("properties/like", {
    propertyId,
    isLiked,
  });
};

const saveProperty = async (
  propertyTypeId: number,
  propertyCategoryId: number,
  userId: number,
  cityId: number,
  areaId: number,
  acTypeId: number,
  paymentMethodId: number,
  featured: boolean,
  title: string,
  description: string,
  imageNames: string,
  externalImage: string,
  size: number,
  maximum: number,
  bedRoomCount: number,
  bathRoomCount: number,
  kitchenRoomCount: number,
  parkingCount: number,
  additionalFeatures: string,
  price: number,
  currency: string,
  address: string,
  latitude: number,
  longitude: number,
  visible: boolean
): Promise<Property> => {
  try {
    const result = await axios.post("properties/SaveProperties", {
      property_type_id: propertyTypeId,
      property_category_id: propertyCategoryId,
      user_id: userId,
      city_id: cityId,
      area_id: areaId,
      ac_type_id: acTypeId,
      payment_method_id: paymentMethodId,
      featured,
      title,
      description,
      image_names: imageNames,
      external_image: externalImage,
      size,
      maximum,
      bed_room_count: bedRoomCount,
      bath_room_count: bathRoomCount,
      kitchen_room_count: kitchenRoomCount,
      parking_count: parkingCount,
      additional_features: additionalFeatures,
      price,
      currency,
      address,
      latitude,
      longitude,
      visible,
    });
    if (result?.data?.error) {
      return Promise.reject(Error(result.data.error.message));
    }
    return Promise.resolve(result?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const uploadPropertyImage = async (fileUri: string): Promise<string> => {
  try {
    const image: any = {
      uri: fileUri,
      type: "image/png",
      name: "upload.png",
    };

    var data = new FormData();
    data.append("image", image);
    const result = await axios.post("properties/uploadPropertyImage", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (result?.data?.error) {
      return Promise.reject(Error(result.data.error.message));
    }
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PropertyService = {
  likeProperty,
  getLikedProperties,
  saveProperty,
  getMyProperties,
  getMyPropertiesRequest,
  uploadPropertyImage,
  getShowPropertiesRequestByAdmin,
};
