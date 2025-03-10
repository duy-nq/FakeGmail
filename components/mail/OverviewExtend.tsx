import Email from "@/types/email.type";
import { overviewExtendedDate } from "@/utils/datetime.util";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface OverviewExtendProps {
  email: Email;
  hidden: boolean;
}

export default function OverviewExtend({ email, hidden }: OverviewExtendProps) {
  return (
    <TouchableOpacity
      key={email.id}
      style={[styles.container, { display: hidden ? "none" : "flex" }]}
    >
      <View style={styles.overview}>
        <View style={styles.line}>
          <Text style={{ width: 40 }}>From</Text>
          <Text>
            {email.senderName} · {email.sender}
          </Text>
        </View>
        <View style={styles.line}>
          <Text style={{ width: 40 }}>To</Text>
          <Text>{email.recipients}</Text>
        </View>
        <View style={styles.line}>
          <Text style={{ width: 40 }}>Date</Text>
          <Text>{overviewExtendedDate(email.createdAt)}</Text>
        </View>
        <View style={styles.line}>
          <View style={{ width: 40 }}>
            <MaterialCommunityIcons name="lock-outline" size={16} />
          </View>
          <View style={styles.lineRow}>
            <Text>Standard Encryption (TLS)</Text>
            <Text style={{ color: "#556c98" }}>Detailed Encryption</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 12,
    borderRadius: 8,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    height: "auto",
    paddingBottom: 16,
  },
  overview: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 12,
    gap: 8,
  },
  line: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 12,
  },
  lineRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 4,
  },
});
