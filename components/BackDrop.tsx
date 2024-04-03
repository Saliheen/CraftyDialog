import {  StyleSheet, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  topAnimation: SharedValue<number>;
  openHeight: number;
  closeHeight: number;
  backdropColor:String;
  close: () => void;
};

const BackDrop = ({ topAnimation, openHeight, closeHeight, close ,backdropColor}: Props) => {
  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      topAnimation.value,
      [openHeight, closeHeight],
      [0.5, 0]
    );
    const display = opacity === 0 ? "none" : "flex";
    return {
      opacity,
      display,
    };
  });

  return (
   <TouchableWithoutFeedback onPress={close}>
     <Animated.View style={[styles.container, backDropAnimation,{backgroundColor:backdropColor}]} pointerEvents={'none'}>
    </Animated.View>
   </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
   
  },
});

export default BackDrop;
