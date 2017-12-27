import React, { Component } from "react";
import { DrawerNavigator } from 'react-navigation';
import MyHomeScreen from "./HomeScreen.js";
import MyNotificationsScreen from "../MyNotificationsScreen/MyNotificationsScreen.js";

const HomeScreenRouter = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
});

export default HomeScreenRouter;