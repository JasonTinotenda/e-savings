export const getAuthConfig = () => {
    const token = localStorage.getItem('access');
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `JWT ${token}` : '',
            'Accept': 'application/json'
        }
    };
};
