import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.VITE_USER_POOL_ID ?? 'us-east-2_8LFzNMfTW',
      userPoolClientId: process.env.VITE_USER_POOL_CLIENT_ID ?? '1s54mq7jhfes4qrskld6324loe',
      loginWith: {
        email: true,
      },
    },
  },
});

export default Amplify;
