import { Modal as HUModal } from "@heroui/react";

type Props = {
    isOpen: boolean; // <--- DIUBAH dari open ke isOpen
    onOpenChange: (o: boolean) => void;
    title?: string;
    children: React.ReactNode;
};

export default function Modal({ isOpen, onOpenChange, title, children }: Props) {
    return (
        <HUModal isOpen={isOpen} onOpenChange={onOpenChange} title={title}>
            {children}
        </HUModal>
    );
}
