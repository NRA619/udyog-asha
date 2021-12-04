export const getOrder = () => {
    return fetch("http://localhost:5000/payment/createorder", {
      method: "GET",
    })
      .then((response) => console.log(response.json()))
      .catch((err) => console.log(err));
  };
  
  export const grabStatus = (paymentId) => {
    return fetch(`http://localhost:5000/payment/payments/${paymentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };