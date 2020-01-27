import _ from 'lodash';
import bcrrypt from 'bcrypt';
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
};

export const refreshTokens = async (token, refreshToken, models, SECRET, SECRET_2)=>{
 let userId = -1;
 try {
  const {user: {id} } =jwt.decode(refreshToken);
  userId = id;
 } catch (err) {
   return {};
 }
 
 if(!userId} {
    return {};
    }
  const user = await models.user.findOne（{ where: {id: userId}, raw: true}）；
    if(!user) {
 return {};
 }
 
 const refreshScret = SECRET_2 + user.password;
 
 try {
   jwt.verify(refreshToken, refreshSecret);
 } catch(err) {
   return {};
 }
 
 const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshSecret);
 return {
   token: newToken,
   refreshToken: newRefreshToken,
   user
 }
};
