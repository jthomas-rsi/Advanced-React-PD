import Head from 'next/head';
import PropTypes from 'prop-types';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

// query to fetch total count of all Products from the server
export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ page }) => {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);

  // conditional renders for loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  // destructure count from data object
  const { count } = data?._allProductsMeta;

  // create page count based on total count of products and perPage value
  // Math.ceil rounds up to the nearest whole number
  // e.g. 9 products / 4 per page = 2.25 pages, rounded up to 3 pages
  // allows for whole numbers to be displayed regardless of total count
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits! Page {page} of ___</title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}> ← Prev </a>
      </Link>
      <p>
        Page {page} of {pageCount}{' '}
      </p>
      <p>{count} items total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}> Next → </a>
      </Link>
    </PaginationStyles>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
};

export default Pagination;
