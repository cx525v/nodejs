
const createResolver(resolver) => {
  conse baseResolver = resolver;
  baseResolver.createResolver = (childResolver) => {
    const newResolver = async(parent, args, context, info) => {
      await resolver(parent, args, context, info);
      return childResolver(parent, args, context, info);
      
    };
    
    return createResolver(newResolver);
  };
  
  return baseResolver;
}


export const requireAuth = createResolver((parent, args, context)=> {
 if(!context.usesr || !context.user.id) {
    throw new Error('Not auhenticated');
 }
});

export const requireAdmin = requireAuth.createResolver((parent, args, context)=> {
 if(!context.user.isAdmin) {
    throw new Error('Requires admin access');
 }
});
