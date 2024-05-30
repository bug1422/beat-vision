import { useToggle } from "@/hooks"
import { ReactNode } from "react"
import { Button } from "react-bootstrap"
import { Offcanvas as BootstrapOffcanvas, } from "react-bootstrap"
interface PlacementOption {
	name: string,
    isOpen: boolean,
    toggle: void,
    children: JSX.Element,
	placement?: 'start' | 'end' | 'top' | 'bottom'
}

export default function OffcanvasPlacement({ name, isOpen, toggle, children, ...props }: PlacementOption) {
    return (
        <>
            <BootstrapOffcanvas show={isOpen} onHide={toggle} {...props}>
                <BootstrapOffcanvas.Header closeButton>
                    <BootstrapOffcanvas.Title>{name}</BootstrapOffcanvas.Title>
                </BootstrapOffcanvas.Header>

                <BootstrapOffcanvas.Body className="offcanvas-body">
                    {children}
                </BootstrapOffcanvas.Body>
            </BootstrapOffcanvas>
        </>
    )
}