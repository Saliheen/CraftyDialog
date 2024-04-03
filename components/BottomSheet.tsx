import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useCallback, useImperativeHandle, forwardRef, ReactNode } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import BackDrop from "./BackDrop";

type Props = {
  snapTo: String;
  backgroundColor: String;
  backdropColor:String;
  children?:ReactNode
};

export interface BottomSheetsMethods {
  expand: () => void;
  close: () => void;
}

const { height } = Dimensions.get("screen");

const BottomSheet = forwardRef<BottomSheetsMethods, Props>(
  ({ snapTo, backgroundColor ,backdropColor,children}: Props, ref) => {
    const closeHeight = height;
    const percentage = parseFloat(snapTo.replace("%", "")) / 100;
    const openHeight = height - height * percentage;

    const topAnimation = useSharedValue(closeHeight);
    const context = useSharedValue(0);

    const expand = useCallback(() => {
      "worklet";
      topAnimation.value = withTiming(openHeight);
    }, [openHeight, topAnimation]);

    const close = useCallback(() => {
      "worklet";
      topAnimation.value = withTiming(closeHeight);
    }, [closeHeight, topAnimation]);

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          expand,
          close,
        };
      },
      [expand, close]
    );

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate((e) => {
        if (e.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(e.translationY + context.value, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(() => {
        if (topAnimation.value > openHeight + 50) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onFinalize(() => {});

    return (
      <>
        <BackDrop
          topAnimation={topAnimation}
          closeHeight={closeHeight}
          openHeight={openHeight}
          close={close}
          backdropColor = {backdropColor}
        />
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.container,
              animationStyle,
              { backgroundColor: backgroundColor },
            ]}
          >
            <View style={styles.lineContainer}>
              <View style={styles.line}></View>
            </View>
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lineContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: "black",
    borderRadius: 20,
  },
});

export default BottomSheet;
