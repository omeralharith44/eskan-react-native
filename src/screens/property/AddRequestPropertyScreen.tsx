import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ViewStyle,
  StyleProp,
  SafeAreaView,
  Alert,
} from "react-native";

import {
  SectionHeader,
  Divider,
  SimpleButton,
  Text,
  Picker,
  Separator,
  TextInput,
} from "../../components";
import { AuthenticationContext } from "../../context";
import { useLocalization } from "../../localization";
import { AcType, Area, City, PaymentMethod, Property, PropertyCategory, PropertyType, RentalTerm, TenantType, User } from "../../models";
import { PropertyLookupService, PropertyRequestService } from "../../services";
import { Theme } from "../../theme";

const SectionContent: React.FC<{
  title: string;
  contentStyle?: StyleProp<ViewStyle>;
}> = ({ title, children, contentStyle }) => (
  <View style={{ paddingVertical: 8 }}>
    <SectionHeader title={title} />
    <View style={[styles.sectionChildrenContent, contentStyle]}>
      {children}
    </View>
  </View>
);

export const AddRequestPropertyScreen = () => {
  const { getString } = useLocalization();
  const navigation = useNavigation();

  const authContext = useContext(AuthenticationContext);
  const [userInfo, setUserInfo] = useState<User>(authContext.user);

  const [tenantTypeModel, setTenantTypeModel] = useState<TenantType>(null);
  const [rentalTermModel, setRentalTermModel] = useState<RentalTerm>(null);

  const [tenant_type_id, set_tenant_type_id] = useState(0);
  const [rental_term_id, set_rental_term_id] = useState(0);
  const [period, set_period] = useState(0);

  const route = useRoute();

  const model = route.params["model"] as Property;

  const fetchTenantTypeItems = () => {
    PropertyLookupService.getTenantTypeItems()
      .then((res) => {
        setTenantTypeModel(res.data);
      })
      .catch((err) => console.log(err));
  };
  const fetchRentalTermItems = () => {
    PropertyLookupService.getRentalTermItems()
      .then((res) => {
        setRentalTermModel(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTenantTypeItems();
    fetchRentalTermItems();
  }, []);

  if (tenantTypeModel == null || rentalTermModel == null) {
    return null;
  }

  const onClickAccept = () => {
    if (tenant_type_id === 0 || rental_term_id === 0 || period === 0) {
      Alert.alert(getString("Please fill fields"));
      return;
    }
    const periodInt = parseInt(period.toString(), 10);
    PropertyRequestService.savePropertyRequest(
      model.id,
      tenant_type_id,
      rental_term_id,
      periodInt,
      1,
      userInfo.id
    )
      .then((Response) => {
        Alert.alert(getString("Done Request"));
        // x2 goback for first and register screens.
        navigation.goBack();
        navigation.goBack();
      })
      .catch((e) => Alert.alert(e.message));
  };

  return (
    <>
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
        <View style={styles.moneyContainer}>
          <Text style={styles.moneyTitle}>{getString("Property")}</Text>
          <Text style={styles.moneyText}>{model.title}</Text>
        </View>

        <Divider />

        <Separator height={24} />
        <Text style={styles.TextStype}>
          {getString("The purpose of the Property")}
        </Text>
        <Picker
          items={tenantTypeModel}
          name="name"
          id="id"
          onChangeValue={(item) => set_tenant_type_id(item)}
        />
        <Separator height={24} />
        <Text style={styles.TextStype}>{getString("Duration")}</Text>
        <TextInput
          inputProps={{
            placeholder: getString("Duration"),
            keyboardType: "numeric",
            value: { period },
            onChangeText: set_period,
          }}
        />
        <Separator height={24} />
        <Text style={styles.TextStype}>{getString("Rental Terms")}</Text>
        <Picker
          items={rentalTermModel}
          name="name"
          id="id"
          onChangeValue={(item) => set_rental_term_id(item)}
        />
        <Separator height={24} />
        <SimpleButton
          title={getString("Contact")}
          onPress={onClickAccept}
          bgColor={Theme.colors.primaryColor}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  headerView: { backgroundColor: "white" },
  headerDivider: { position: "absolute", bottom: 0, left: 0, right: 0 },
  scrollView: { flex: 1, backgroundColor: "white" },
  scrollViewContainer: { paddingBottom: 24 },
  moneyContainer: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  moneyTitle: {
    fontFamily: "default-medium",
    color: Theme.colors.primaryColorDark,
  },
  moneyText: {
    color: Theme.colors.textColor,
    fontSize: 24,
    fontFamily: "default-medium",
    paddingVertical: 8,
    textAlign: "justify",
  },
  monthlyText: { fontSize: 14, color: "gray", textAlign: "justify" },
  propertiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
    alignContent: "center",
  },
  propertyContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  propertyTitle: {
    fontSize: 12,
    marginTop: 8,
    color: "gray",
  },
  previewImages: { marginHorizontal: -16 },
  previewImagesContainer: { paddingVertical: 8, paddingHorizontal: 16 },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: Theme.sizes.boxBorderRadius,
  },
  propertyDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  propertyDetailTitle: {
    fontSize: 15,
    marginStart: 12,
    color: Theme.colors.textColor,
  },
  mapViewContainer: {
    borderRadius: Theme.sizes.boxBorderRadius,
    overflow: "hidden",
  },
  mapView: {
    borderRadius: Theme.sizes.boxBorderRadius,
    height: 180,
  },
  contactContent: {
    flexDirection: "row",
  },
  contactName: {
    fontSize: 18,
    fontFamily: "default-medium",
    color: Theme.colors.primaryColorDark,
    textAlign: "justify",
  },
  contactAddress: {
    fontSize: 13,
    fontFamily: "default-medium",
    color: "gray",
    marginTop: 4,
  },
  sectionChildrenContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  TextStype: {
    paddingBottom: 10,
  },
});
