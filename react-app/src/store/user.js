
export const getBalance = (userid) => async() =>  {
    const response = await fetch(`/api/users/${userid}`);
    if (response.ok) {
        const user = await response.json();
        return user.balance
    }
}

export const getUserStocks = (userid) => async() => {
    const response = await fetch(`/api/users/${userid}/stocks`);

    if (response.ok) {
        const data = await response.json();
        return data.stocks
    }
}


export const getUserPortfolioValue = (userid) => async() => {
    const response = await fetch(`/api/users/${userid}/portfolio`);

    if (response.ok) {
        const data = await response.json()
        return data.stocks
    }
}
