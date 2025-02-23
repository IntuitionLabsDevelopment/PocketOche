import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: object;
    textStyle?: object;
}

export default function Button({ title, onPress, style, textStyle }: ButtonProps) {
    const backgroundColor = useThemeColor({}, 'button');
    return (
        <Pressable style={[styles.button, style, { backgroundColor}]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
