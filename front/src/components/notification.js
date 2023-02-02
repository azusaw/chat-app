import { ElNotification } from "element-plus";

export const openSuccess = (msg) => {
  ElNotification({
    title: "Success",
    message: msg,
    type: "success",
  });
};

export const openInfo = (msg) => {
  ElNotification({
    title: "Info",
    message: msg,
    type: "info",
  });
};

export const openError = (msg) => {
  ElNotification({
    title: "Error",
    message: msg,
    type: "error",
  });
};
