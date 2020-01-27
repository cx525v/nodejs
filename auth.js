import DCRIPT from DCrypt;
export const createTokens = async(user, secret, secret2) => {
 const createToken = jwt.sign(
  {
    user: _.pick(user, ['id', 'isAdmin']),
  },
  secret，
  {
     expiresIn: '1m'
  }
 );
 
 const createRefreshToken = jwt.sign({
   {
     user: _.pick(user, 'id'),
   } ,
   secret2,
   {
     expiresIn: '7d'
   }
 });
 
 return Promise.All([createToken, createRefreshToken]);
}
