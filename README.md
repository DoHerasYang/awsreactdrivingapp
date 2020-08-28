

---

## Master Project - Design a Safe Driving Program by React Native

---

**Dependency:**

1. Firstly, You should use the `npm install -g @aws-amplify/cli` command to add the `aws-amplify` into this project file.
2. Use the command `amplify configure` and follow the Access AWS page hints.
3. You could use the 'aws-export.js' to connect with the remote server.

---

**DownLoad From the Github Usage**:

1.You could use this command to install all the node_modules:  

```
$ sudo npm install 
```

---

**Command Hint**: (All the command should run with `sudo`)

1.`sudo npm i --save react-bootstrap`

2.`sudo npm install -g @aws-amplify/cli`

3.`yarn add @aws-amplify/api @aws-amplify/pubsub`

4.` yarn add aws-amplify @aws-amplify/core aws-amplify-react-native amazon-cognito-identity-js @react-native-community/netinfo`

5.Unistall the wrong version: `npm uninstall @react-native-community/netinfo` 

6.Install the Correct Version: `npm install @react-native-community/netinfo@5.9.2`

7.Install the react-native navigation component: `npm install @react-navigation/native`

8.Install the react-native navigation dependencies: `expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view`

9.Install NativeBase :   `npm install native-base --save`

10.Install `expo-font`:  `expo install expo-font`

11. Install Drawer `npm install @react-navigation/drawer`
12. Install Tabs:   `npm install @react-navigation/material-top-tabs react-native-tab-view`
13. Install `LinearGradient`:    `expo install expo-linear-gradient`
14. Install `AsyncStorage` : `expo install @react-native-community/async-storage`
15. Install  `MapView` : `expo install react-native-maps`
16. Install `Constant` : `expo install expo-constants`
17. Install `Permissions`: `expo install expo-permissions`

---

### 1. Tasks 

<TODO>

<date>  25th,Apirl,2020  </date>

<content> Tutorial about the React Native (Expo) / My First Reactive Native Project</content>

<date>   18th,June,2020  </date>
<content> Finish the Log in page and Sign Up page </content>


</TODO>



### 2. Project Progress

#### 23th,Apirl,2020

+ Finishing establishing the first React Native project via the Git application and Expo command line.
+ Install the dependencies( AWS ) and GraphQL
+ Run my first demo application on iOS simulator and Android Device

#### 25th,Apirl,2020

+ Finish initializing the AWS configuration
+ Finish configuration the GraphQL. And learn the tutorial of GraphQL Schema.

#### 26th,Apirl,2020

+ Fix the problem that the Git can't recognize the React Native project files and dependencies.
+ Rebuild the project structure

#### 15th,Apirl,2020
+ Finish the Basic Page registration UI and function and test.

#### 18th,June,2020
+ Finish the Basic UI about the Signin/SignUp page. And Generally finished 
+ Understand the Basic rule of the Expo.



### 3. Issues and Solutions

#### 1. If you have problem in starting the expo project, please check your network situation which has connected to the outside network, or use this command: `expo start --offline`.



### 4.Problem Remain to Fix

+ As for Cognito, the use only can receive the email or phone, can't receive both of them. 

  https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-email-phone-verification.html

+ If the you would like to install the sub-dependencies of the navigation, you should reinstall the navigation-dependency:

  `expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view`

+ If you have problem in `npm` installation tool after you have installed a new component, please remove all the modules: `rm -rf node_modules` and then `yarn install`.


















