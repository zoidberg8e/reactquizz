import React from 'react';
import { Button, StyleSheet, Text, ScrollView, View, ActivityIndicatorComponent } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { app, db } from '../firebase.js';


var categories = []

let categoriesRef = db.ref('/categories');
export default class HomeScreen extends React.Component {
  state = {
    categories: categories
  };
  componentDidMount(){
  categoriesRef.on('value', snapshot => {
      let data = snapshot.val();
      if( data ){
        let categories = Object.values(data);
        this.setState({ categories });
      } else {
        console.log("category data is empty");
        console.log(data)
      }
    });
    console.log(this.state.categories);
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
        {this.state.categories.map((category,name)=> (<View style={styles.wrapper} name={name}>
          <Button
            style={styles.button}
            title={category.name}
            onPress={() => this.props.navigation.navigate('detail',{category:category})}
          />
        <Text/>
        </View>))}
        
          <Button style={styles.spacer} title="Ausloggen" onPress={() => firebase.auth(app).signOut()} mode="contained">Ausloggen</Button>
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