
export const environment = {
  production: true,
  apiUrl: 'https://blalgamoney.herokuapp.com',
  tokenWhitelistedDomains: [ new RegExp(/blalgamoney.herokuapp.com/) ],
  tokenBlacklistedRoutes: [ new RegExp(/\/oauth\/token/) ]
};
