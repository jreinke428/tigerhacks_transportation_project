import React from 'react';
import { View, StyleSheet } from 'react-native';
import color from 'color';

const BACKGROUND = '#3d3d3d';
const RADIUS = 10;

export default function Morph({ radius, style, revert, borderless, children }){
    const topStyles = StyleSheet.flatten([
      styles.morphTop,
      revert && {
        shadowColor: color(BACKGROUND)
          .darken(0.1)
          .alpha(0.5),
      },
      { borderRadius: radius || RADIUS },
      style,
    ]);
  
    const bottomStyles = StyleSheet.flatten([
      styles.morphBottom,
      revert && {
        shadowColor: color(BACKGROUND)
        .lighten(0.5)
        .alpha(0.5),
      },
      { borderRadius: radius || RADIUS },
    ]);
  
    const morphStyles = StyleSheet.flatten([
      styles.morph,
      borderless && { borderWidth: 0 },
      { borderRadius: radius || RADIUS },
    ]);
  
    return (
      <View style={topStyles}>
        <View style={bottomStyles}>
          <View style={morphStyles}>{children}</View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: BACKGROUND
    },
    neumorphism: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white'
    },
    morph: {
      borderRadius: RADIUS,
      borderWidth: 1,
      backgroundColor: BACKGROUND,
      borderColor: color(BACKGROUND)
        .lighten(0.5)
        .alpha(0.2),
    },
    morphTop: {
      borderRadius: RADIUS,
      // box-shadow is equivalent to shadow style in React Native
      shadowOffset: {
        width: -6,
        height: -6,
      },
      shadowOpacity: 1,
      shadowRadius: 6,
      shadowColor: color(BACKGROUND)
        .lighten(0.5)
        .alpha(0.5), // this should be lighter shadow
    },
    morphBottom: {
      borderRadius: RADIUS,
      // box-shadow is equivalent to shadow style in React Native
      shadowOffset: {
        width: 6,
        height: 6,
      },
      shadowOpacity: 1,
      shadowRadius: 6,
      shadowColor: color(BACKGROUND)
        .darken(0.3)
        .alpha(0.5), // this should be darker shadow
    },
});