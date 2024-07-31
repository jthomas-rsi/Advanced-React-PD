import { useRouter } from 'next/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

const ProductsPage = () => {
  // destructure current page from router object
  const { query } = useRouter();

  // convert page string to integer or the pagination buttons will
  // concatenate to a higher value instead of incrementing by one
  const page = parseInt(query.page);

  return (
    <div>
      <Pagination page={page || 1} />
      <Products />
      <Pagination page={page || 1} />
    </div>
  );
};

export default ProductsPage;
