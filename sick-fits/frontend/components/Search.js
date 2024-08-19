/* eslint-disable react/jsx-props-no-spreading */
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Search = () => {
  // LazyQuery is used to run a query when you want to, not when the component mounts
  const [findItems, { data, loading, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache', // this will prevent the query from being cached and always go to network for search results
    }
  );

  console.log({ data });

  const findItemsButChill = debounce(findItems, 350);

  resetIdCounter();

  const { inputValue, getMenuProps, getInputProps, getComboboxProps } =
    useCombobox({
      items: [],
      onInputValueChange() {
        console.log('Input changed!');
        findItemsButChill({
          variables: {
            searchTerm: inputValue,
          },
        });
      },
      onSelectedItemChange() {
        console.log('Selected item changed!');
      },
    });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            id: 'search',
            placeholder: 'Search for an item',
            type: 'search',
            className: 'loading',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        <DropDownItem>Hey!</DropDownItem>
        <DropDownItem>Hey!</DropDownItem>
        <DropDownItem>Hey!</DropDownItem>
        <DropDownItem>Hey!</DropDownItem>
      </DropDown>
    </SearchStyles>
  );
};

export default Search;
