import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';


export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
      <Button
        title="Gehe zu DetailScreen"
        onPress={() => props.navigation.navigate('detail')}
      />
        <Button style={styles.spacer} title="Ausloggen" onPress={() =>     firebase.auth().signOut()} mode="contained">Ausloggen</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
