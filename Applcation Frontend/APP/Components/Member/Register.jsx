import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import {
  Icon,
  Input,
  Pressable,
  Button as NativeBaseButton,
  Text,
  Switch,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const backgroundImage = require("../../assets/fitness1.png");
const logoImage = require("../../assets/fitness1.png");

const MemberRegister = ({ navigation }) => {
  const [ID_number, setIDNumber] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birth_date, setBirthDate] = useState("1990-01-01");
  const [joining_date, setJoiningDate] = useState("2024-01-01");
  const [payment, setPayment] = useState(100);
  const [trainer, setTrainer] = useState("");
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(75);
  const [status, setStatus] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [show, setShow] = useState(false);

  const handleSignUp = async () => {
    try {
      // Perform form validation
      if (
        !ID_number ||
        !first_name ||
        !last_name ||
        !phone_number ||
        !email ||
        !password
      ) {
        throw new Error("Please fill in all the fields.");
      }

      // Prepare the user data to send to the signup API
      const userData = {
        ID_number,
        first_name,
        last_name,
        phone_number,
        email,
        password, // שינוי שם משתנה לפי הסכימה
        birth_date,
        joining_date,
        payment,
        trainer,
        height,
        weight,
        status,
        verificationCode,
      };

      // Send the user data to the signup API
      const response = await fetch(
        "https://gym-master-project.onrender.com/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const contentType = response.headers.get("content-type");

      if (response.ok && contentType && contentType.includes("application/json")) {
        const responseData = await response.json();
        // Signup successful, display success message
        Alert.alert("Signup Successful", "You have successfully signed up.");
        // You can navigate to another screen here if needed
        // navigation.navigate("Login");
      } else {
        // Handle unexpected responses
        const errorText = await response.text();
        throw new Error(`Unable to sign up. Server returned: ${errorText}`);
      }
    } catch (error) {
      // Handle errors
      Alert.alert(
        "Signup Failed",
        error.message || "An error occurred. Please try again later."
      );
      console.error("Error:", error);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.logoContainer}>
            <Image
              source={logoImage}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.welcomeText}>Hi, Welcome to Sign Up! 👋 </Text>

          {/* ID Number Input */}
          <Input
            style={styles.input}
            h={12}
            mb={4}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="ID Number"
            onChangeText={(text) => setIDNumber(text)}
          />

          {/* First Name Input */}
          <Input
            style={styles.input}
            h={12}
            mb={4}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="First Name"
            onChangeText={(text) => setFirstName(text)}
          />

          {/* Last Name Input */}
          <Input
            style={styles.input}
            h={12}
            mb={4}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Last Name"
            onChangeText={(text) => setLastName(text)}
          />

          {/* Phone Number Input */}
          <Input
            style={styles.input}
            h={12}
            mb={4}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="phone" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Phone Number"
            onChangeText={(text) => setPhoneNumber(text)}
          />

          {/* Email Input */}
          <Input
            style={styles.input}
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

          {/* Password Input */}
          <Input
            style={styles.input}
            h={12}
            mb={4}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
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
            type={show ? "text" : "password"}
          />

          {/* Birth Date Input */}
          <Input
            style={styles.input}
            h={12}
            mb={4}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="calendar-today" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Birth Date"
            value={birth_date}
            onChangeText={(text) => setBirthDate(text)}
          />

          {/* Joining Date Input */}
          <Input
            style={styles.input}
            h={12}
            mb={4}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="calendar-today" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Joining Date"
            value={joining_date}
            onChangeText={(text) => setJoiningDate(text)}
          />

          {/* Payment Input */}
          <Input
            style={styles.input}
            h={12}
            mb={4}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="payment" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Payment"
            onChangeText={(text) => setPayment(Number(text))}
          />

          {/* Trainer Input */}
          <Input
            style={styles.input}
            h={12}
            mb={4}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Trainer"
            onChangeText={(text) => setTrainer(text)}
          />


          {/* Height Input */}
          <Input
            style={styles.input}
            h={12}
            mb={4}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="height" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Height"
            onChangeText={(text) => setHeight(Number(text))}
          />

          {/* Weight Input */}
          <Input
            style={styles.input}
            h={12}
            mb={4}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="fitness-center" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Weight"
            onChangeText={(text) => setWeight(Number(text))}
          />

          {/* Status Input */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Status</Text>
            <Switch
              isChecked={status}
              onToggle={(value) => setStatus(value)}
              aria-label="Status"
            />
          </View>

          {/* Verification Code Input */}
          <Input
            style={styles.input}
            h={12}
            mb={4}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="vpn-key" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Verification Code"
            onChangeText={(text) => setVerificationCode(text)}
          />

          <NativeBaseButton style={styles.signUpButton} onPress={handleSignUp}>
            Sign Up
          </NativeBaseButton>

          <Text
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={styles.linkText}
          >
            Already have an account, Login Now?
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 20,
    marginBottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  welcomeText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 30,
    textAlign: "center",
    color: "white",
  },
  signUpButton: {
    width: "75%",
    height: 48,
    alignSelf: "center",
    backgroundColor: "green",
    borderRadius: 8,
    marginBottom: 10,
  },
  linkText: {
    marginTop: 10,
    textAlign: "center",
    color: "white",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "white",
  },
});

export default MemberRegister;
