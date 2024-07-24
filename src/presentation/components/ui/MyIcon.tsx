
import { Icon, useTheme } from '@ui-kitten/components';
import { StyleSheet, Text, View } from 'react-native'

interface Props {
    name: string;
    color?: string;
    white?: boolean;
}

export const MyIcon = ({name, color, white=false}:Props) => {

    const theme = useTheme();
    // console.log(theme);

    if(white){
        color = theme['color-primary-100'];
    } else if(!color){
        color = theme['text-basic-color'];
    } else {
        color = theme[color];
    }

    return (
        <Icon style={ styles.icon } fill={ color } name={ name }/>
    )
}

const styles = StyleSheet.create({
    icon:{
        width: 30,
        height: 30
    }
})