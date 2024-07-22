import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Icon } from "../components"

export interface FreeCancellationProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const FreeCancellation = observer(function FreeCancellation(props: FreeCancellationProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Icon icon="checkmark" color="00FF00" size={21} style={$icon} />
      <Text size="sm" style={$text}>
        Free Cancellation
      </Text>
    </View>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  marginBottom: 15,
}

const $icon: ImageStyle = {
  marginRight: 13,
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  color: colors.palette.main,
  fontWeight: "bold",
  bottom: 4,
}
