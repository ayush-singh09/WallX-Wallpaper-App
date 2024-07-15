import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  Share,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import { BlurView } from "expo-blur";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const uri = item?.largeImageURL;
  const fileName = item?.largeImageURL.split("/").pop();
  const imageUrl = uri;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "We need permission to access your media library to save the photo."
        );
      }
    })();
  }, []);

  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);

      // Save to gallery
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      showToast();
      return asset.uri;
    } catch (err) {
      console.log(err.message);
      showErrorToast(err.message);
    }
  };

  const getDimension = (height, width) => {
    if (width > height) return "h-[200px]";
    else return "h-[400px]";
  };

  const handleDownloadImage = async () => {
    // Request permission to access media library
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "We need permission to access your media library to save the photo."
      );
      return;
    }

    await downloadFile();
  };

  const handleSharing = async () => {
    try {
      const result = await Share.share({
        message: item.largeImageURL,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Hey buddy 👋",
      text2: "Successfuly downloaded ❤️",
    });
  };

  const showErrorToast = (error) => {
    Toast.show({
      type: "error",
      text1: "Sorry 🥺",
      text2: error,
    });
  };

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "pink" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
      />
    ),
    
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };

  return (
    <BlurView
      className="flex-1 items-center justify-center p-10"
      tint="dark"
      intensity={120}
    >
      <View className="mb-10 w-full h-fit relative items-center justify-center">
        <View className="absolute">
          <Feather name="loader" size={40} color="white" />
        </View>
        <Image
          className={` ${getDimension(
            item.webformatHeight,
            item.webformatWidth
          )} w-full rounded-lg top-0`}
          source={{ uri: item.webformatURL }}
        />
      </View>
      <View className="flex-row gap-5">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-zinc-300 p-3 rounded-lg"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDownloadImage}
          className="bg-zinc-300 p-3 rounded-lg"
        >
          <MaterialCommunityIcons name="download" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSharing}
          className="bg-zinc-300 p-3 rounded-lg"
        >
          <Entypo name="share" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Toast config={toastConfig} />
    </BlurView>
  );
};

export default ImageScreen;