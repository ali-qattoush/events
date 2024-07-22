import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"

export interface TopRatedProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const TopRated = observer(function TopRated() {
  // const { style } = props
  // const $styles = [$container, style]

  return (
    <View style={$container}>
      <Text style={$text}>Top Rated</Text>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 8,
  borderRadius: 8,
  backgroundColor: "#0ba1bf",
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
