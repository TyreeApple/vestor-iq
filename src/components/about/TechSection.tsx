
import React from "react";
import TechIconCard from "./TechIconCard";

interface TechItem {
  name: string;
  icon: any;
  url: string;
  bg?: string;
  gradient?: boolean;
  extra?: React.ReactNode;
}

interface TechSectionProps {
  title: string;
  items: TechItem[];
}

const TechSection: React.FC<TechSectionProps> = ({ title, items }) => {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-extrabold mb-8 flex items-center gap-3 gradient-text drop-shadow-sm">
        {title}
      </h3>
      <div
        className="
          w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3
          xl:grid-cols-4 2xl:grid-cols-5 gap-7 sm:gap-9
          place-items-center sm:place-items-stretch
        "
      >
        {items.map((item) => (
          <TechIconCard
            key={item.name}
            icon={item.icon}
            name={item.name}
            url={item.url}
            bg={item.bg}
            gradient={item.gradient}
            extra={item.extra}
          />
        ))}
      </div>
    </div>
  );
};

export default TechSection;
