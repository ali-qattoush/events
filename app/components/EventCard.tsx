import React from "react"
import { ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { LimitedTime, TopRated, Card, Text, AutoImage, Icon, StarRatingComp } from "../components"
import { useNavigation } from "@react-navigation/native"
import { ApiStore } from "app/models"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "app/navigators"

export interface EventCardProps {
  item: ApiStore
  style?: StyleProp<ViewStyle>
}

type EventScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, "Event">

export const EventCard = observer(function EventCard(props: EventCardProps) {
  const { item, style } = props
  const navigation = useNavigation<EventScreenNavigationProp>()

  const costChecker =
    item.cost !== "Free" ? (
      <Text size="xxs" style={$priceText}>
        Start From{" "}
        <Text size="xs" style={$boldText}>
          ${item.cost}
        </Text>{" "}
        /Person
      </Text>
    ) : (
      <Text size="xxs" style={$freeText}>
        Free
      </Text>
    )

  const limitedTime = item.limited ? <LimitedTime /> : null
  const topRated = item.top_rated ? <TopRated /> : null
  const heartIcon = <Icon icon="heart" size={20} color="#FFFFFF" style={$heartIcon} />

  return (
    <Card
      preset="default"
      style={[$item, style]}
      verticalAlignment="force-footer-bottom"
      onPress={() => navigation.navigate("Event", { item })}
      HeadingComponent={
        <View style={$imgContainer}>
          <AutoImage style={$img} source={{ uri: item.image }} maxHeight={100} />
          <View style={$badges}>
            <View style={$heartIconContainer}>{heartIcon}</View>
            <View style={$badgeRow}>
              {topRated}
              {limitedTime}
            </View>
          </View>
        </View>
      }
      ContentComponent={
        <View style={$container}>
          <View style={$contentContainer}>
            <Text size="xxs" style={$activity}>
              {item.activity_type}
            </Text>
            <View style={$ratingContainer}>
              <StarRatingComp ratingValue={item.rating} />
              <Text size="xxs" style={$ratingText}>
                {item.rating}
              </Text>
            </View>
          </View>
          <Text style={$titleText} size="xs">
            {item.title}
          </Text>
          {costChecker}
        </View>
      }
    />
  )
})

const $container: ViewStyle = {
  paddingTop: 6,
  paddingRight: 5,
  paddingLeft: 13,
  paddingBottom: 6,
  marginBottom: 5,
  flexGrow: 1,
}

const $imgContainer: ViewStyle = {
  justifyContent: "flex-end",
  alignItems: "flex-end",
}

const $badges: ViewStyle = {
  position: "absolute",
  zIndex: 2,
  height: "100%",
  justifyContent: "space-between",
}

const $heartIconContainer: ViewStyle = {
  alignItems: "flex-end",
  right: 30,
  top: 10,
}

const $heartIcon: ImageStyle = {
  position: "absolute",
  zIndex: 3,
}

const $badgeRow: ViewStyle = {
  flexDirection: "row",
}

const $contentContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const $text: TextStyle = {
  fontFamily: typography.primary.medium,
  color: colors.palette.main,
}

const $activity: TextStyle = {
  ...$text,
}

const $ratingContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $ratingText: TextStyle = {
  marginHorizontal: 5,
  color: colors.palette.main,
}

const $img: ImageStyle = {
  width: "100%",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
}

const $item: ViewStyle = {
  padding: 0,
  flex: 1,
}

const $titleText: TextStyle = {
  ...$text,
  fontWeight: "bold",
}

const $priceText: TextStyle = {
  color: colors.palette.priceGrey,
}

const $boldText: TextStyle = {
  fontWeight: "bold",
}

const $freeText: TextStyle = {
  color: colors.palette.lightGreen,
}
