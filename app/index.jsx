import { View, ScrollView } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { apiCall } from "../api/index";
import { useRouter } from "expo-router";
import Header from "../components/Header";
import PhotoCard from "../components/PhotoCard";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const scrollViewRef = useRef(null);

  const getPhotos = async () => {
    const data = await apiCall(search);
    setPhotos(data);
  };

  const getDimension = (height, width) => {
    if (width > height) return "h-[250px]";
    else return "h-[400px]";
  };

  var timer;
  const debounceSearch = (text) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearch(text);
      scrollToTop();
    }, 500);
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  useEffect(() => {
    getPhotos();
  }, [search]);

  return (
    <View className=" bg-white h-full">
      <StatusBar style="light" />

      <Header debounceSearch={debounceSearch} scrollToTop={scrollToTop} />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          alignItems: "center",
          gap: 20,
        }}
        className="p-5"
      >
        {photos.map((photo, index) => {
          return (
            <PhotoCard
              key={index}
              getDimension={getDimension}
              photo={photo}
              index={index}
              router={router}
            />
          );
        })}
        <View className="w-full h-[40px]"></View>
      </ScrollView>
    </View>
  );
};

export default Home;
