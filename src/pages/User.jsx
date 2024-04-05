import { useContext, useEffect } from 'react';
import GithubContext from '../context/github/GithubContext';
import { useParams } from 'react-router-dom';
import Spinner from '../components/layout/Spinner';

function User() {
  const { user, getUser, isLoading } = useContext(GithubContext);

  const { login } = useParams();

  useEffect(() => {
    getUser(login);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return <div>User: {user.name}</div>;
}

export default User;
