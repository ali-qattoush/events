import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import { Icon } from "../components"

export interface FamilyProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Family = observer(function Family(props: FamilyProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <View style={$innerContainer}>
        <View style={$row}>
          <Icon icon="family" size={24} style={$icon} />
          <Text size="sm" style={$text}>
            Family and Kids Friendly
          </Text>
        </View>
        <Text size="xs" style={$description}>
          Family and kids friendly (suitable for ages 8-12, minimum height requirement 4 feet)
        </Text>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  paddingTop: 6,
  paddingBottom: 6,
  marginTop: 15,
  borderBottomWidth: 4,
  borderBottomColor: colors.palette.neutral300,
}

const $innerContainer: ViewStyle = {
  paddingHorizontal: 25,
}

const $row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $icon: ImageStyle = {
  marginRight: 10,
  bottom: 2,
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  color: colors.palette.main,
  fontWeight: "bold",
  bottom: 4,
}

const $description: TextStyle = {
  marginLeft: 35,
  marginBottom: 15,
}
