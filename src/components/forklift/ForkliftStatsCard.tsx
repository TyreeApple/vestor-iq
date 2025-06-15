
import React from "react";
import StandardCard from "@/components/common/StandardCard";

interface ForkliftStatsCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  info: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  onClick?: () => void;
}

const ForkliftStatsCard: React.FC<ForkliftStatsCardProps> = ({
  title,
  value,
  icon,
  variant = 'info',
  onClick,
}) => {
  return (
    <StandardCard
      title={title}
      value={value}
      icon={icon}
      variant={variant}
      onClick={onClick}
    />
  );
};

export default ForkliftStatsCard;
