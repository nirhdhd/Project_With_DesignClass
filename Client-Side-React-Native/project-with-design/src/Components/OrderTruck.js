import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PixelRatio,
  StatusBar
} from "react-native";
import BigSlider from "react-native-big-slider";
import { connect } from "react-redux";
import * as OrderTruckAction from "../Store/Actions/OrderTruckAction";

const OrderTruck = props => {
  const HandleSetTrashCount = () => {
    props.setWishTrashCan(props.userName, props.wishTrash);
    props.closeModal();
  };

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerBoldTextPosition}>
          <Text style={styles.headerBoldText}>כמה אתה חושב שהפח יתמלא</Text>
        </View>

        <Text style={styles.headerText}>החלק את הסליידר לאחוז הרצוי</Text>
      </View>
      <View style={styles.body}>
        <BigSlider
          maximumValue={100}
          minimumValue={0}
          style={styles.bodySlider}
          trackStyle={{
            backgroundColor:
              (props.wishTrash < 60 && "green") ||
              (props.wishTrash < 90 && "orange") ||
              "red"
          }}
          value={props.wishTrash}
          onValueChange={val => props.setSliderWishTrashCan(Math.floor(val))}
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomTextPosition}>
          <Text style={styles.bottomText}>
            האם אתה בטוח{"\n"}שאתה רוצה להזמין?
          </Text>
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={[styles.bottomButton, { backgroundColor: "orange" }]}
            onPress={() => props.closeModal()}
          >
            <Text style={styles.bottomButtonText}>לא</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomButton, { backgroundColor: "yellowgreen" }]}
            onPress={HandleSetTrashCount}
          >
            <Text style={styles.bottomButtonText}>כן</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    wishTrash: state.orderTruck.wishTrash
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSliderWishTrashCan: val =>
      dispatch(OrderTruckAction.setSliderWishTrashCan(val)),
    setWishTrashCan: (userName, wishTrash) =>
      dispatch(OrderTruckAction.setWishTrashCan(userName, wishTrash))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTruck);

const styles = StyleSheet.create({
  page: { flex: 1, opacity: 0.8, backgroundColor: "white" },
  header: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight
  },
  headerBoldTextPosition: { flex: 0.5, justifyContent: "center" },
  headerBoldText: { fontSize: PixelRatio.get() * 7 },
  headerText: { flex: 0.5, fontSize: PixelRatio.get() * 6 },
  body: { flex: 0.5, alignItems: "center" },
  bodySlider: { width: "40%", backgroundColor: "lightgray" },
  bottom: { flex: 0.3, justifyContent: "center" },
  bottomTextPosition: { flex: 0.6, justifyContent: "center" },
  bottomText: { textAlign: "center", fontSize: PixelRatio.get() * 7 },
  bottomButtons: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  bottomButton: {
    width: "30%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  bottomButtonText: { fontSize: PixelRatio.get() * 6, color: "white" }
});
