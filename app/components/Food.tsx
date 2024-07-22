import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Icon } from "../components"

export interface FoodProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Food = observer(function Food(props: FoodProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <View style={$innerContainer}>
        <View style={$row}>
          <Icon icon="pan" size={24} style={$icon} />
          <Text size="sm" style={$text}>
            Food Included
          </Text>
        </View>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  paddingTop: 6,
  marginTop: 15,
  paddingBottom: 6,
  borderBottomWidth: 4,
  borderBottomColor: colors.palette.neutral300,
}

const $innerContainer: ViewStyle = {
  paddingHorizontal: 25,
}

const $row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 13,
}

const $icon: ImageStyle = {
  marginRight: 12,
  bottom: 2,
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  bottom: 3,
  color: colors.palette.main,
  fontWeight: "bold",
}
