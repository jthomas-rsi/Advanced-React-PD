import Link from 'next/link';
import PropTypes from 'prop-types';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

const Product = ({ productData }) => (
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
          pathname: 'update',
          query: { id: productData.id },
        }}
      >
        Edit ✏️
      </Link>
      {/* <button type="button">Add To Cart</button>
      <button type="button">Delete</button> */}
    </div>
  </ItemStyles>
);

Product.propTypes = {
  productData: PropTypes.object.isRequired,
};

export default Product;
