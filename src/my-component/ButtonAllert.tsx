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
  onClickEvent: (item: T) => void;
  item: T;
  text: string;
};

const ButtonAlert2 = <T extends object>({ onClickEvent, item, text }: ButtonAlertProps<T>) => {
  const handleClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        onClickEvent(item);
      }
    });
  };

  return (
    <Button variant="outline-danger" className="mb-2" size="sm" onClick={handleClick}>
      {text}
    </Button>
  );
};
export const ButtonAllert2 = ButtonAlert2;
