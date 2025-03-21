import cookies from 'js-cookie';

export const setCookies = (accessToken: string) => {
  cookies.set('accessToken', accessToken);
};
