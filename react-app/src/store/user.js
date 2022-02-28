
export const getBalance = (userid) => async() =>  {
    const response = await fetch(`/api/users/${userid}`);
    if (response.ok) {
        const user = await response.json();
        return user.balance
    }
}

export const getUserReceipts = (userid) => async() => {
    const response = await fetch(`/api/users/${userid}/transactions`);

    if (response.ok) {
        const data = await response.json();
        return data.transactions
    }
}


export const getUserPortfolioValue = (userid) => async() => {
    const response = await fetch(`/api/users/${userid}/portfolio`);

    if (response.ok) {
        const data = await response.json()
        return data.stocks
    }
}
