import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

import { ListingItemView, Separator } from "../../components";
import { AuthenticationContext, LikedPropertiesContext } from "../../context";
import { Property } from "../../models";
import NavigationNames from "../../navigations/NavigationNames";
import { PropertyService } from "../../services";

export const OwnerPropertiesScreen = () => {
  const navigation = useNavigation();
  const [myProperties, setMyProperties] = useState({});
  const authContext = useContext(AuthenticationContext);

  useEffect(() => {
    if (authContext.isLoggedIn) {
      PropertyService.getMyProperties()
        .then((res) => {
          console.log(res.data);
          var properties: { [id: string]: Property } = {};
          (res.data as Property[]).forEach((item) => {
            properties[item.id] = item;
          });
          setMyProperties(properties);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            authContext.logout();
          } else {
            Alert.alert(err.message);
          }
        });
    } else {
      setMyProperties({});
    }
  }, [authContext.isLoggedIn]);
  let propertiesNew = [];
  if (myProperties)
    propertiesNew = Object.keys(myProperties).map((a) => myProperties[a]);

  const onClickItem = (item: Property) => {
    navigation.navigate(NavigationNames.PropertyDetailScreenForProfileTab, {
      model: { ...item },
    });
  };

  return (
    <FlatList
      data={propertiesNew}
      keyExtractor={(_, index) => `key${index}`}
      ItemSeparatorComponent={() => <Separator />}
      contentContainerStyle={{ paddingVertical: 16 }}
      renderItem={({ item }) => {
        return (
          <ListingItemView model={item} onClick={() => onClickItem(item)} />
        );
      }}
    />
  );
};
