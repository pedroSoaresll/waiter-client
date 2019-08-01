import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WAITER_TOKEN } from '../common/client';

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_WAITER_API_URL,
  headers: {
    authorization: `bearer ${window.localStorage.getItem(WAITER_TOKEN)}`,
  },
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default apolloClient;
