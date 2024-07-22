import React, { useCallback, useRef, useMemo } from "react"
import { View, Text, TextStyle, ViewStyle, ImageStyle } from "react-native"
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetModal } from "@gorhom/bottom-sheet"
import { Button, Icon } from "app/components"
import { spacing, colors, typography } from "app/theme"
import { ApiStore } from "app/models"

type ReadMoreProps = {
  item: ApiStore
}

const ReadMoreField: React.FC<ReadMoreProps> = ({ item }) => {
  const sheet = useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ["90%"], [])

  const handleOpenBottomSheet = useCallback(() => {
    sheet.current?.present()
  }, [])

  const dismissOptions = useCallback(() => {
    sheet.current?.dismiss()
  }, [])

  const truncateText = (text: string) => {
    const maxLength = 120
    if (text.length <= maxLength) {
      return text
    }
    return text.substring(0, maxLength) + "..."
  }

  return (
    <View style={$container}>
      <View style={$descriptionContainer}>
        <Text style={$description}>
          {truncateText(item.description)}
          {item.description.length > 100 && (
            <>
              {" "}
              <Text style={$readMoreText} onPress={handleOpenBottomSheet}>
                Read More
              </Text>
            </>
          )}
        </Text>
      </View>

      <BottomSheetModal
        ref={sheet}
        snapPoints={snapPoints}
        stackBehavior="replace"
        enableDismissOnClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
        footerComponent={(props) => (
          <BottomSheetFooter {...props} style={$bottomSheetFooter}>
            <Button text="Done" style={$doneButton} preset="reversed" onPress={dismissOptions} />
          </BottomSheetFooter>
        )}
      >
        <View style={$topBar}>
          <Icon
            icon="close"
            color="#365361"
            size={15}
            onPress={dismissOptions}
            style={$closeIcon}
          />
          <Text style={$topBarText}>Read More</Text>
        </View>
        <View style={$divider} />
        <View style={$bottomSheetContent}>
          <Text style={$title}>{item.title}</Text>
          <Text style={$descriptionText}>{item.description}</Text>
        </View>
      </BottomSheetModal>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: 25,
}

const $title: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 20,
  flexWrap: "wrap",
  marginBottom: 10,
  color: colors.palette.main,
  fontWeight: "bold",
}

const $descriptionContainer: ViewStyle = {
  flex: 1,
}

const $description: TextStyle = {
  fontSize: 14,
  color: colors.palette.main,
  textAlign: "justify",
  flex: 1,
}

const $readMoreText: TextStyle = {
  color: "#007bff",
  fontSize: 14,
  fontWeight: "bold",
}

const $topBar: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.sm,
  paddingBottom: 30,
}

const $topBarText: TextStyle = {
  fontSize: 16,
  color: colors.palette.main,
  fontWeight: "bold",
  textAlign: "center",
  flex: 1,
}

const $closeIcon: ImageStyle = {
  position: "absolute",
  left: 20,
  bottom: -8,
}

const $divider: ViewStyle = {
  borderBottomColor: colors.palette.neutral300,
  borderBottomWidth: 4,
  width: "100%",
}

const $bottomSheetContent: ViewStyle = {
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "center",
  padding: spacing.lg,
}

const $bottomSheetFooter: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.xs,
}

const $doneButton: ViewStyle = {
  height: 55,
  borderRadius: 20,
  backgroundColor: colors.palette.orange,
}

const $descriptionText: TextStyle = {
  color: colors.palette.main,
}

export default ReadMoreField
