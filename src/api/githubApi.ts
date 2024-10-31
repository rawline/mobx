const BASE_URL = 'https://api.github.com/search/repositories';

export const fetchRepositories = async (page: number) => {
  let response = await fetch(`${BASE_URL}?q=javascript&sort=stars&order=asc&page=${page}&per_page=10`);
  let json = await response.json();
  return json.items;
};
