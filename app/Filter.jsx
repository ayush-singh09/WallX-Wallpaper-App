import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { useLocalSearchParams } from "expo-router";

const Filter = () => {
  const categories = [
    "backgrounds",
    "fashion",
    "nature",
    "science",
    "education",
    "feelings",
    "health",
    "people",
    "religion",
    "places",
    "animals",
    "industry",
    "computer",
    "food",
    "sports",
    "transportation",
    "travel",
    "buildings",
    "business",
    "music",
  ];

  const [colors, setColors] = useState([
    {
      color: "grayscale",
      code: "#7a7a7a70",
      active: false,
    },
    {
      color: "transparent",
      code: "#e5e5e570",
      active: false,
    },
    {
      color: "red",
      code: "#ff454595",
      active: false,
    },
    {
      color: "orange",
      code: "#f76f1a90",
      active: false,
    },
    {
      color: "yellow",
      code: "#f7f748a0",
      active: false,
    },
    {
      color: "green",
      code: "#23ff328e",
      active: false,
    },
    {
      color: "turquoise",
      code: "#53ffee8a",
      active: false,
    },
    {
      color: "blue",
      code: "#3e7eff94",
      active: false,
    },
    {
      color: "lilac",
      code: "#ff8eff90",
      active: false,
    },
    {
      color: "pink",
      code: "#ff50e88f",
      active: false,
    },
    {
      color: "white",
      code: "#eaeaea88",
      active: false,
    },
    {
      color: "gray",
      code: "#b1b1b199",
      active: false,
    },
    {
      color: "black",
      code: "#1e1e1e62",
      active: false,
    },
    {
      color: "brown",
      code: "#7a1a1a7a",
      active: false,
    },
  ]);

  const activateColor = (color)=>{
    setColors(prev=>[...prev,{color:color.color, code:color.code, active:!color.active}])
  }

  return (
    <BlurView
      intensity={100}
      tint="dark"
      className="h-screen items-center justify-center px-5"
    >
      <View className="w-full h-[500px] bg-white rounded-md p-4">
        <Text className="text-2xl font-bold">Filter</Text>
        <View className="h-[1px] w-full bg-zinc-500 my-1"></View>
        <Text className="text-lg">Category:</Text>
        <View className="flex-row flex-wrap gap-1 mt-1">
          {categories.map((cat, index) => {
            return (
              <Pressable key={index}>
                <Text
                  className="bg-[#5da3ff5a] w-fit px-3 py-1 rounded-full"
                  key={index}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text className="text-lg">Colors:</Text>
        <View className="flex-row flex-wrap gap-1 mt-1">
          {colors.map((color, index) => {
            return (
              <Pressable
                className={`bg-[#c838fd83] ${
                  color.active ? "opacity-100" : "opacity-70"
                } text-black w-fit px-3 py-1 rounded-md`}
                key={index}
              >
                <Text>{color.color}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </BlurView>
  );
};

export default Filter;
