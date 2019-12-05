import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

const categories = [];

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Kategorien:</Text>
      <Button
        title="Kategorie hinzufügen"
        onPress={() => props.navigation.navigate('detail',{categories})}
      />
      {categories.map((category,key)=> (<View style={styles.wrapper} key={key}>
        <Button
        title={category.title}
        onPress={() => props.navigation.navigate('detail',{categories})}
        />
      </View>))}
      
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
