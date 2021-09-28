import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function AddToDo (props){
    
    const [text,setText] = useState("");

    function changeHandler(value){
        setText(value);
    }

    useEffect(()=>{
        props.blankField && changeHandler("");
    },[props.blankField])

    return (
        <View>
            <TextInput 
                style={styles.input}
                placeholder="new todo..."
                onChangeText={changeHandler}
                value={text}
            />
            <Button 
                onPress={()=>{
                    props.addNewToDo(text);
                }} 
                title="Add todo"
                color="coral"
            />
        </View>
    )
}

const styles=StyleSheet.create({
    input:{
        marginBottom:10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    }
})