const authHeader = () => {
    // возвращаем хедер авторизации с токеном jwt
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
};

export default authHeader;