"use client";

import { useState } from "react";
import Dropdown from "@components/ui/Dropdown";
import { Input } from "@components/ui/Input";
import { City } from "@typess/index";
import { useSearchParams } from "next/navigation";

export default function CitySelect({
  cities,
  value,
  onChange,
}: {
  cities: City[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();

  const filtered = cities.filter((c) =>
    c.name.includes(search)
  );

  return (
    <Dropdown value={value} onChange={onChange}>
      <Dropdown.Trigger placeholder={searchParams.get("city") || "انتخاب شهر..."} />

      <Dropdown.Content>
        <div className="p-2">
          <Input
            placeholder="جستجوی شهر..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Dropdown.List>
          {filtered.map((c, index) => (
            <Dropdown.Item key={index} value={c.name}>
              {c.name}
            </Dropdown.Item>
          ))}
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
}
