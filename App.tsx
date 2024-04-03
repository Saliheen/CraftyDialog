import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetsMethods } from "./components/BottomSheet";
import { useCallback, useRef } from "react";
import Example from "./components/Example";
import BottomSheetScrollView from "./components/BottomSheetScrollView";
import Lorem from "./components/Lorem";

export default function App() {
  const bottomSheetRef1 = useRef<BottomSheetsMethods>(null);
  const bottomSheetRef2 = useRef<BottomSheetsMethods>(null);
  const bottomSheetRef3 = useRef<BottomSheetsMethods>(null);

  const handlerOne = useCallback(() => {
    bottomSheetRef1?.current?.expand();
  }, []);

  const handlerTwo = useCallback(() => {
    bottomSheetRef2?.current?.expand();
  }, []);

  const handlerThree = useCallback(() => {
    bottomSheetRef3?.current?.expand();
  }, []);


  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 50,
            }}
          >
            <Button title="DEMO 1" onPress={handlerOne} />
            <Button title="DEMO 2" onPress={handlerTwo} />
            <Button title="DEMO 3" onPress={handlerThree} />
          </View>
          <BottomSheet
            snapTo="50%"
            backgroundColor={"pink"}
            backdropColor={"gray"}
            ref={bottomSheetRef1}
          />
            
          <BottomSheetScrollView
            snapTo="60%"
            backgroundColor={"#a285a6"}
            backdropColor={"#ffe7cf"}
            ref={bottomSheetRef3}
          >
          <Lorem />
          </BottomSheetScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});
