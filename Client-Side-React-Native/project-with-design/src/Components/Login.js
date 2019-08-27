import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  PixelRatio,
  AsyncStorage
} from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import * as LoginAction from "../Store/Actions/LoginAction";

const Login = props => {
  useEffect(() => {
    AsyncStorage.removeItem("userName");
    if (props.existUser === "1")
      AsyncStorage.setItem("userName", props.userName);
    else if (props.existUser === "0") console.log("loooooo");

    AsyncStorage.getItem("userName").then(
      val => val !== null && props.navigation.navigate("Main")
    );
  }, [props.existUser]);

  const HandleLogin = () => {
    props.login(props.userName, props.password);
  };

  return (
    <View style={styles.page}>
      <Modal
        isVisible={props.modal}
        animationIn={"slideInLeft"}
        animationOut={"slideOutRight"}
        onBackdropPress={() => props.closeModal()}
      >
        <View style={styles.modalContent}>
          <Text style={styles.text}>
            את שם המשתמש והסיסמא,{"\n"}ניתן לראות בדף של פירוט החשבון
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => props.closeModal()}
          >
            <Text style={styles.text}>סגור</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <KeyboardAvoidingView style={styles.page} behavior="padding">
        <Image
          style={styles.topImage}
          source={require("../Images/topleaves.png")}
          resizeMode="stretch"
        />
        <View style={styles.logo}>
          <Image
            style={styles.logoName}
            source={require("../Images/logotype.png")}
            resizeMode="contain"
          />
          <Image
            style={styles.logoImage}
            source={require("../Images/racoon.png")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.form}>
          <View style={styles.formCenter}>
            <TouchableOpacity
              style={styles.question}
              onPress={() => props.openModal()}
            >
              <Image
                style={styles.questionImage}
                source={require("../Images/q.png")}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <TextInput
              style={[styles.text, styles.textInput]}
              placeholder="שם משתמש"
              placeholderTextColor="#808080"
              maxLength={20}
              value={props.userName}
              onChangeText={val => props.setUserName(val)}
            />
            <TextInput
              style={[styles.text, styles.textInput]}
              placeholder="סיסמא"
              placeholderTextColor="#808080"
              maxLength={20}
              secureTextEntry={true}
              value={props.password}
              onChangeText={val => props.setPassword(val)}
            />
            <TouchableOpacity style={styles.login} onPress={HandleLogin}>
              <Text style={styles.text}>להתחברות</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    userName: state.login.userName,
    password: state.login.password,
    modal: state.login.modal,
    existUser: state.login.existUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserName: val => dispatch(LoginAction.setUserName(val)),
    setPassword: val => dispatch(LoginAction.setPassword(val)),
    openModal: () => dispatch(LoginAction.openModal()),
    closeModal: () => dispatch(LoginAction.closeModal()),
    login: (name, pass) => dispatch(LoginAction.login(name, pass))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
  page: { flex: 1 },
  topImage: { flex: 0.2 },
  logo: { flex: 0.4, justifyContent: "center", alignItems: "center" },
  logoName: { flex: 0.35, width: "50%" },
  logoImage: { flex: 0.65, width: "40%" },
  question: {
    width: "13%",
    height: "15%",
    marginVertical: "5%",
    alignSelf: "flex-start"
  },
  questionImage: { width: "75%", height: "75%" },
  textInput: {
    backgroundColor: "#E4E4E4",
    height: "25%",
    width: "100%",
    minHeight: "20%",
    borderRadius: 10,
    textAlign: "right",
    marginBottom: "5%",
    paddingHorizontal: "3%"
  },
  login: {
    width: "60%",
    height: "20%",
    minHeight: "15%",
    backgroundColor: "#FE961B",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  form: { flex: 0.4, alignItems: "center", justifyContent: "flex-start" },
  formCenter: { width: "60%", height: "50%" },
  modalContent: {
    opacity: 0.8,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4
  },
  modalButton: {
    backgroundColor: "lightblue",
    marginTop: "7%",
    width: "30%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4
  },
  text: { textAlign: "center", fontSize: PixelRatio.get() * 6 }
});
