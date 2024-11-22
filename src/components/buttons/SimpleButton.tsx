import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Theme } from "../../theme";
import { Text } from "../text";

type TProps = {
  title: string;
  onPress?: () => void;
  bgColor: string;
};

export const SimpleButton: React.FC<TProps> = ({ title, onPress, bgColor }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: bgColor }]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: Theme.sizes.boxBorderRadius,
    borderColor: "white",
    borderWidth: 0,
    shadowColor: "#00000020",
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  text: { color: "white", fontSize: 16, fontFamily: "default-medium" },
});
