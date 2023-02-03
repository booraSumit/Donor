import React, { useState, useEffect } from "react";
import { View, Modal, FlatList, Button } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

import RequestCard from "../components/RequestCard";
import reqApi from "../api/requests";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import ActivityIndicator from "../components/animation/ActivityIndicator";
import { ErrorMessage } from "../components/form";

function RequestedList({ visible, onClose }) {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const result = await reqApi.myRequests(user._id);
    if (!result.ok) console.log(result.data);
    setData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <GestureRecognizer style={{ flex: 1 }} onSwipeDown={() => onClose(false)}>
        <Modal visible={visible} animationType="slide" style={{ flex: 1 }}>
          <ActivityIndicator visible={loading} />
          <Button
            title="Close"
            color={colors.primary}
            onPress={() => onClose(false)}
          />

          {data.length < 1 && (
            <ErrorMessage error={"No requests"} visible={true} />
          )}

          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <RequestCard
                btype={item.group}
                unit={item.unit}
                location={item.address}
                date={item.date}
              />
            )}
          />
        </Modal>
      </GestureRecognizer>
    </View>
  );
}

export default RequestedList;
