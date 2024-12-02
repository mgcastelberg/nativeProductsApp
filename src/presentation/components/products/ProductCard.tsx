import { Text } from '@ui-kitten/components';
import { Product } from '../../../domain/entities/product';

interface Props {
    product: Product;
}

export const ProductCard = ({product}: Props) => {
    return (
        <Text>{product.title}</Text>
    )
}