import React from "react";
import Swal from "sweetalert2";

const showMassage = (mes, info) => {
  switch (info) {
    case "error":
      Swal.fire(mes, "دوباره تلاش کنید", info);
    case "success":
      Swal.fire(mes, "به سبد خرید مراجعه کنید", info);
    case "profile_update":
      Swal.fire(mes, "از درستی اطلاعات مطمئن شوید", "success");
    case "login_error":
      Swal.fire(mes, "", "error");
    case "login_success":
      Swal.fire(mes, "", "success");
  }
};
function Alert(probs) {
  return <div>{showMassage(probs.message, probs.info)}</div>;
}

export default Alert;
