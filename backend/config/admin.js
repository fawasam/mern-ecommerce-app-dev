module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '5a9daf10f1a498defe291991bc3c4c38'),
  },
});
