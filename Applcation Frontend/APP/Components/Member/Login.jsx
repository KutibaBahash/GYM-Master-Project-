import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import {
  Icon,
  Input,
  Pressable,
  Button as NativeBaseButton,
  Text,
  Spinner,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";

// Correct paths to the image files
const backgroundImage = require("../../assets/fitness1.png");
const logoImage = require("../../assets/fitness1.png");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      navigation.setOptions({
        gestureEnabled: false,
      });
    }
  }, [isFocused, navigation]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill in all the fields.");
      return;
    }
    setIsLoading(true);
  
    const loginData = {
      email,
      password,
    };
  
    fetch("https://gym-master-project.onrender.com/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then(async (response) => {
        setIsLoading(false);
        const responseData = await response.json();
        
        // Log the response data for debugging purposes
        console.log("Response Data:", responseData);
  
        if (response.ok) {
          const user = responseData.user; // Corrected the key to user
  
          // Check if the user object is defined
          if (user && user.status !== undefined) {
            if (user.status === false) {
              Alert.alert(
                "Login Failed",
                "Your account is deactivated. Please contact the administrator."
              );
            } else {
              await AsyncStorage.setItem("userData", JSON.stringify(user));
  
              navigation.navigate(
                user.position === "admin"
                  ? "AdminMainScreen"
                  : "MemberProfile",
                { member: user }
              );
  
              Alert.alert("Login Successful", "You have successfully logged in.");
            }
          } else {
            Alert.alert("Login Failed", "Unexpected response structure.");
          }
        } else {
          Alert.alert(
            "Login Failed",
            responseData.message || "Invalid email or password. Please try again."
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert("Error", "An error occurred. Please try again later.");
        console.error("Error:", error);
      });
  };
  
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image source={logoImage} style={styles.logo} resizeMode="contain" />
          <Text style={styles.welcomeText}>
            Gym Master! Welcome Back 👋
          </Text>
          <Input
            style={styles.input}
            w={{
              base: "100%",
              md: "25%",
            }}
            h={12}
            mb={4}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="mail" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            style={styles.input}
            w={{
              base: "100%",
              md: "25%",
            }}
            h={12}
            mb={4}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="lock" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            InputRightElement={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={showPassword ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            type={showPassword ? "text" : "password"}
          />
          {isLoading ? (
            <Spinner color="blue" />
          ) : (
            <NativeBaseButton style={styles.loginButton} onPress={handleLogin}>
              Login
            </NativeBaseButton>
          )}
          <Text
            onPress={() => {
              navigation.navigate("MemberRegister");
            }}
            style={styles.linkText}
          >
            Don't have an account, Register Now?
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  logo: {
    width: 300,
    height: 300,
  },
  welcomeText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 30,
    color: "white",
    alignContent: "center",
  },
  loginButton: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 8,
    marginBottom: 10,
  },
  linkText: {
    marginTop: 10,
    color: "white",
  },
});

export default LoginScreen;
