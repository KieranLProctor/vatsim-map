export const searchData = (event: any, dataToSearch: any) => {
  const search = event.target.value.toLowerCase();

  if (search.length === 0) return dataToSearch;

  if (dataToSearch.length === 0) return dataToSearch; // To keep same data type.

  const results = dataToSearch.filter((object: any) => {
    return JSON.stringify(object).toString().toLowerCase().includes(search);
  });

  return results;
};
