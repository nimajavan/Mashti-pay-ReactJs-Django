import React from "react";
import Swal from "sweetalert2";

const showMassage = (mes, info) => {
  if (info == "error") {
    Swal.fire(mes, "دوباره تلاش کنید", info);
  } else {
    Swal.fire(mes, "به سبد خرید مراجعه کنید", info);
  }
};
function Alert(probs) {
  return <div>{showMassage(probs.message, probs.info)}</div>;
}

export default Alert;
