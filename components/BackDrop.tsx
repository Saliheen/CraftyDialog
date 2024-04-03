import { View, Text,StyleSheet } from "react-native";
import React from "react";
import { SharedValue } from "react-native-reanimated";

type Props = {
  topAnimation: SharedValue<number>;
  openHeight: number;
  closeHeight: number;
  close: () => void;
};

const BackDrop = ({ topAnimation, openHeight, closeHeight, close }: Props) => {
  return (
    <View>
      <Text>BackDrop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor:'gray'
  }
})

export default BackDrop;
