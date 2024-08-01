import { PAGINATION_QUERY } from '../components/Pagination';

const paginationField = () => ({
  keyArgs: false, // tells Apollo we will take care of everything
  read(existing = [], { args, cache }) {
    // destructure the first and skip values from the args
    const { first, skip } = args;

    // read the number of items on the page from the cache
    const data = cache.readQuery({ query: PAGINATION_QUERY });
    const count = data?._allProductsMeta?.count;
    const page = skip / first + 1;
    const pages = Math.ceil(count / first);

    // check if we have existing items in the cache
    const items = existing.slice(skip, skip + first).filter((x) => x);

    // if there are items AND there aren't enough items to satisfy how many were requested
    // AND we are on the last page
    if (items.length && items.length !== first && page === pages) {
      return items;
    }

    // check if there are NOT items and we need to go to the network
    if (items.length !== first) {
      return false;
    }

    // if items are present return them from the cache and avoid another network call
    if (items.length) {
      // console.log(
      //   `There are ${items.length} items in the cache! Gonna send them to Apollo`
      // );
      return items;
    }

    // fallback to network request
    return false;
  },
  merge(existing, incoming, { args }) {
    const { first, skip } = args;

    // This run when the Apollo client comes back from the network with our products
    // we can then merge the two together

    const merged = existing ? existing.slice(0) : [];

    // eslint-disable-next-line no-plusplus
    for (let i = skip; i < skip + incoming.length; ++i) {
      merged[i] = incoming[i - skip];
    }

    return merged;
  },
});
export default paginationField;
