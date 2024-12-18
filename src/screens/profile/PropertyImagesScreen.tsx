import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export const PropertyImagesScreen = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();

  const pickImages = async () => {
    // No permissions request is necessary for launching the image library
    setIsLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 10,
      aspect: [4, 3],
      quality: 1,
    });
    setIsLoading(false);
    console.log(result);
    if (!result.cancelled) {
      console.log(result.uri);
      setImages(result.uri ? [result] : result.selected);
    }

    console.log(images);
  };

  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item.uri }}
          style={{ width: width / 2, height: 250 }}
        />
      )}
      numColumns={2}
      keyExtractor={(item) => item.uri}
      contentContainerStyle={{ marginVertical: 50, paddingBottom: 100 }}
      ListHeaderComponent={
        isLoading ? (
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              جاري التحميل ...
            </Text>
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <Button title="Pick images" onPress={pickImages} />
        )
      }
    />
  );
}