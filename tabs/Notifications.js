import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import notificationsData from "../data/notifications.json";

export default function Notifications({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [readNotifications, setReadNotifications] = useState({});
  const [isClose, setIsClose] = useState(true);

  useEffect(() => {
    setNotifications(notificationsData);
    if (isClose) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          id: prevNotifications.length + 1,
          title: "Het is druk",
          message:
            "Je bevindt je nu in een erg druk gebied. Hier zijn een aantal tips om veilig te blijven:\n\n1. Blijf kalm en houd je spullen goed bij je.\n2. Zoek naar de dichtstbijzijnde nooduitgangen en blijf in hun buurt.\n3. Houd je telefoon opgeladen en binnen handbereik.\n4. Blijf in contact met je vrienden en spreek een ontmoetingspunt af voor het geval jullie elkaar kwijtraken.\n5. Vermijd confrontaties en probeer rustig een minder drukke plek op te zoeken.\n\nVoor je eigen veiligheid, overweeg om naar een rustiger gebied te gaan.",
        },
      ]);
    }
  }, [isClose]);

  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
    setReadNotifications((prevReadNotifications) => ({
      ...prevReadNotifications,
      [notification.id]: true,
    }));
  };

  const renderMessagePreview = (message) => {
    const previewLength = 85;
    return message.length > previewLength
      ? `${message.substring(0, previewLength)}...`
      : message;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.titlebg}>
        <Text style={styles.headerText}>Meldingen</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notification}
            onPress={() => handleNotificationPress(item)}
          >
            {!readNotifications[item.id] && <View style={styles.greenCircle} />}
            <View>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationText}>
                {renderMessagePreview(item.message)}
                <Text style={styles.readMore}>Lees meer</Text>
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedNotification && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {selectedNotification.title}
              </Text>
              <Text style={styles.modalMessage}>
                {selectedNotification.message}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Sluiten</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    height: 100,
    backgroundColor: "#146bab",
    justifyContent: "start",
    alignItems: "flex-end",
    flexDirection: "row",
    padding: 20,
  },
  titlebg: {
    backgroundColor: "lightgray",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    height: 80,
  },
  headerText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
  },
  readMore: {
    color: "blue",
    textDecorationLine: "underline",
  },
  notification: {
    backgroundColor: "white",
    padding: 20,
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
  },
  notificationText: {
    marginLeft: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  greenCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 400,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#146bab",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
