import {
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ViewPager from "@react-native-community/viewpager";
import { useNavigation } from "@react-navigation/native";
import numeral from "numeral";
import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  NativeSyntheticEvent,
  TouchableOpacity,
} from "react-native";
import { Pagination } from "react-native-snap-carousel";

import { AuthenticationContext, LikedPropertiesContext } from "../../context";
import { getImageUrl } from "../../helpers";
import { useLocalization } from "../../localization";
import { Property, PropertyRequest } from "../../models";
import NavigationNames from "../../navigations/NavigationNames";
import { PropertyService } from "../../services";
import { Theme } from "../../theme";
import { Box } from "../box";
import { LikeButton } from "../buttons";
import { Divider } from "../divider";
import { Text } from "../text";

const SLIDER_HEIGHT = 180;

const PropertyDetail: React.FC<{
  iconName: string;
  title: string;
}> = ({ iconName, title }) => (
  <View style={styles.propertyContent}>
    <FontAwesome name={iconName} size={17} color={Theme.colors.yellow} />
    <Text style={styles.propertyTitle}>{title}</Text>
  </View>
);

type TProps = {
  model: PropertyRequest;
  onClick: () => void;
};

export const ListingItemRequest: React.FC<TProps> = ({ model, onClick }) => {
  const { isLoggedIn } = useContext(AuthenticationContext);
  const { likedProperties, likeProperty } = useContext(LikedPropertiesContext);
  const navigation = useNavigation();
  const { getString } = useLocalization();
  const [indicatorIndex, setIndicatorIndex] = useState(0);

  return (
    <Box style={styles.container}>
      <View style={[styles.labelContent]}>
        <Text style={styles.labelText}>{model.status.name}</Text>
      </View>
      <TouchableOpacity onPress={onClick}>
        <View style={styles.ph16}>
          <View style={styles.mv14}>
            <Text style={styles.priceText}>
              {`${model.user.firstName} ${model.user.lastName}`}
            </Text>
            <View style={styles.infoContainer}>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome name="bank" size={14} />
                <Text style={[styles.locationText, { paddingRight: 5 }]}>
                  {model.property.title}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <FontAwesome name="clipboard" size={14} />
                <Text style={[styles.locationText, { paddingRight: 5 }]}>
                  {model.tenantType.name}
                </Text>
              </View>
            </View>
          </View>
          <Divider />
          <View style={styles.propertiesContainer}>
            <PropertyDetail
              iconName="qrcode"
              title={getString("NumberRequestWithCount", {
                count: model.id,
              })}
            />
            <PropertyDetail
              iconName="users"
              title={getString("Person", {
                count: model.property.maximum,
              })}
            />
            <View style={styles.propertyContent}>
              <FontAwesome
                name="calendar"
                size={17}
                color={Theme.colors.yellow}
              />
              <Text style={styles.propertyTitle}>
                {`${model.period} ${model.rentalTerm.name}`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 16 },
  viewPager: { height: SLIDER_HEIGHT, overflow: "hidden" },
  viewPagerItemImage: {
    flex: 1,
    borderTopLeftRadius: Theme.sizes.boxBorderRadius,
    borderTopRightRadius: Theme.sizes.boxBorderRadius,
  },
  paginationContainer: {
    position: "absolute",
    margin: 0,
    minHeight: 0,
    paddingVertical: 0,
    bottom: 14,
    alignSelf: "center",
  },
  paginationDot: { marginHorizontal: -20 },
  labelContent: {
    backgroundColor: Theme.colors.yellow,
    position: "absolute",
    paddingHorizontal: 8,
    paddingVertical: 4,
    right: 16,
    top: 10,
    borderRadius: 4,
    zIndex: 10,
  },
  labelText: {
    color: "white",
    fontFamily: "default-medium",
    fontSize: 11,
  },
  likeIcon: {
    position: "absolute",
    top: SLIDER_HEIGHT - 18,
    right: 16,
    zIndex: 5,
  },
  ph16: { paddingHorizontal: 16 },
  mv14: { paddingVertical: 14 },
  priceText: {
    fontFamily: "default-medium",
    fontSize: 18,
    color: Theme.colors.textColor,
    textAlign: "justify",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    opacity: 0.4,
  },
  locationText: {
    color: "black",
    fontSize: 13,
    fontFamily: "default-medium",
  },
  propertiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 14,
    alignItems: "center",
    alignContent: "center",
  },
  propertyContent: { flexDirection: "row" },
  propertyTitle: {
    marginStart: 12,
    fontSize: 13,
    marginTop: 1,
    color: Theme.colors.yellowDark,
    fontFamily: "default-medium",
  },
});
