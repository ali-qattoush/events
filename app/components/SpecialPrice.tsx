import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"

export interface SpecialPriceProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const SpecialPrice = observer(function SpecialPrice(props: SpecialPriceProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Text style={$text}>Special price for families</Text>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  width: "80%",
  backgroundColor: "rgba(173, 216, 230, 0.5)",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.specialPrice,
  textAlign: "center",
}
