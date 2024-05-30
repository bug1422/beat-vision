import { Button } from "react-bootstrap";
import { withSwal } from "react-sweetalert2";
import Swal from "sweetalert2";
export const ButtonAllert = withSwal(
  <T extends object>(props: any, onClickEvent: (item: T) => void, item: T) => {
    const { swal } = props;
    console.log(onClickEvent);

    return (
      <Button
        variant="outline-danger"
        className="mb-2"
        size="sm"
        onClick={() =>
          swal
            .fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            })
            .then((result: any) => {
              if (result.isConfirmed) {
                swal.fire("Deleted!", "Your file has been deleted.", "success");
                onClickEvent(item);
              }
            })
        }
      >
        remove
      </Button>
    );
  }
);

type ButtonAlertProps<T> = {
  onClickEvent: (item: T) => Promise<boolean>;
  item: T;
  text: string;
  className?: string;
  successMessage?: string;
  failMessage?: string;
  descriptionMessage?: string;
};

const ButtonAlert2 = <T extends object>({
  onClickEvent,
  item,
  text,
  className,
  failMessage,
  successMessage,
  descriptionMessage,
}: ButtonAlertProps<T>) => {
  const handleClick = async () => {
    let result = await Swal.fire({
      title: "Are you sure?",
      text: !descriptionMessage ? "You won't be able to revert this!" : descriptionMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      let result = await onClickEvent(item);
      if (result) {
        Swal.fire("success!", !successMessage ? "success to do" : successMessage, "success");
      } else {
        Swal.fire("fail", !failMessage ? "fail to do" : failMessage, "error");
      }
    }
  };

  return (
    <Button
      variant="outline-danger"
      className={"mb-2 " + className}
      size="sm"
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};
export const ButtonAllert2 = ButtonAlert2;

/////ALERT WITH RESPONSE MESSAGE ERROR
/////ALERT WITH RESPONSE MESSAGE ERROR
/////ALERT WITH RESPONSE MESSAGE ERROR
export type ReturnDataOnClickEvent = {
  result: boolean;
  successMessage?: string;
  failureMessage?: string;
};
type ButtonAlertProps3<T> = {
  onClickEvent: (item: T) => Promise<ReturnDataOnClickEvent>;
  item: T;
  text: string;
  className?: string;
  descriptionMessage?: string;
};
const ButtonAlert3 = <T extends object>({
  onClickEvent,
  item,
  text,
  className,
  descriptionMessage,
}: ButtonAlertProps3<T>) => {
  const handleClick = async () => {
    let result = await Swal.fire({
      title: "Are you sure?",
      text: !descriptionMessage ? "You won't be able to revert this!" : descriptionMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      let eventResult = await onClickEvent(item);
      const { result, failureMessage, successMessage } = eventResult;
      if (result) {
        Swal.fire("success!", !successMessage ? "fail to do" : successMessage, "success");
      } else {
        Swal.fire("fail", !failureMessage ? "fail to do" : failureMessage, "error");
      }
    }
  };

  return (
    <Button
      variant="outline-danger"
      className={"mb-2 " + className}
      size="sm"
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};
export const ButtonAllert3 = ButtonAlert3;
export function SimpleAllertTopRight() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast: HTMLElement) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const onResult = (isSuccess: boolean, detail?: string) => {
    if (isSuccess) {
      Toast.fire({
        icon: "success",
        title: !detail ? "successfully" : detail,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: !detail ? "failed" : detail,
      });
    }
  };
  return { onResult };
}
