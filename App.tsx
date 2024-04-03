import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetsMethods } from "./components/BottomSheet";
import { useCallback, useRef } from "react";

export default function App() {
  const bottomSheetRef = useRef<BottomSheetsMethods>(null)

  const expandHandler = useCallback(()=>{
    bottomSheetRef?.current?.expand()
  },[])

  const closeHandler = useCallback(()=>{
    bottomSheetRef?.current?.close()
  },[])

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style = {styles.container}>
          <View style = {{
            display:'flex',
            flexDirection:'row',
            gap:10,
            marginBottom:50
          }}>
          <Button title="Expand" onPress={expandHandler}/>
          <Button title="Close" onPress={closeHandler}/>
          </View>
        <BottomSheet snapTo='50%' backgroundColor={'pink'} ref = {bottomSheetRef}/>
        </SafeAreaView>
      </GestureHandlerRootView>
      
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  alignItems:'center'
  },
});
