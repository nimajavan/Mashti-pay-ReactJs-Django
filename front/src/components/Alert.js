import React from "react";
import Swal from "sweetalert2";

function Alert(probs) {
  function showMassage(mes, info) {
    if (info == "login_error") {
      Swal.fire(mes, "لطفا دوباره تلاش کن!", "error");
    }
    if (info == "login_success") {
      Swal.fire(mes, "ds", "success");
    }
    if (info == "profile_update") {
      Swal.fire(mes, "از درستی اطلاعات مطمئن شوید", "success");
    }
    if (info == "success") {
      Swal.fire(mes, "به سبد خرید مراجعه کنید", info);
    }
    if (info == "error") {
      Swal.fire(mes, "دوباره تلاش کنید", info);
    }
  }

  return <div className="mt-3">{showMassage(probs.message, probs.info)}</div>;
}

export default Alert;
