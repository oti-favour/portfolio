import Image from "next/image";
import type { TechItem as TechItemType } from "@/lib/types";

export function TechItem({ name, icon }: TechItemType) {
  return (
    <div className="flex items-center gap-4 py-3">
      <Image src={icon} alt={name} width={40} height={40} className="h-10 w-10" />
      <span className="text-lg font-medium text-light">{name}</span>
    </div>
  );
}
