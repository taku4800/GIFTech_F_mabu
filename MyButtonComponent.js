import React from 'react';
import { View, Button, Alert } from 'react-native';

const MyButtonComponent = () => {
  const handlePress = () => {
    Alert.alert('登録用の画面を開く');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="写真を登録する"
        onPress={handlePress}
      />
    </View>
  );
}

export default MyButtonComponent;
