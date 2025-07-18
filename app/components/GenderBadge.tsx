import { Gender } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const genderMap: Record<Gender, { label: string; color: "pink" | "blue" }> = {
  male: { label: "Male", color: "blue" },
  female: { label: "Female", color: "pink" },
};

const GenderBadge = ({ gender }: { gender: Gender }) => {
  return (
    <Badge color={genderMap[gender].color}>{genderMap[gender].label}</Badge>
  );
};

export default GenderBadge;
