export const getAdmin = () => {
  const data = localStorage.getItem('admin');
  return data ? JSON.parse(data) : null;
};

export const logout = () => {
  localStorage.removeItem('admin');
};
