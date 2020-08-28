import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://rn-shop-app-a1e1e.firebaseio.com/orders/u1.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cardItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cardItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      'https://rn-shop-app-a1e1e.firebaseio.com/orders/u1.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardItems,
          totalAmount,
          date: new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cardItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
