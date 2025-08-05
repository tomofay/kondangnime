import { Card as HUCard, CardBody } from "@heroui/react";

type Props = {
  children: React.ReactNode;
}

export default function Card({ children }: Props) {
  return (
    <HUCard className="bg-dark-surface border-none hover:ring-2 ring-anime-primary transition">
      <CardBody>{children}</CardBody>
    </HUCard>
  );
}
