import { AttactmentIcon } from "@/constants/attactment";
import File from "@/types/file.type";
import { formatFileSize } from "@/utils/metadata.util";
import { useEffect, useState } from "react";
import { Pressable, TouchableOpacity, View, StyleSheet, Text, useWindowDimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface AttachmentProps {
  file: File;
  onRemove: (fileName: string) => void;
};

interface IconData {
  name: string,
  color: string,
};

export default function Attachment({ file, onRemove }: AttachmentProps) {
  const {width, height} = useWindowDimensions();
  const isPortrait = height > width;
  const [iconData, setIconData] = useState<IconData>({
    name: "file",
    color: "blue"
  });

  const handleIcon = () => {
    const extension = file.fileName.split(".").pop()?.toLowerCase();

    if (!extension) return AttactmentIcon.unknown;
  
    if (["pdf"].includes(extension)) return AttactmentIcon.pdf;
    if (["doc", "docx", "odt"].includes(extension)) return AttactmentIcon.doc;
    if (["ppt", "pptx"].includes(extension)) return AttactmentIcon.ppt;
    if (["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"].includes(extension))
      return AttactmentIcon.image;
    if (["mp3", "wav", "ogg", "aac", "flac"].includes(extension))
      return AttactmentIcon.audio;
    if (["mp4", "mkv", "mov", "avi", "wmv", "webm"].includes(extension))
      return AttactmentIcon.video;
  
    return AttactmentIcon.unknown;
  };

  useEffect(() => {
    setIconData(handleIcon());
  }, [file.fileName]);
  
  return (
    <View style={[styles.container, {width: isPortrait ? 320 : 240}]}>
      <Pressable style={styles.metadataBlock}>
        <View style={{width: 30, justifyContent: "center", alignItems: "center"}}>
          <MaterialCommunityIcons size={24} name={iconData?.name} color={iconData?.color}/>
        </View>
        <View style={styles.metadata}>
          <Text style={styles.fileName} numberOfLines={1}>{file.fileName}</Text>
          <Text style={styles.fileSize}>{formatFileSize(file.size)}</Text>
        </View>
      </Pressable>
      <TouchableOpacity style={{width: 24}} onPress={() => onRemove(file.fileName)}>
        <MaterialCommunityIcons name="close" size={24}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
    marginHorizontal: 12,
    backgroundColor: "#dce2fa",
    alignItems: "center",
    borderRadius: 3,
  },
  metadataBlock: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  metadata: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
    justifyContent: "space-around",
    alignItems: "flex-start",
    maxWidth: 250,
  },
  fileName: {
    fontSize: 16,
  },
  fileSize: {
    fontSize: 10,
  }
});