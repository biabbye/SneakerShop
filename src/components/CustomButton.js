import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { COLOURS } from '../constants';

export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: COLOURS.blue,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: COLOURS.white,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}