import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const OTP = () => {
  const navigation = useNavigation();  
  const [activePage] = useState([1, 2]);
  const [code, setCode] = useState("");
  const codeInput1Ref = useRef(null);
  const codeInput2Ref = useRef(null);
  const codeInput3Ref = useRef(null);
  const codeInput4Ref = useRef(null);
  const codeInput5Ref = useRef(null);

  const handleCodeChange = (index, value) => {
    let updatedCode = code;

    if (value === "") {
      updatedCode = updatedCode.slice(0, index);
    } else {
      updatedCode =
        updatedCode.slice(0, index) + value + updatedCode.slice(index + 1);
    }

    if (index > 0 && value === "") {
      switch (index) {
        case 1:
          codeInput1Ref.current.focus();
          break;
        case 2:
          codeInput2Ref.current.focus();
          break;
        case 3:
          codeInput3Ref.current.focus();
          break;
        case 4:
            codeInput4Ref.current.focus();
            break;
        default:
          break;
      }
    } else if (index < 4 && value !== "") {
      switch (index) {
        case 0:
          codeInput2Ref.current.focus();
          break;
        case 1:
          codeInput3Ref.current.focus();
          break;
        case 2:
          codeInput4Ref.current.focus();
          break;
        case 3:
          codeInput5Ref.current.focus();
          break;
        default:
          break;
      }
    }
    setCode(updatedCode);
  };

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.circleButtonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <ChevronLeftIcon size={30} color="#FFF" />
            </TouchableOpacity>
        </View>

        <View style={styles.slider}>
          <View style={[styles.sliderItem, activePage === 1 && styles.activeSliderItem]} />
          <View style={[styles.sliderItem, activePage === 2 && styles.activeSliderItem]} />
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>
          You've got email{" "}
          <Text role="img" aria-label="mail">
            📩
          </Text>
        </Text>

        <Text style={styles.subtitle}>
          Just Click Confirm Since No OTP has been sent to your email.
        </Text>

        <View style={styles.otpContainer}>
          <TextInput
            style={styles.otpInput}
            value={code.charAt(0)}
            onChangeText={(value) => handleCodeChange(0, value)}
            keyboardType="number-pad"
            maxLength={1}
            ref={codeInput1Ref}
          />
          <TextInput
            style={styles.otpInput}
            value={code.charAt(1)}
            onChangeText={(value) => handleCodeChange(1, value)}
            keyboardType="number-pad"
            maxLength={1}
            ref={codeInput2Ref}
          />
          <TextInput
            style={styles.otpInput}
            value={code.charAt(2)}
            onChangeText={(value) => handleCodeChange(2, value)}
            keyboardType="number-pad"
            maxLength={1}
            ref={codeInput3Ref}
          />
          <TextInput
            style={styles.otpInput}
            value={code.charAt(3)}
            onChangeText={(value) => handleCodeChange(3, value)}
            keyboardType="number-pad"
            maxLength={1}
            ref={codeInput4Ref}
          />
          <TextInput
            style={styles.otpInput}
            value={code.charAt(4)}
            onChangeText={(value) => handleCodeChange(4, value)}
            keyboardType="number-pad"
            maxLength={1}
            ref={codeInput5Ref}
          />

        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Confirm</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.resendText}>Didn't receive code?</Text>

        <Text style={styles.resendInfo}>
          You can resend code in <Text style={styles.resendCountdown}>30s</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
  },
  circleButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    backgroundColor: "#195AE6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  slider: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    marginLeft: -200,
    paddingHorizontal: 10,
  },
  sliderItem: {
    width: 25,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#195AE6",
    marginHorizontal: 5,
  },
  activeSliderItem: {
    backgroundColor: "#195AE6",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    textAlign: "left",
    color: "#999999",
    marginBottom: 4,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  otpInput: {
    flex: 1,
    aspectRatio: 1,
    fontSize: 24,
    height: 20,
    borderRadius: 20,
    backgroundColor: "#D3D3D3",
    textAlign: "center",
    marginHorizontal: 4,
  },
  btn: {
    width: "100%",
    height: 45,
    backgroundColor: "#11273F",
    marginVertical: 10,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  resendText: {
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 5,
  },
  resendInfo: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    textAlign: "left",
    color: "#999999",
    marginBottom: 4,
  },
  resendCountdown: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    textAlign: "left",
    color: "#999999",
    marginBottom: 4,
  },
});

export default OTP;