import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import StarRating from "react-native-star-rating-widget"

export interface StarRatingCompProps {
  /**
   * An optional style override useful for padding & margin.
   */
  ratingValue: number
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const StarRatingComp = observer(function StarRatingComp(props: StarRatingCompProps) {
  const { style, ratingValue } = props
  const $styles = [$container, style]

  return (
    <StarRating
      rating={ratingValue}
      onChange={() => {
        console.log()
      }}
      maxStars={5} // Adjust the number of stars here
      starSize={15} // Customize the size of the stars
      starStyle={$starStyle}
      color="#ffb300" // Customize the color of selected stars
      emptyColor="#aaa" // Customize the color of unselected stars
      enableHalfStar={true} // Enable half-star ratings
      style={$styles}
    />
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $starStyle: ViewStyle = {
  marginHorizontal: 0,
}
