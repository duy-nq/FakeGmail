import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { MATERIALCOMMUNITYICONS_PENCIL } from "@/constants/iconConvension";

type Props = {
    expand?: boolean
}

export default function FloatingButton({ expand=true } : Props) {
    return (
        <TouchableOpacity style={styles.floatingButton}>
            <MaterialCommunityIcon name={MATERIALCOMMUNITYICONS_PENCIL} size={26} />
            {
                expand && 
                <Text style={styles.buttonText}>
                    Compose
                </Text>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        flexDirection: "row",
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: 'rgba(220, 226, 250, 1)',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5, // for shadow on Android
        shadowColor: 'rgba(131, 98, 98, 0.25)', // for shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        width: "auto",
        minWidth: 50,
    },
    buttonText: {
        color: 'black',
        fontWeight: 500,
        fontSize: 16,
        paddingLeft: 10
    }
});