import { Card, Text } from '@ui-kitten/components';
import { Product } from '../../../domain/entities/product';
import { FadeInImage } from '../ui/FadeInImage';
import { Image } from 'react-native';

interface Props {
    product: Product;
}

export const ProductCard = ({product}: Props) => {
    return (
        <Card
            style={{ flex: 1, backgroundColor: '#F9F9F9', margin: 5 }}
        >
            { 
                (product.images.length === 0)
                ? (<Image 
                        source={ require ('../../../assets/no-product-image.png') } 
                        style={{ width: '100%', height: 150 }} 
                  />)
                : (<FadeInImage 
                    uri={product.images[0]} 
                    style={{flex: 1, width: '100%', height: 200}} 
                  />)
            }

            <Text numberOfLines={2} style={{ textAlign: 'center'}}>{product.title}</Text>

        </Card>

        // <Card
        //     style={{ flex: 1, backgroundColor: '#F9F9F9', margin: 5 }}
        //     header={() => <Image source={{ uri: product.images[0] }} style={{ width: 150, height: 150 }} />}
        //     footer={() => <Text category='c1'>{product.title}</Text>}
        // >
        // </Card>

        // <Text>{product.title}</Text>
        // <Image
        //     source={{ uri: product.images[0] }}
        //     style={{ width: 150, height: 150 }}
        // />
    )
}