const getAuthTokenFromCookies = () => {
  const jwtCookie = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("jwt="));

  return jwtCookie ? jwtCookie.split("=")[1] : null;
};

const createAxiosConfigWithToken = () => {
  const token = getAuthTokenFromCookies();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default createAxiosConfigWithToken;
