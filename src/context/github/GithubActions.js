import axios from 'axios';

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`users/${login}/repos?per_page=15`),
  ]);

  return {
    user: user.data,
    repos: repos.data,
  };
};

// export const getUser = async (login) => {
//   const response = await fetch(`${GITHUB_URL}/users/${login}`, {
//     headers: {
//       Accept: 'application/vnd.github+json',
//       Authorization: `Bearer ${GITHUB_TOKEN}`,
//     },
//   });

//   if (response.status === 404) {
//     window.location = '/notfound';
//   } else {
//     const data = await response.json();
//     if (response.ok) {
//       return data;
//     }
//   }
// };

// export const getRepos = async (login) => {
//   const response = await fetch(
//     `${GITHUB_URL}/users/${login}/repos?per_page=10`,
//     {
//       headers: {
//         Accept: 'application/vnd.github+json',
//         Authorization: `Bearer ${GITHUB_TOKEN}`,
//       },
//     }
//   );
//   if (response.status === 404) {
//     window.location = '/notfound';
//   } else {
//     const data = await response.json();
//     if (response.ok) {
//       return data;
//     }
//   }
// };
