import Link from 'next/link';
import PropTypes from 'prop-types';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';

const Product = ({ productData }) => {
  console.log({ productData });
  return (
    <ItemStyles>
      <img
        src={productData?.photo?.image?.publicUrlTransformed}
        alt={productData.name}
      />
      <Title>
        <Link href={`/product/${productData.id}`}>{productData.name}</Link>
      </Title>
      <PriceTag>{formatMoney(productData.price)}</PriceTag>
      <p>{productData.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: { id: productData.id },
          }}
        >
          Edit ✏️
        </Link>
        <AddToCart id={productData.id} />
        <DeleteProduct id={productData.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
};
Product.propTypes = {
  productData: PropTypes.object.isRequired,
};

export default Product;
