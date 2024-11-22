import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ViewStyle,
  StyleProp,
  Alert,
} from "react-native";

import { SectionHeader, Divider, SimpleButton, Text } from "../../components";
import { useLocalization } from "../../localization";
import { Property, PropertyRequest } from "../../models";
import { PropertyRequestService } from "../../services";
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

export const RequestDetailScreen = () => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const route = useRoute();

  const model = route.params["model"] as PropertyRequest;

  const onClickReject = () => {
    PropertyRequestService.savePropertyRequestStatus(model.id, 4)
      .then((Response) => {
        console.log(Response.data);
        Alert.alert(getString("Done Reject"));
        // x2 goback for first and register screens.
        navigation.goBack();
        navigation.goBack();
      })
      .catch((e) => Alert.alert(e.message));
  };
  const onClickAccept = () => {
    PropertyRequestService.savePropertyRequestStatus(model.id, 3)
      .then((Response) => {
        console.log(Response.data);
        Alert.alert(getString("Done Accept"));
        // x2 goback for first and register screens.
        navigation.goBack();
        navigation.goBack();
      })
      .catch((e) => Alert.alert(e.message));
  };

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={styles.moneyContainer}>
          <Text style={styles.moneyTitle}>{getString("Applicant Name")}</Text>
          <Text
            style={styles.moneyText}
          >{`${model.user.firstName} ${model.user.lastName}`}</Text>
        </View>
        <View style={styles.moneyContainer}>
          <Text style={styles.moneyTitle}>
            {getString("The purpose of the Property")}
          </Text>
          <Text style={styles.moneyText}>{model.tenantType.name}</Text>
        </View>

        <Divider />

        <View>
          <View style={styles.propertiesContainer}>
            <View style={styles.propertyContent}>
              <FontAwesome
                name="qrcode"
                size={25}
                color={Theme.colors.yellow}
              />
              <Text style={styles.propertyTitle}>
                {getString("NumberRequestWithCount", {
                  count: model.id,
                })}
              </Text>
            </View>

            <View style={styles.propertyContent}>
              <FontAwesome name="users" size={25} color={Theme.colors.yellow} />
              <Text style={styles.propertyTitle}>
                {getString("Person", {
                  count: model.property.maximum,
                })}
              </Text>
            </View>
            <View style={styles.propertyContent}>
              <FontAwesome
                name="calendar"
                size={25}
                color={Theme.colors.yellow}
              />
              <Text style={styles.propertyTitle}>
                {`${model.period} ${model.rentalTerm.name}`}
              </Text>
            </View>
          </View>
        </View>

        <Divider />

        <SectionContent
          title={getString("Property")}
          contentStyle={{ marginTop: -4 }}
        >
          <Text style={styles.moneyText}>{model.property.title}</Text>
        </SectionContent>

        <Divider />

        <SimpleButton
          title={getString("Accept")}
          onPress={onClickAccept}
          bgColor={Theme.colors.green}
        />
        <SimpleButton
          title={getString("Reject")}
          onPress={onClickReject}
          bgColor={Theme.colors.red}
        />
      </ScrollView>
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
});
