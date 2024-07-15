import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const PhotoCard = ({ getDimension, photo, index, router }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({ pathname: "ImageScreen", params: { ...photo } });
      }}
      key={index}
      className="h-fit w-full rounded-lg border border-zinc-300 overflow-hidden p-2"
    >
      <Image
        className={`w-full ${getDimension(
          photo.webformatHeight,
          photo.webformatWidth
        )} rounded-lg`}
        source={{
          uri: photo?.largeImageURL,
        }}
      />
      <View className="h-14 mt-2  rounded-lg items-center flex-row px-2">
        <Image
          className={`h-10 w-10 rounded-full`}
          source={{
            uri:
              photo?.userImageURL ||
              "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg",
          }}
        />
        <Text className="text-lg font-bold ml-2">{photo.user}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PhotoCard