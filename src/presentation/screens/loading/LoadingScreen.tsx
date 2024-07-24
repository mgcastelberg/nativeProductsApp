import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"


export const LoadingScreen = () => {

    const { height} = useWindowDimensions();

    return (
        <Layout style={{flex: 1}}>
            <Text>Hola</Text>
        </Layout>
    )
}