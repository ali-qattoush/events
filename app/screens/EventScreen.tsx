import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, View, ViewStyle, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import {
  Screen,
  Text,
  AutoImage,
  Icon,
  Accessibility,
  Button,
  TopRated,
  LimitedTime,
  SpecialPrice,
  FreeCancellation,
  Family,
  Food,
} from "app/components"
import { colors, typography } from "app/theme"
import ReadMoreField from "app/components/ReadMoreField"
import { ApiStore } from "app/models"
import { StarRatingComp } from "../components"
import { useNavigation } from "@react-navigation/native"

interface EventScreenProps extends AppStackScreenProps<"Event"> {}

export const EventScreen: FC<EventScreenProps> = observer(function EventScreen({ route }) {
  const { item } = route.params as { item: ApiStore }
  const navigation = useNavigation()

  const costChecker = (item: ApiStore, displayType: number) => {
    const getDisplayText = (displayType: number) => {
      switch (displayType) {
        case 1:
          return "Price start from"
        default:
          return "From"
      }
    }

    const getEndingText = (displayType: number) => {
      switch (displayType) {
        case 1:
          return "/person"
        default:
          return "\n/per /person"
      }
    }

    return item.cost !== "Free" ? (
      <Text size="xs" style={$costText}>
        {getDisplayText(displayType)}{" "}
        <Text size="sm" style={$costBoldText}>
          ${item.cost}
        </Text>{" "}
        {getEndingText(displayType)}
      </Text>
    ) : (
      <Text size="xs" style={$freeText}>
        Free
      </Text>
    )
  }

  const limitedTime = item.limited ? <LimitedTime /> : null
  const topRated = item.top_rated ? <TopRated /> : null
  const specialPrice = item.special_price ? <SpecialPrice /> : null
  const freeCancellation = item.free_cancellation ? <FreeCancellation /> : null
  const family = item.family ? <Family /> : null
  const food = item.include_food ? <Food /> : null
  const ac = item.accessibility ? <Accessibility /> : null

  return (
    <Screen safeAreaEdges={["top"]} preset="auto" contentContainerStyle={$screenContentContainer}>
      <View style={$imageContainer}>
        <AutoImage
          style={$img}
          source={{
            uri: item.image,
          }}
          maxHeight={100}
        />
        <Button
          text="←"
          textStyle={$backButtonText}
          style={$backButton}
          onPress={() => navigation.goBack()}
        />
        <View style={$heartIconContainer}>
          <Icon icon="heart" size={20} color="#FFFFFF" style={$heartIcon} />
        </View>
        <View style={$likeDislikeContainer}>
          <Icon icon="thumbsup" size={20} color="#FFFFFF" style={$likeIcon} />
          <Icon icon="thumbsdown" size={20} color="#FFFFFF" style={$dislikeIcon} />
        </View>
      </View>
      <ScrollView contentContainerStyle={$scrollContentContainer}>
        <View style={$activityContainer}>
          <Text style={$activity}>{item.activity_type}</Text>
        </View>
        <Text style={$title}>{item.title}</Text>
        <View style={$ratingReviewContainer}>
          <StarRatingComp ratingValue={item.rating} />
          <Text size="xs" style={$ratingText}>
            {item.rating}
          </Text>
          <Text size="xs" style={$reviewsText}>
            ({item.reviews} reviews)
          </Text>
        </View>
        <View style={$badges}>
          {topRated}
          {limitedTime}
        </View>
        <Text style={$costTextContainer}>{costChecker(item, 1)}</Text>
        <View style={$familyPrice}>{specialPrice}</View>
        <Text style={$descriptionTitle}>Description</Text>
        <ReadMoreField item={item} />
        <View style={$container2}>
          <View style={$locationContainer}>
            <Icon icon="location" size={20} style={$locationIcon} />
            <Text style={$locationText} size="sm">
              {item.city}
            </Text>
          </View>
          {freeCancellation}
        </View>
        <View>
          {family}
          {food}
          {ac}
        </View>
        <View style={$bookingContainer}>
          <Text style={$costCheckerText}>{costChecker(item, 2)}</Text>
          <Button text="Book this activity" textStyle={$bookingButtonText} style={$bookingButton} />
        </View>
      </ScrollView>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  backgroundColor: colors.white,
  flex: 1,
  borderColor: colors.palette.borderColor,
}

const $scrollContentContainer: ViewStyle = {
  flexGrow: 1,
}

const $imageContainer: ViewStyle = {
  // position: "relative",
}

const $img: ImageStyle = {
  width: "100%",
  height: 300,
}

const $backButton: ViewStyle = {
  position: "absolute",
  top: 10,
  left: 10,
  backgroundColor: colors.palette.orange,
  borderRadius: 20,
  marginLeft: 15,
  marginTop: 15,
  borderWidth: 0,
  paddingVertical: 15,
  paddingHorizontal: 18,
}

const $backButtonText: TextStyle = {
  color: colors.palette.white,
  fontSize: 18,
  height: "auto",
}

const $heartIconContainer: ViewStyle = {
  position: "absolute",
  top: 10,
  right: 10,
  backgroundColor: "rgba(128, 128, 128, 0.6)",
  borderRadius: 20,
  padding: 15,
  marginRight: 15,
  marginTop: 15,
}

const $heartIcon: ImageStyle = {
  padding: 10,
}

const $likeDislikeContainer: ViewStyle = {
  position: "absolute",
  bottom: 10,
  right: 10,
  flexDirection: "row",
}

const $likeIcon: ImageStyle = {
  marginRight: 20,
}

const $dislikeIcon: ImageStyle = {
  marginRight: 15,
}

const $container2: ViewStyle = {
  marginTop: 15,
  borderTopWidth: 4,
  width: "100%",
  paddingHorizontal: 25,
  borderTopColor: colors.palette.neutral300,
  borderBottomWidth: 4,
  borderBottomColor: colors.palette.neutral300,
}

const $badges: ViewStyle = {
  flexDirection: "row",
  marginTop: 15,
  paddingHorizontal: 34,
}

const $familyPrice: ViewStyle = {
  width: "120%",
  marginTop: 10,
  marginBottom: 15,
  paddingHorizontal: 25,
}

const $ratingReviewContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  height: 20,
  paddingHorizontal: 25,
}

const $activityContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 5,
  paddingHorizontal: 25,
}

const $title: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 20,
  flexWrap: "wrap",
  marginBottom: 7,
  marginTop: 1,
  color: colors.palette.main,
  fontWeight: "bold",
  paddingHorizontal: 25,
}

const $activity: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  marginTop: 4,
  color: colors.palette.main,
}

const $costText: TextStyle = {
  color: colors.palette.main,
}

const $costBoldText: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.main,
}

const $freeText: TextStyle = {
  color: colors.palette.lightGreen,
}

const $ratingText: TextStyle = {
  marginLeft: 5,
  marginTop: -2,
  color: colors.palette.main,
}

const $reviewsText: TextStyle = {
  marginLeft: 5,
  marginTop: -2,
  color: colors.palette.main,
  fontWeight: "bold",
}

const $costTextContainer: TextStyle = {
  paddingVertical: 4,
  top: 10,
  marginTop: -5,
  paddingHorizontal: 25,
}

const $descriptionTitle: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.main,
  marginBottom: 3,
  paddingHorizontal: 25,
}

const $locationContainer: ViewStyle = {
  flexDirection: "row",
  marginVertical: 13,
  alignItems: "center",
}

const $locationIcon: ImageStyle = {
  marginRight: 10,
  marginTop: 3,
}

const $locationText: TextStyle = {
  fontWeight: "bold",
  color: colors.palette.main,
}

const $bookingContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  padding: 30,
}

const $costCheckerText: TextStyle = {
  width: "35%",
  flexWrap: "wrap",
}

const $bookingButtonText: TextStyle = {
  color: "#FFFFFF",
  textAlign: "center",
  width: "100%",
}

const $bookingButton: ViewStyle = {
  width: "70%",
  height: 60,
  marginTop: 15,
  backgroundColor: colors.palette.orange,
  bottom: 6,
  borderRadius: 20,
}
