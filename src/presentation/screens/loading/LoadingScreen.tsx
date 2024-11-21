import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"

export const LoadingScreen = () => {

    const { height} = useWindowDimensions();

    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Spinner status="primary" size='large'/>
        </Layout>
    )
}