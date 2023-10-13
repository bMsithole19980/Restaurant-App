export const login= (useData)=>({
    type: 'LOGIN',
    paload: useData,
});

export const logout=()=>({
    type: 'LOGOUT',
});