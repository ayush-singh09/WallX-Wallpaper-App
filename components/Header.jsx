import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const Header = ({ scrollToTop, debounceSearch , handleCategory }) => {

  const router = useRouter();
  
  return (
    <View className="relative flex items-center justify-center">
      <Image
        className="w-full h-[170px]"
        source={{
          uri: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
      />
      <View className="w-full h-full absolute items-center justify-center px-5">
        <View className="w-full mb-5 flex-row items-center justify-between px-1">
          <Text
            onPress={scrollToTop}
            className="text-[40px] font-bold text-white"
          >
            WALL-X
          </Text>
          <TouchableOpacity
            onPress={() =>
              router.push("Filter")
            }
          >
            <AntDesign name="filter" size={26} color="white" />
          </TouchableOpacity>
        </View>
        <View className="w-full flex-row items-center bg-white rounded-lg px-2">
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            onChangeText={(value) => debounceSearch(value)}
            className="placeholder:text-white text-black flex-1 p-2"
            placeholder="Search something..."
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
