const NEW_TRANSACTION = 'transactions/NEW_TRANSACTION';

const newTransaction = (transaction) => ({
    type: NEW_TRANSACTION,
    transaction
});


export const getUserTransactions = (userid, ticker) => async(dispatch) => {
    const response = await fetch (`/api/transactions/${userid}/${ticker}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(newTransaction(data));

    } else {
        return ["errors: something went wrong"]
    }
}


export const makeTransaction = (userid, stockid, shares, method, share_value) => async(dispatch) => {
    const transaction = await fetch (`/api/transactions/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userid,
            stockid,
            shares,
            method,
            share_value
        })
    });

    if (transaction.ok) {
        const data = await transaction.json();
        dispatch(newTransaction(data));
        return null;
    } else if (transaction.status < 500) {
        const data = await transaction.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }

}

const initialState = {};


export default function reducer(state = initialState, action) {

    switch (action.type) {
        case NEW_TRANSACTION:
            const newState = {}
            newState[action.transaction.stock_ticker] = action.transaction;
            return newState;
        default:
            return state;

    }
}
