import msgErrorList from "@/constants/msgError";
import { notification } from "antd";

export const isMobile = (window: any) =>
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
    window.navigator.userAgent,
  );

export const isValidUrl = (str: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
};

export const subText = (str: string, numb: number) => {
  if (str.length > numb) {
    return `${str.slice(0, numb)}...`;
  } else {
    return str;
  }
};

export const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1;
};

// convert svg
export const parseSVG = (svgString: string) => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
  const serializer = new XMLSerializer();
  const svgStringified = serializer.serializeToString(svgDoc.documentElement);
  return svgStringified;
};

export function getMessage(key: any) {
  return msgErrorList[key] || key;
}

// nofi
export const openNotification = ({
  type,
  message,
}: {
  type: "error" | "warning" | "success" | "info";
  message: string;
}) => {
  if (message === "NO_ACCESS") {
    return;
  } else {
    switch (type) {
      case "error":
        notification.error({
          message: "Thông báo",
          description: getMessage(message),
        });
        break;

      case "warning":
        notification.warning({
          message: "Thông báo",
          description: message,
        });
        break;

      case "success":
        notification.success({
          message: "Thông báo",
          description: message,
        });
        break;

      default:
        notification.info({
          message: "Thông báo",
          description: message,
        });
        break;
    }
  }
};
