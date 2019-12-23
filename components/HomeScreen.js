import React from 'react';
import { Button, StyleSheet, Text, ScrollView, View, ActivityIndicatorComponent } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

//i think (hope) i wont need that again...
//import firestore from '@react-native-firebase/firestore';
//var categories = firestore.collection("categories");
//var categoriesRef = firebase.firestore.CollectionReference('categories');
//var categories = [];

var categories = [];

export default class HomeScreen extends React.Component {
  async getCategories() {
    const snapshot = await firebase.firestore().collection('categories').get();
    return snapshot.docs.map(doc => doc.data());
  } 
  componentDidMount(){
    categories = this.getCategories();
  }
  render(){
    return (
      <ScrollView>
        <Text>Kategorien:</Text>
        <Button
          style={styles.button}
          title="Kategorie hinzufügen"
          onPress={() => this.props.navigation.navigate('detail')}
        />
        <Text/>
        {categories.map((category,name)=> (<View style={styles.wrapper} name={name}>
          <Button
            style={styles.button}
            title={category.name}
            onPress={() => this.props.navigation.navigate('detail',{category:category})}
          />
        <Text/>
        </View>))}
        
          <Button style={styles.spacer} title="Ausloggen" onPress={() => firebase.auth.signOut()} mode="contained">Ausloggen</Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin:15,
    borderColor: 'black',
  }
});