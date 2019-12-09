import React from 'react';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

const answers = [];

export default class DetailScreen extends React.Component {
  componentDidMount(){
    
  }
  render(){
    this.props.navigation.getParam('category');
    return (
      <ScrollView>
        <Text>Fragen in dieser Kategorie:</Text>
        {answers.map((answer,key)=> (<View style={styles.wrapper} key={key}>
          <Button
          style={styles.button}
          title={answer.title}
          onPress={() => this.props.navigation.navigate('detailquestions',{question:question})}
          />
        </View>))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button:{
    margin:5,
  }
});
