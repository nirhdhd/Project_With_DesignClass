import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  PixelRatio
} from "react-native";
import { ProgressCircle } from "react-native-svg-charts";

const Profile = props => {
  const HandleGoBack = () => {
    props.navigation.navigate("Main");
  };

  return (
    <View style={styles.page}>
      <ImageBackground
        style={styles.header}
        source={require("../Images/leaves1.png")}
        resizeMode="stretch"
      >
        <View style={styles.user}>
          <Image
            style={styles.userImage}
            source={require("../Images/man.png")}
            resizeMode="stretch"
          />
          <Text style={styles.titleText}>
            {AsyncStorage.getItem("userName")}
          </Text>
        </View>
        <TouchableOpacity onPress={HandleGoBack} style={styles.back}>
          <Image
            style={styles.backImage}
            source={require("../Images/back.png")}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.addressFlex}>
        <View style={styles.address}>
          <Text style={styles.text}>סוקולוב 42, נתניה, ישראל{"\n"}דירה 8</Text>
        </View>
      </View>
      <View style={styles.allFlex}>
        <View style={styles.all}>
          <View style={styles.allHeader}>
            <Text style={styles.text}>יעד: 150 פריטים</Text>
            <Text style={styles.text}>חודש: אפריל</Text>
          </View>
          <View style={styles.allBody}>
            <ProgressCircle
              style={styles.allProgressCircle}
              progress={0.8}
              progressColor={"#9ACD32"}
              strokeWidth={PixelRatio.get() * 7}
            />
            <Text style={[styles.titleText, styles.progressColorPosition]}>
              80%
            </Text>
          </View>
          <View style={styles.allFooter}>
            <Text style={styles.titleText}>אתם מתקרבים ליעד המבוקש</Text>
          </View>
        </View>
      </View>
      <View style={styles.boxesFlex}>
        <View style={styles.boxes}>
          <View style={styles.boxRecycle}>
            <ProgressCircle
              style={styles.boxesProgressCircle}
              progress={0.5}
              progressColor={"green"}
              strokeWidth={PixelRatio.get() * 3}
            />
            <Text style={[styles.titleText, styles.boxesProgressCircleText]}>
              50%
            </Text>
            <Text style={styles.text}>נייר</Text>
          </View>

          <View style={styles.boxRecycle}>
            <ProgressCircle
              style={styles.boxesProgressCircle}
              progress={0.75}
              progressColor={"green"}
              strokeWidth={PixelRatio.get() * 3}
            />
            <Text style={[styles.titleText, styles.boxesProgressCircleText]}>
              75%
            </Text>
            <Text style={styles.text}>פלסטיק</Text>
          </View>

          <View style={styles.boxRecycle}>
            <ProgressCircle
              style={styles.boxesProgressCircle}
              progress={0.25}
              progressColor={"green"}
              strokeWidth={PixelRatio.get() * 3}
            />
            <Text style={[styles.titleText, styles.boxesProgressCircleText]}>
              25%
            </Text>
            <Text style={styles.text}>זכוכית</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: { flex: 1 },
  header: { flex: 0.2, justifyContent: "flex-end" },
  user: { flex: 1, justifyContent: "flex-end", alignItems: "center" },
  userImage: { height: "50%", width: "15%" },
  back: {
    position: "absolute",
    left: "5%",
    bottom: "40%",
    width: "5%",
    height: "15%"
  },
  backImage: { width: "100%", height: "100%" },
  titleText: { fontSize: PixelRatio.get() * 7 },
  text: { fontSize: PixelRatio.get() * 6 },
  address: {
    width: "85%",
    height: "75%",
    paddingHorizontal: "5%",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowOpacity: 1,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowRadius: 5,
    elevation: 15
  },
  all: {
    width: "85%",
    height: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowOpacity: 1,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowRadius: 5,
    elevation: 15
  },
  allHeader: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%"
  },
  allBody: { flex: 0.6, alignItems: "center", justifyContent: "center" },
  allFooter: { flex: 0.2, justifyContent: "center", alignItems: "center" },
  boxes: {
    width: "85%",
    height: "75%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowOpacity: 1,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowRadius: 5,
    elevation: 15,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  addressFlex: {
    flex: 0.2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  allFlex: {
    flex: 0.4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  boxesFlex: {
    flex: 0.2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  boxRecycle: { flex: 0.33, alignItems: "center", justifyContent: "center" },
  allProgressCircle: { height: "100%", width: "100%" },
  progressColorPosition: { position: "absolute" },
  boxesProgressCircle: { height: "65%", width: "100%" },
  boxesProgressCircleText: { position: "absolute", marginBottom: "25%" }
});
