import React from 'react';
import { Button, StyleSheet, Text, ScrollView } from 'react-native';
import * as firebase from 'firebase';

const categories = [];

export default class HomeScreen extends React.Component {
  componentDidMount(){
    
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
        {categories.map((category,key)=> (<View style={styles.wrapper} key={key}>
          <Button
          style={styles.button}
          title={category.title}
          onPress={() => this.props.navigation.navigate('detail',{category:category})}
          />
        <Text/>
        </View>))}
        
          <Button style={styles.spacer} title="Ausloggen" onPress={() =>     firebase.auth.signOut()} mode="contained">Ausloggen</Button>
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
