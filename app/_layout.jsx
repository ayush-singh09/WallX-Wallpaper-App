import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="ImageScreen"
        options={{
          presentation: "transparentModal",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="Filter"
        options={{
          presentation: "transparentModal",
          animation: "fade",
        }}
      />
    </Stack>
  );
};

export default _layout;
