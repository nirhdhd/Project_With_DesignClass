import React, { Component } from "react";
import { I18nManager } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./src/Components/Login";
import Main from "./src/Components/Main";
import Profile from "./src/Components/Profile";
import RootReducer from "./src/Store/Reducers/RootReducer";
import thunk from "redux-thunk";

I18nManager.forceRTL(false);

const store = createStore(RootReducer, applyMiddleware(thunk));

const RootStack = createStackNavigator(
  {
    Login,
    Main,
    Profile
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppContainer = createAppContainer(RootStack);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
