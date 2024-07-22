import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, ListView, EventCard } from "app/components"
import { colors, spacing } from "../theme"
import { ContentStyle } from "@shopify/flash-list"
import { useStores, ApiStore } from "app/models"

// const navigation = useNavigation()
// import { useStores } from "app/models"

// Pull in one of our MST stores
// const { someStore, anotherStore } = useStores()

// Pull in navigation via hook

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const { apiStore } = useStores()

  useEffect(() => {
    ;(async () => {
      await apiStore.fetchData()
      // apiStore.printApiStore()
    })()
  }, [apiStore])

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <ListView
        contentContainerStyle={$listContentContainer}
        data={apiStore.apiData}
        estimatedItemSize={170}
        renderItem={({ item }: { item: ApiStore }) => (
          <View style={$screenview}>
            <EventCard item={item} />
          </View>
        )}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}
const $screenview: ViewStyle = {
  marginVertical: spacing.med,
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.sm,
}
