
export const getBalance = (userid) => async() =>  {
    const response = await fetch(`/api/users/${userid}`);
    if (response.ok) {
        const user = await response.json();
        return user.balance
    }
}
