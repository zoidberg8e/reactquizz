import React from 'react';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

const questions = [];

export default function DetailScreen(props) {
  props.navigation.getParam('category');
  return (
    <ScrollView>
      <Text>Fragen in dieser Kategorie:</Text>
      {questions.map((question,key)=> (<View style={styles.wrapper} key={key}>
        <Button
        title={question.title}
        onPress={() => props.navigation.navigate('detailquestions',{question:question})}
        />
      </View>))}
    </ScrollView>
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
