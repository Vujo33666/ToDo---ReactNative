import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Alert, TextInput, ScrollView, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from "./components/header";
import TodoItem from "./components/todoItem";
import AddToDo from "./components/addToDo";

export default function App() {

  const [blankField,setBlankField] = useState(false);
  const [todos,setTodos] = useState([
    {text: "buy coffee", key: "1"},
    {text: "work on the project", key: "2"},
    {text: "play basketball", key: "3"},
  ])

  function handleItems(key){
    setTodos((prevTodos)=>{
      return prevTodos.filter(todo => todo.key !== key);
    });
  }

  function addNewToDo(todo){
    if(todo.length>3){
      setTodos((prevTodos)=>{
        return[
          ...prevTodos,
          {text:todo, key: Math.random().toString()}
        ]
      })
      setBlankField(true);
    }else{
      Alert.alert("Oops!", "Todos must be over 3 chars long", [
        {text: "Understood", onPress: () => console.log("alert closed!")}
      ]);
      setBlankField(false);
    }

  }

  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
      console.log("dissmised keyboard");
    }}>
      <View style={styles.container}>
      <Header />
        <View style={styles.content}>
          <AddToDo 
            addNewToDo={addNewToDo}
            blankField={blankField}
          />
          <View style={styles.list}>
            <FlatList 
              data={todos}
              numColumns={1}
              renderItem={({item})=>(
                <TodoItem 
                  item={item}
                  handleItems={handleItems}
                />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  content:{
    padding: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  list:{
    margin:10,
  }
});

