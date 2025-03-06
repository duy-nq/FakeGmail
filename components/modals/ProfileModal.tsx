import {
  Modal,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useModalContext } from "@/contexts/ModalContext";
import Icon from "react-native-vector-icons/Ionicons";
import IconAW5 from "react-native-vector-icons/FontAwesome5";
import IconMT from "react-native-vector-icons/MaterialCommunityIcons";
import { COLOR_MODAL } from "@/constants/color";
import Profile from "../commons/Profile";
import { useEmailStore } from "@/stores/email.store";

export default function ProfileModal() {
  const { modalVisible, setModalVisible } = useModalContext();
  const { emails } = useEmailStore();

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="none"
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Icon name="close" size={24} color="#5f6368" />
            </TouchableOpacity>
            <View style={styles.modalTitle}>
              <Image
                source={require("../../assets/images/google.png")}
                style={{ width: 120, height: 35, resizeMode: "contain" }}
              />
            </View>
          </View>

          <ScrollView style={styles.subContainer}>
            <Profile name="John Doe" email="johndoe@gmail.com" unread={emails.length} />
            <Pressable style={styles.manageButton}>
              <Text style={styles.manageButtonText}>
                Manage your Google Account
              </Text>
            </Pressable>

            <View style={styles.divider} />
            <View style={styles.optionsSection}>
              <TouchableOpacity style={styles.option}>
                <IconMT name="cloud" size={16} color="#5f6368" />
                <Text style={styles.optionText}>
                  Your Google Drive storage is 29%/15GB
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />

            <Profile name="Nam Cua" email="namcua@gmail.com" unread={27} />
            <Profile name="Cua Nam" email="cuanam@gmail.com" unread={102} />

            <View style={styles.optionsSection}>
              <TouchableOpacity style={styles.option}>
                <IconAW5 name="user-plus" size={16} color="#5f6368" />
                <Text style={styles.optionText}>Add another account</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.option}>
                <IconAW5 name="user-cog" size={16} color="#5f6368"/>
                <Text style={styles.optionText}>
                  Manage accounts on this device
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.policy}>
            <Text
              style={{
                color: "#5f6368",
                textAlign: "center",
                fontSize: 12,
                marginTop: 8,
              }}
            >
              Terms of Service • Privacy Policy
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 12,
    paddingTop: 70,
  },
  modalContent: {
    backgroundColor: COLOR_MODAL,
    borderRadius: 30,
    paddingBottom: 20,
  },
  modalHeader: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f4",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#202124",
    position: "absolute",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
  closeButton: {
    paddingHorizontal: 16,
    zIndex: 1,
  },
  subContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    marginHorizontal: 12,
  },
  profileSection: {
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1a73e8",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  avatarText: {
    color: "white",
    fontSize: 28,
    fontWeight: "500",
  },
  userName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#202124",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: "#5f6368",
    marginTop: 4,
  },
  manageButton: {
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#5f6368",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    width: "70%",
    alignSelf: "center",
  },
  manageButtonText: {
    color: "#5f6368",
    fontSize: 14,
    fontWeight: "600",
    width: "100%",
    textAlign: "center",
  },
  divider: {
    height: 2,
    backgroundColor: "#f1f3f4",
    marginVertical: 0,
  },
  optionsSection: {
    paddingHorizontal: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    alignContent: "center",
    paddingLeft: 8,
    gap: 20,
  },
  optionText: {
    fontSize: 14,
    color: "#202124",
  },
  policy: {
    fontSize: 12,
    color: "#5f6368",
    textAlign: "center",
    paddingTop: 12,
    alignItems: "center",
    alignSelf: "stretch",
  },
});
