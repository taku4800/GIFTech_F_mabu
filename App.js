import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

//諸々のインポート。今回はimage-pickeでなくrexpo-image-pickerを使う

const App = () => {
  // 選択された画像のURIを保持するステート
  const [selectedImages, setSelectedImages] = useState([]);

  // ユーザーの許可を取得し、初期設定を行う関数
  useEffect(() => {
    (async () => {
      // カメラロールへのアクセス許可を要求
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('カメラロールへのアクセスが許可されていません。');
      }
    })();
  }, []);

  // カメラロールから写真を選択する関数
  const selectImageHandler = async () => {
    // ImagePickerで複数の画像を選択
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // これをtrueにしないと複数選択できない。allowsEditingと共存不可。設定しないかfalseにすること。
      aspect: [1, 1],
      quality: 1,
      multiple: true,
    });

  // 選択された画像をステートに追加
  if (!result.cancelled) {
    const selectedUris = result.assets.map(asset => asset.uri);
    //各resultのassetsにurlのある配列が存在するのでこうしている。resultの構成は{"assets": [{"uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FSampleProject-e4991c3c-129b-400d-bfc2-2db5e6796265/ImagePicker/a2dde2f2-ca65-4e32-ac97-c94a25270462.jpeg",fileNameなど}], "canceled": false}となっている
    setSelectedImages([...selectedImages, ...selectedUris]);
    //各ステートに追加
  }
};

  return (
    <View style={styles.container}>
      {/* 写真を表示する領域 */}
      <ScrollView horizontal style={styles.imageContainer}>
        {selectedImages.map((uri, index) => (
          // 画像を正方形にするために、サイズを設定
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>

      {/* ボタンを表示 */}
      <Button title="写真を選択する" onPress={selectImageHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    flexDirection: 'row', // 横に並べる
    marginBottom: 20,
  },
  image: {
    width: 150, // 正方形にするためのサイズ指定
    height: 150,
    marginHorizontal: 5, // 画像間の余白を設定
    borderRadius: 10, // 角丸にする
    marginTop: 300,
  },
});

export default App;
