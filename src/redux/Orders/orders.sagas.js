// where we set or fetch data from firestore

import ordersTypes from "./orders.types";
import { takeLatest, put, call, all } from "redux-saga/effects";
import { handleSaveOrder } from "./orders.helpers";
import { auth } from "./../../firebase/utils";
import { clearCart } from "./../Cart/cart.actions";

export function* saveOrder({ payload }) {
  try {
    const timestamps = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps,
    });

    yield put(clearCart());
  } catch (err) {
    //console.log(err)
  }
}
export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
}

export default function* ordersSagas() {
  yield all([call(onSaveOrderHistoryStart)]);
}
