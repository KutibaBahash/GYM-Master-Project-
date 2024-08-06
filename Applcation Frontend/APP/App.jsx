import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './Components/OnboardingScreen';
import AddReceptionist from './Components/GymManager/AddReceptionist';
import UpdateReceptionist from './Components/GymManager/UpdateReceptionist';
import ViewReports from './Components/GymManager/ViewReports';
import ManagePayments from './Components/GymManager/ManagePayments';
import HandleInquiries from './Components/GymManager/HandleInquiries';
import TrainerRegister from './Components/Trainer/Register';
import TrainerLogin from './Components/Trainer/Login';
import TrainerProfile from './Components/Trainer/Profile';
import ManageWorkouts from './Components/Trainer/ManageWorkouts';
import CreateWorkout from './Components/Trainer/CreateWorkout';
import UpdateWorkout from './Components/Trainer/UpdateWorkout';
import NutritionPlan from './Components/Trainer/NutritionPlan';
import MemberRegister from './Components/Member/Register';
import MemberLogin from './Components/Member/Login';
import MemberProfile from './Components/Member/Profile';
import ViewWorkouts from './Components/Member/ViewWorkouts';
import MemberPayments from './Components/Member/ManagePayments';
import SupportInquiries from './Components/Member/SupportInquiries';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddReceptionist" component={AddReceptionist} />
          <Stack.Screen name="UpdateReceptionist" component={UpdateReceptionist} />
          <Stack.Screen name="ViewReports" component={ViewReports} />
          <Stack.Screen name="ManagePayments" component={ManagePayments} />
          <Stack.Screen name="HandleInquiries" component={HandleInquiries} />
          <Stack.Screen name="TrainerRegister" component={TrainerRegister} />
          <Stack.Screen name="TrainerLogin" component={TrainerLogin} />
          <Stack.Screen name="TrainerProfile" component={TrainerProfile} />
          <Stack.Screen name="ManageWorkouts" component={ManageWorkouts} />
          <Stack.Screen name="CreateWorkout" component={CreateWorkout} />
          <Stack.Screen name="UpdateWorkout" component={UpdateWorkout} />
          <Stack.Screen name="NutritionPlan" component={NutritionPlan} />
          <Stack.Screen name="MemberRegister" component={MemberRegister} />
          <Stack.Screen name="MemberLogin" component={MemberLogin} />
          <Stack.Screen name="MemberProfile" component={MemberProfile} />
          <Stack.Screen name="ViewWorkouts" component={ViewWorkouts} />
          <Stack.Screen name="MemberPayments" component={MemberPayments} />
          <Stack.Screen name="SupportInquiries" component={SupportInquiries} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
