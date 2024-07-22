import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"

export interface LimitedTimeProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const LimitedTime = observer(function LimitedTime() {
  return (
    <View style={$container}>
      <Text style={$text}>Limited Time</Text>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 8,
  borderRadius: 8,
  backgroundColor: "#e85934",
  zIndex: 2,
  bottom: 6,
  right: 10,
  marginHorizontal: 2,
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.neutral100,
  textAlign: "center",
}
