import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import ErrorMessage from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      total
      charge
      user {
        id
      }
      items {
        id
        name
        description
        price
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const SingleOrderPage = ({ query }) => {
  const { id } = query;
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id },
  });

  //   console.log({ data });

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  if (!data?.order) return <p>No order found for {id}</p>;
  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits - Order {data.order.id}</title>
      </Head>
      <p>
        <span>Order ID:</span>
        <span>{id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{data.order.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(data.order.total)}</span>
      </p>
      <p>
        <span>Item Count:</span>
        <span>{data.order.items.length}</span>
      </p>
      <div>
        {data.order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
};

SingleOrderPage.propTypes = {
  query: PropTypes.object,
};

export default SingleOrderPage;
