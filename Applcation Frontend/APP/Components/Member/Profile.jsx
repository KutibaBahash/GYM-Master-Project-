import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';

const defaultUserData = {
  ID_number: "00000000",
  first_name: "John",
  last_name: "Doe",
  phone_number: "050-000-0000",
  email: "john@gmail.com",
  encrypted_password: "",
  birth_date: "1990-01-01",
  joining_date: "2020-01-01",
  payment: 0,
  trainer: "N/A",
  height: 0,
  weight: 0,
  status: false,
  verificationCode: "",
  profileImage: null, // Default image set to null
};

export default function MemberProfile() {
  const [userData, setUserData] = useState(defaultUserData);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem("userData");
        if (userDataJSON !== null) {
          const parsedUserData = JSON.parse(userDataJSON);
          setUserData(parsedUserData);
        } else {
          setUserData(defaultUserData);
        }
      } catch (error) {
        setError("Error retrieving user data from AsyncStorage.");
        console.error("Error:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleImagePicker = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.uri;
      const updatedUserData = { ...userData, profileImage: selectedImage };

      // Update state
      setUserData(updatedUserData);

      // Save to AsyncStorage
      try {
        await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));
      } catch (error) {
        setError("Error saving user data to AsyncStorage.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity onPress={handleImagePicker}>
              <Image
                source={userData.profileImage ? { uri: userData.profileImage } : require("../../assets/fitness1.png")}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <View style={styles.listContainer}>
              <View style={styles.name}>
                <Text>
                  {userData
                    ? `${userData.first_name} ${userData.last_name}`
                    : "Loading..."}
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text>ID Number: {userData ? userData.ID_number : "N/A"}</Text>
              </View>
              <View style={styles.listItem}>
                <Text>Phone Number: {userData ? userData.phone_number : "N/A"}</Text>
              </View>
              <View style={styles.listItem}>
                <Text>Email: {userData ? userData.email : "N/A"}</Text>
              </View>
              <View style={styles.listItem}>
                <Text>Birth Date: {userData ? userData.birth_date : "N/A"}</Text>
              </View>
              <View style={styles.listItem}>
                <Text>Joining Date: {userData ? userData.joining_date : "N/A"}</Text>
              </View>
              <View style={styles.listItem}>
                <Text>Payment: {userData ? userData.payment : "N/A"}</Text>
              </View>
              <View style={styles.listItem}>
                <Text>Trainer: {userData ? userData.trainer : "N/A"}</Text>
              </View>
              <View style={styles.listItem}>
                <Text>Height: {userData ? userData.height : "N/A"}</Text>
              </View>
              <View style={styles.listItem}>
                <Text>Weight: {userData ? userData.weight : "N/A"}</Text>
              </View>
              <View style={styles.listItem}>
                <Text>Status: {userData ? (userData.status ? "Active" : "Inactive") : "N/A"}</Text>
              </View>
              <View style={styles.listItem}>
                <Text>Verification Code: {userData ? userData.verificationCode : "N/A"}</Text>
              </View>
            </View>
          </View>
          {error && <Text style={styles.errorMessage}>{error}</Text>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 65, // Add padding to the top of the container
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  name: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginTop: -20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    marginTop: -80,
  },
  listContainer: {
    width: "100%",
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    margin: 20,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
