import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    users: [],
    user: {},
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);
  // const [isLoading, setIsLoading] = useState(true);
  // const [users, setUsers] = useState([]);

  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();
    console.log(items);
    if (response.ok) {
      dispatch({
        type: 'GET_USERS',
        payload: items,
      });
    }
  };

  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        dispatch({
          type: 'GET_USER',
          payload: data,
        });
      }
    }
  };

  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
    });
  };

  //Test purposes
  // const fetchUsers = async () => {
  //   setLoading();
  //   const response = await fetch(`${GITHUB_URL}/users`, {
  //     headers: {
  //       Accept: 'application/vnd.github+json',
  //       Authorization: `Bearer ${GITHUB_TOKEN}`,
  //     },
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   if (response.ok) {
  //     dispatch({
  //       type: 'GET_USERS',
  //       payload: data,
  //     });
  //   }
  // };

  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

GithubProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GithubContext;
