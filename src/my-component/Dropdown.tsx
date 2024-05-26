import {
  DropdownToggle,
  Dropdown as BsDropdown,
  DropdownMenu,
  DropdownItem,
} from "react-bootstrap";

export type DropdownMenuItemType<T> = {
  text: string;
  onClickEvent?: (item: T) => void;
  item?: T;
  itemHref?: string;
};
const Dropdown = <T extends object>({
  label,
  menuItems,
}: {
  label?: string;
  menuItems: DropdownMenuItemType<T>[];
}) => {
  return (
    <BsDropdown>
      <DropdownToggle
        as="a"
        className="btn btn-sm btn-outline-light "
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        style={{ color: "black" }}
      >
        {label ? (
          <>
            {label}
            <i className="las la-angle-down ms-1" />
          </>
        ) : (
          <i className="mdi mdi-dots-horizontal text-muted" />
        )}
      </DropdownToggle>
      <DropdownMenu align="end">
        {menuItems.map((item, idx) => (
          <DropdownItem
            key={idx}
            href={item.itemHref ? "#" : item.itemHref}
            onClick={
              typeof item.onClickEvent == "undefined"
                ? () => {}
                : () => {
                    const handleClick = (arg: T) => {
                      if (item.onClickEvent) {
                        item.onClickEvent(arg);
                      }
                    };
                    handleClick(item.item as T);
                  }
            }
          >
            {item.text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </BsDropdown>
  );
};

export default Dropdown;
