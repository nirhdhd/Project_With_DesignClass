import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  PixelRatio,
  AsyncStorage
} from "react-native";
import { MapView } from "expo";
import Modal from "react-native-modal";
import OrderTruck from "./OrderTruck";
import { connect } from "react-redux";
import * as MainAction from "../Store/Actions/MainAction";

const Main = props => {
  useEffect(() => {
    AsyncStorage.getItem("userName").then(val => props.setTrashCan(val));
    props.setDriver(1);
  }, []);

  const currentTrash = props.trashCan.CurrentTrash;
  const driverLatitude = props.driver.Latitude;
  const driverLongitude = props.driver.Longitude;

  const HandleGoToProfile = () => {
    props.navigation.navigate("Profile");
  };

  return (
    <View style={styles.page}>
      <Modal
        isVisible={props.modal}
        animationIn={"slideInLeft"}
        animationOut={"slideOutRight"}
      >
        <OrderTruck
          trashCount={currentTrash}
          userName={props.trashCan.UserName}
          closeModal={() => props.closeModal()}
        />
      </Modal>

      <ImageBackground
        style={styles.header}
        source={require("../Images/Group18.png")}
        resizeMode="stretch"
      >
        <View style={styles.headerButtonPosition}>
          <TouchableOpacity
            onPress={HandleGoToProfile}
            style={styles.headerButton}
          >
            <Image
              style={styles.headerButtonImage}
              source={require("../Images/Union.png")}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>
          שלום משפחת {props.trashCan.LastName}
        </Text>
      </ImageBackground>

      <View style={styles.body}>
        <View style={styles.bodyPosition}>
          <MapView
            style={styles.map}
            region={{
              latitude:
                driverLatitude !== undefined ? parseFloat(driverLatitude) : 0,
              longitude:
                driverLongitude !== undefined ? parseFloat(driverLongitude) : 0,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude:
                  driverLatitude !== undefined ? parseFloat(driverLatitude) : 0,
                longitude:
                  driverLongitude !== undefined
                    ? parseFloat(driverLongitude)
                    : 0
              }}
              title={
                props.driver !== undefined &&
                `${props.driver.Name} ${props.driver.LastName}`
              }
              description="הנהג הכי תותח"
            >
              <Image
                source={require("../Images/car.png")}
                style={{
                  width: PixelRatio.get() * 15,
                  height: PixelRatio.get() * 15
                }}
              />
            </MapView.Marker>
          </MapView>
          <View style={styles.bodyBottom}>
            <View style={styles.bodyBottomLeftSide}>
              <View style={styles.bodyBottomLeftSidePosition}>
                <View style={styles.bodyBottomLeftSideGraph}>
                  <View
                    style={[
                      styles.bodyBottomLeftSideGraphFill,
                      {
                        flex:
                          currentTrash !== undefined ? currentTrash / 100 : 0,
                        backgroundColor:
                          (currentTrash < 60 && "green") ||
                          (currentTrash < 90 && "orange") ||
                          "red"
                      }
                    ]}
                  />
                  <Text style={styles.bodyBottomLeftSideGraphFillCount}>
                    {`${currentTrash}%`}
                  </Text>
                </View>
                <Text style={styles.bodyBottomLeftSideGraphText}>
                  כמות זבל{"\n"}נוכחית
                </Text>
              </View>
            </View>
            <View style={styles.bodyBottomRightSide}>
              <TouchableOpacity
                style={[
                  styles.bodyBottomRightSideButton,
                  { backgroundColor: "green" }
                ]}
                onPress={() => props.openModal()}
              >
                <Text style={styles.buttonText}>הזמן משאית</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.bodyBottomRightSideButton,
                  { backgroundColor: "yellowgreen" }
                ]}
              >
                <Text style={styles.buttonText}>סריקת פח</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    trashCan: state.main.trashCan,
    modal: state.main.modal,
    driver: state.main.driver
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTrashCan: userName => dispatch(MainAction.setTrashCan(userName)),
    setDriver: id => dispatch(MainAction.setDriver(id)),
    openModal: () => dispatch(MainAction.openModal()),
    closeModal: () => dispatch(MainAction.closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

const styles = StyleSheet.create({
  page: { flex: 1 },
  header: { flex: 0.2 },
  headerButtonPosition: { flex: 0.7, justifyContent: "flex-end" },
  headerButton: { left: "5%", bottom: "20%", width: "10%", height: "35%" },
  headerButtonImage: { width: "100%", height: "100%" },
  headerText: { flex: 0.3, marginRight: "5%", fontSize: PixelRatio.get() * 7 },
  body: { flex: 0.8, alignItems: "center" },
  bodyPosition: { flex: 1, width: "90%", marginTop: "5%" },
  map: { flex: 0.6 },
  bodyBottom: { flex: 0.4, flexDirection: "row" },
  bodyBottomLeftSide: { flex: 0.5, justifyContent: "center" },
  bodyBottomLeftSidePosition: {
    width: "40%",
    height: "90%",
    justifyContent: "center"
  },
  bodyBottomLeftSideGraph: {
    flex: 0.7,
    backgroundColor: "lightgray",
    borderRadius: 10,
    justifyContent: "flex-end"
  },
  bodyBottomLeftSideGraphFill: {
    borderRadius: 10
  },
  bodyBottomLeftSideGraphFillCount: {
    alignSelf: "center",
    marginBottom: "100%",
    position: "absolute",
    fontSize: PixelRatio.get() * 5
  },
  bodyBottomLeftSideGraphText: {
    flex: 0.3,
    textAlign: "center",
    fontSize: PixelRatio.get() * 5
  },
  bodyBottomRightSide: { flex: 0.5, justifyContent: "space-evenly" },
  bodyBottomRightSideButton: {
    borderRadius: 10,
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: { fontSize: PixelRatio.get() * 6, color: "white" }
});
