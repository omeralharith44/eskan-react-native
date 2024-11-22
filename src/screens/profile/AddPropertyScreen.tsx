import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ReactNativeModal from "react-native-modal";
import SafeAreaView from "react-native-safe-area-view";

import {
  CheckBox,
  HtmlView,
  KeyboardView,
  Picker,
  PrimaryButton,
  Separator,
  Text,
  TextInput,
} from "../../components";
import { AuthenticationContext } from "../../context";
import { useLocalization } from "../../localization";
import {
  AcType,
  Area,
  City,
  PaymentMethod,
  PropertyCategory,
  PropertyType,
  User,
} from "../../models";
import {
  AppSettingsService,
  PropertyLookupService,
  PropertyService,
} from "../../services";
import { Theme } from "../../theme";

const WIDTH = Dimensions.get("screen").width;

export const AddPropertyScreen = () => {
  const authContext = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const { getString } = useLocalization();
  const [userInfo, setUserInfo] = useState<User>(authContext.user);


  const [externalImage, setExternalImage] = useState([]);
  const [internalImages, setInternalImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const { width } = useWindowDimensions();

  const [propertyTypeModel, setPropertyTypeModel] = useState<PropertyType>(null);
  const [acTypeModel, setAcTypeModel] = useState<AcType>(null);
  const [areaModel, setAreaModel] = useState<Area>(null);
  const [cityModel, setCityModel] = useState<City>(null);
  const [paymentMethodModel, setPaymentMethodModel] = useState<PaymentMethod>(null);
  const [propertyCategoryModel, setPropertyCategoryModel] = useState<PropertyCategory>(null);


  const [property_type_id, set_property_type_id] = useState(0);
  const [property_category_id, set_property_category_id] = useState(0);
  const [user_id, set_user_id] = useState(0);
  const [city_id, set_city_id] = useState(0);
  const [area_id, set_area_id] = useState(0);
  const [ac_type_id, set_ac_type_id] = useState(0);
  const [payment_method_id, set_payment_method_id] = useState(0);
  const [featured, set_featured] = useState(false);
  const [visible, set_visible] = useState(true);
  const [title, set_title] = useState("");
  const [description, set_description] = useState("");
  const [image_names, set_image_names] = useState("");
  const [external_image, set_external_image] = useState("");
  const [size, set_size] = useState(0);
  const [maximum, set_maximum] = useState(0);
  const [bed_room_count, set_bed_room_count] = useState(0);
  const [bath_room_count, set_bath_room_count] = useState(0);
  const [kitchen_room_count, set_kitchen_room_count] = useState(0);
  const [parking_count, set_parking_count] = useState(0);
  const [additional_features, set_additional_features] = useState("");
  const [price, set_price] = useState(0);
  const [currency, set_currency] = useState("");
  const [address, set_address] = useState("");
  const [latitude, set_latitude] = useState(0);
  const [longitude, set_longitude] = useState(0);

  const [userTermsShowModal, setUserTermsShowModal] = useState(false);
  const [userTermsText, setUserTermsText] = useState("");
  const [userTermsConfirm, setUserTermsConfirm] = useState(false);

  const [items, setItems] = useState([
    { name: "جنيه", id: "جنيه" },
    { name: "دولار", id: "دولار" },
  ]);

  const onClickSaveProperty = () => {
    if (
      property_type_id === 0 ||
      property_category_id === 0 ||
      city_id === 0 ||
      area_id === 0 ||
      ac_type_id === 0 ||
      payment_method_id === 0 ||
      title === "" ||
      image_names === "" ||
      external_image === "" ||
      size === 0 ||
      maximum === 0 ||
      bed_room_count === 0 ||
      bath_room_count === 0 ||
      kitchen_room_count === 0 ||
      parking_count === 0 ||
      additional_features === "" ||
      price === 0 ||
      currency === "" ||
      address === "" ||
      latitude === 0 ||
      longitude === 0
    ) {
      Alert.alert(getString("Please fill fields"));
      return;
    }
    if (!userTermsConfirm) {
      Alert.alert(getString("You must confirm user terms!"));
      return;
    }

    PropertyService.saveProperty(
      property_type_id,
      property_category_id,
      userInfo.id,
      city_id,
      area_id,
      ac_type_id,
      payment_method_id,
      featured,
      title,
      description,
      image_names,
      external_image,
      size,
      maximum,
      bed_room_count,
      bath_room_count,
      kitchen_room_count,
      parking_count,
      additional_features,
      price,
      currency,
      address,
      latitude,
      longitude,
      visible
    )
      .then(async (result) => {
        Alert.alert(getString("Done Save Property"));
        // x2 goback for first and register screens.
        navigation.goBack();
      })
      .catch((e) => Alert.alert(e.message));
  };

  const fetchPropertyTypeItems = () => {
    PropertyLookupService.getPropertyTypeItems()
      .then((res) => {
        setPropertyTypeModel(res.data);
      })
      .catch((err) => console.log(err));
  };
  const fetchAcTypeItems = () => {
    PropertyLookupService.getACTypeItems()
      .then((res) => {
        setAcTypeModel(res.data);
      })
      .catch((err) => console.log(err));
  };
  const fetchAreaItems = () => {
    PropertyLookupService.getAreaItems()
      .then((res) => {
        setAreaModel(res.data);
      })
      .catch((err) => console.log(err));
  };
  const fetchCityItems = () => {
    PropertyLookupService.getCityItems()
      .then((res) => {
        setCityModel(res.data);
      })
      .catch((err) => console.log(err));
  };
  const fetchPaymentMethodItems = () => {
    PropertyLookupService.getPaymentMethodItems()
      .then((res) => {
        setPaymentMethodModel(res.data);
      })
      .catch((err) => console.log(err));
  };
  const fetchPropertyCategoryItems = () => {
    PropertyLookupService.getPropertyCategoryItems()
      .then((res) => {
        setPropertyCategoryModel(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    AppSettingsService.getUserTerms().then((res) =>
      setUserTermsText(res.data.userTerms)
    );

    fetchPropertyTypeItems();
    fetchAcTypeItems();
    fetchAreaItems();
    fetchCityItems();
    fetchPaymentMethodItems();
    fetchPropertyCategoryItems();
  }, []);

  if (
    propertyTypeModel == null ||
    acTypeModel == null ||
    areaModel == null ||
    cityModel == null ||
    paymentMethodModel == null ||
    propertyCategoryModel == null
  ) {
    return null;
  }

  const pickExternalImages = async () => {
    // No permissions request is necessary for launching the image library
    setIsLoading(true);
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 4],
      quality: 1,
    });
    setIsLoading(false);
    if (result.cancelled) {
      return;
    }
    const imageName = await PropertyService.uploadPropertyImage(result.uri);
    setExternalImage(result.uri ? [result] : result.selected);
    set_external_image(imageName);
  };

  const pickInternalImages = async () => {
    // No permissions request is necessary for launching the image library
    setIsLoading1(true);
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 4],
      quality: 1,
    });
    setIsLoading1(false);
    if (result.cancelled) {
      return;
    }
    const imageName1 = await PropertyService.uploadPropertyImage(result.uri);
    setInternalImages(
      result.uri ? [...internalImages, result] : result.selected
    );
    if (image_names === "") {
      set_image_names(imageName1);
    } else {
      set_image_names(image_names + "," + imageName1);
    }

    setTimeout(() => {
      console.log(
        "-----------------------------------------------------------------------------------------------"
      );
      console.log(internalImages);
      console.log(
        "---------------------------------------------------------------------------------------"
      );
      console.log(image_names);
    }, 5000);
  };

  return (
    <>
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
        <KeyboardView style={false}>
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.container2}>
              <View style={[styles.container3, styles.pickerWidth]}>
                <Text style={styles.TextStype}>{getString("Type")}</Text>
                <Picker
                  items={propertyTypeModel}
                  name="name"
                  id="id"
                  onChangeValue={(item) => set_property_type_id(item)}
                />
              </View>
              <View style={[styles.container3, styles.pickerWidth]}>
                <Text style={styles.TextStype}>{getString("Categories")}</Text>
                <Picker
                  items={propertyCategoryModel}
                  name="name"
                  id="id"
                  onChangeValue={(item) => set_property_category_id(item)}
                />
              </View>
            </View>
            <Separator height={16} />
            <View style={styles.container2}>
              <View style={styles.container3}>
                <Text style={styles.TextStype}>{getString("title")}</Text>
                <TextInput
                  inputProps={{
                    placeholder: getString("title"),
                    value: title,
                    onChangeText: set_title,
                    width: 200,
                  }}
                />
              </View>
              <View style={styles.container3}>
                <CheckBox
                  text={getString("Generator")}
                  isChecked={featured}
                  onPress={() => {
                    if (featured) set_featured(false);
                    else set_featured(true);
                  }}
                  style={{ marginTop: 40 }}
                />
              </View>
              <View style={styles.container3}>
                <CheckBox
                  text={getString("Visible")}
                  isChecked={visible}
                  onPress={() => {
                    if (visible) set_visible(false);
                    else set_visible(true);
                  }}
                  style={{ marginTop: 40 }}
                />
              </View>
            </View>
            <Separator height={16} />
            <Text style={styles.TextStype}>{getString("Description")}</Text>
            <TextInput
              inputProps={{
                placeholder: getString("Description"),
                value: description,
                multiline: true,
                numberOfLines: 14,
                onChangeText: set_description,
                style: { height: 100 },
              }}
            />
            <Separator height={16} />
            <View style={styles.container2}>
              <View style={[styles.container3, styles.pickerWidth]}>
                <Text style={styles.TextStype}>{getString("City")}</Text>
                <Picker
                  items={cityModel}
                  name="name"
                  id="id"
                  onChangeValue={(item) => set_city_id(item)}
                />
              </View>
              <View style={[styles.container3, styles.pickerWidth]}>
                <Text style={styles.TextStype}>{getString("Area")}</Text>
                <Picker
                  items={areaModel}
                  name="name"
                  id="id"
                  onChangeValue={(item) => set_area_id(item)}
                />
              </View>
            </View>
            <Separator height={16} />
            <View style={styles.container2}>
              <View style={styles.container3}>
                <Text style={styles.TextStype}>{getString("Number Bed")}</Text>
                <TextInput
                  inputProps={{
                    placeholder: getString("Number Bed"),
                    keyboardType: "numeric",
                    value: bed_room_count,
                    onChangeText: set_bed_room_count,
                    width: 113,
                  }}
                />
              </View>
              <View style={styles.container3}>
                <Text style={styles.TextStype}>{getString("Number Bath")}</Text>
                <TextInput
                  inputProps={{
                    placeholder: getString("Number Bath"),
                    keyboardType: "numeric",
                    value: bath_room_count,
                    onChangeText: set_bath_room_count,
                    width: 113,
                  }}
                />
              </View>
              <View style={styles.container3}>
                <Text style={styles.TextStype}>{getString("Floor No")}</Text>
                <TextInput
                  inputProps={{
                    placeholder: getString("Floor No"),
                    keyboardType: "numeric",
                    value: kitchen_room_count,
                    onChangeText: set_kitchen_room_count,
                    width: 113,
                  }}
                />
              </View>
            </View>
            <Separator height={16} />
            <View style={styles.container2}>
              <View style={[styles.container3, styles.pickerWidthMin]}>
                <Text style={styles.TextStype}>{getString("AC Type")}</Text>
                <Picker
                  items={acTypeModel}
                  name="name"
                  id="id"
                  onChangeValue={(item) => set_ac_type_id(item)}
                />
              </View>
              <View style={styles.container3}>
                <Text style={styles.TextStype}>{getString("AC")}</Text>
                <TextInput
                  inputProps={{
                    placeholder: getString("AC"),
                    keyboardType: "numeric",
                    value: parking_count,
                    onChangeText: set_parking_count,
                    width: 113,
                  }}
                />
              </View>
              <View style={styles.container3}>
                <Text style={styles.TextStype}>{getString("Maximum")}</Text>
                <TextInput
                  inputProps={{
                    placeholder: getString("Maximum"),
                    keyboardType: "numeric",
                    value: maximum,
                    onChangeText: set_maximum,
                    width: 113,
                  }}
                />
              </View>
            </View>
            <Separator height={16} />
            <View style={styles.container2}>
              <View style={styles.container3}>
                <Text style={styles.TextStype}>{getString("Additional Features")}</Text>
                <TextInput
                  inputProps={{
                    placeholder: getString("Additional Features"),
                    value: additional_features,
                    onChangeText: set_additional_features,
                    width: 226,
                  }}
                />
              </View>
              <View style={styles.container3}>
                <Text style={styles.TextStype}>{getString("Size")}</Text>
                <TextInput
                  inputProps={{
                    placeholder: getString("Size"),
                    keyboardType: "numeric",
                    value: size,
                    onChangeText: set_size,
                    width: 113,
                  }}
                />
              </View>
            </View>
            <Separator height={16} />
            <View style={styles.container2}>
              <View style={[styles.container3, styles.pickerWidthMin]}>
                <Text style={styles.TextStype}>{getString("Payment Method")}</Text>
                <Picker
                  items={paymentMethodModel}
                  name="name"
                  id="id"
                  onChangeValue={(item) => set_payment_method_id(item)}
                />
              </View>
              <View style={[styles.container3, styles.pickerWidthMin]}>
                <Text style={styles.TextStype}>{getString("Currency")}</Text>
                <Picker
                  items={items}
                  name="name"
                  id="id"
                  onChangeValue={(item) => set_currency(item)}
                />
              </View>
              <View style={styles.container3}>
                <Text style={styles.TextStype}>{getString("Price")}</Text>
                <TextInput
                  inputProps={{
                    placeholder: getString("Price"),
                    keyboardType: "numeric",
                    value: price,
                    onChangeText: set_price,
                    width: 113,
                  }}
                />
              </View>
            </View>
            <Separator height={16} />
            <Text style={styles.TextStype}>{getString("Address")}</Text>
            <TextInput
              inputProps={{
                placeholder: getString("Address"),
                value: address,
                multiline: true,
                numberOfLines: 14,
                onChangeText: set_address,
                style: { height: 100 },
              }}
            />
            <Separator height={16} />
            <View style={styles.container2}>
              <View style={styles.container3}>
                <Text style={styles.TextStype}>{getString("Latitude")}</Text>
                <TextInput
                  inputProps={{
                    placeholder: getString("Latitude"),
                    keyboardType: "numeric",
                    value: latitude,
                    onChangeText: set_latitude,
                    width: 170,
                  }}
                />
              </View>
              <View style={styles.container3}>
                <Text style={styles.TextStype}>{getString("Longitude")}</Text>
                <TextInput
                  inputProps={{
                    placeholder: getString("Longitude"),
                    keyboardType: "numeric",
                    value: longitude,
                    onChangeText: set_longitude,
                    width: 170,
                  }}
                />
              </View>
            </View>
            <Separator height={24} />
            <FlatList
              data={externalImage}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.uri }}
                  style={{ width, height: 250 }}
                />
              )}
              numColumns={2}
              keyExtractor={(item) => item.uri}
              contentContainerStyle={{ marginVertical: 3, paddingBottom: 3 }}
              ListHeaderComponent={
                isLoading ? (
                  <View>
                    <Text
                      style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
                    >
                      {getString("Loading Images")}
                    </Text>
                    <ActivityIndicator size={"large"} />
                  </View>
                ) : (
                  <Button
                    title={getString("External Image")}
                      onPress={pickExternalImages}
                  />
                )
              }
            />
            <Separator height={24} />
            <FlatList
              data={internalImages}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: width / 2, height: 250 }}
                />
              )}
              numColumns={2}
              keyExtractor={(item) => item.uri}
              contentContainerStyle={{ marginVertical: 3, paddingBottom: 3 }}
              ListHeaderComponent={
                isLoading1 ? (
                  <View>
                    <Text
                      style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
                    >
                      {getString("Loading Images")}
                    </Text>
                    <ActivityIndicator size={"large"} />
                  </View>
                ) : (
                  <Button
                    title={getString("Internal Images")}
                      onPress={pickInternalImages}
                  />
                )
              }
            />
            <Separator height={24} />
            <CheckBox
              text={getString("UserTermConfirmText")}
              isChecked={userTermsConfirm}
              onPress={() => {
                if (userTermsConfirm) setUserTermsConfirm(false);
                else setUserTermsShowModal(true);
              }}
              style={{ marginStart: 4 }}
            />
            <Separator height={24} />
            <PrimaryButton
              title={getString("Save Property")}
              onPress={onClickSaveProperty}
            />
          </ScrollView>
        </KeyboardView>
      </SafeAreaView>
      <ReactNativeModal
        isVisible={userTermsShowModal}
        style={{ margin: 16 }}
        backdropOpacity={0.5}
        swipeDirection="down"
        onSwipeComplete={() => setUserTermsShowModal(false)}
      >
        <SafeAreaView forceInset={{ top: "always", bottom: "always" }}>
          <ScrollView
            style={styles.modalContainer}
            contentContainerStyle={styles.modalContentContainer}
          >
            <HtmlView
              htmlContent={userTermsText}
              imagesMaxWidthOffset={WIDTH - 32}
            />
            <PrimaryButton
              title={getString("CONFIRM")}
              onPress={() => {
                setUserTermsShowModal(false);
                setUserTermsConfirm(true);
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </ReactNativeModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flexDirection: "row",
  },
  container3: {
    flexDirection: "column",
    paddingRight: 10,
  },
  content: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  titleText: {
    fontSize: 42,
    fontFamily: "default-light",
    color: Theme.colors.primaryColor,
    marginBottom: 24,
  },
  registerButton: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  registerButtonTitle: { color: Theme.colors.gray },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
  },
  modalContentContainer: {
    padding: 16,
  },
  TextStype: {
    paddingBottom: 10,
  },
  pickerWidth: {
    width: 180,
  },
  pickerWidthMin: {
    width: 125,
  },
});
