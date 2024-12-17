import axios from "axios";
import { usersRequest, usersSuccess, usersFail } from "../slices/usersSlice";

export const getAllusers = (token) => {
  return async (dispatch) => {
    try {
      dispatch(usersRequest());
      const { data } = await axios.get(`/api/v1/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(usersSuccess(data));
    } catch (error) {
      dispatch(usersFail(error.response.data.message));
    }
  };
};