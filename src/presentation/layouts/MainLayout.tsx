import { useNavigation } from '@react-navigation/native';
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MyIcon } from '../components/ui/MyIcon';

// recibe componentes como hijos
interface Props {
    title: string;
    subtitle: string;

    rightAction?: () => void;
    rightActionIcon?: string;

    children: React.ReactNode;
}

export const MainLayout = ({title, subtitle,rightAction, rightActionIcon, children}:Props) => {

    const {top} = useSafeAreaInsets();
    const { canGoBack, goBack } = useNavigation();

    const renderBackAction = () => (
    //   canGoBack() && (
        <TopNavigationAction
            icon={ <MyIcon name='arrow-back-outline' /> } 
            onPress={goBack}
        />
    //   )
    );

    const RenderRightAction = () => {
        if(!rightAction || rightActionIcon === undefined ) return null;
        return (
            <TopNavigationAction
                icon={ <MyIcon name={rightActionIcon} /> } 
                onPress={rightAction}
            />
        )
    };

    return (
      <Layout style={{ paddingTop: top }}>
        <TopNavigation
          title={title}
          subtitle={subtitle}
          alignment='center'
        //   accessoryLeft={renderBackAction}
          accessoryLeft={ canGoBack() ? renderBackAction : undefined }
          accessoryRight={ () => <RenderRightAction/> }
        />
        <Divider />
        <Layout style={{ height: '100%', backgroundColor: 'gainsboro' }}>
            {children}
        </Layout>
      </Layout>
    )
}
