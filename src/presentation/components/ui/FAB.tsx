import { Button } from "@ui-kitten/components"
import { MyIcon } from "./MyIcon"
import { StyleProp, ViewStyle } from "react-native"

interface Props {
    iconName?: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export const FAB = ({ style, iconName, onPress }: Props) => {
  return (
    <Button
        style={[style,{ 
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 3,
            borderRadius: 17,
            height: 50,
            width: 50
        }]}
        accessoryLeft={ <MyIcon name={iconName || 'flag'} white /> }
        onPress={onPress}
    />
  )
}
