import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type TProps = {
  items: any;
  onChangeValue?: () => void;
  name: string;
  id: string;
};

export const Picker: React.FC<TProps> = ({
  items,
  onChangeValue,
  name = "label",
  id = "value",
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  DropDownPicker.setLanguage("AR");
  return (
    <DropDownPicker
      schema={{
        label: name,
        value: id,
      }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={onChangeValue}
      dropDownContainerStyle={styles.container}
      rtl
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    zIndex: 1000,
    elevation: 1000,
  },
});
