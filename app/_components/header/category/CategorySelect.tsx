"use client";

import Dropdown from "@components/ui/Dropdown";
import { Category } from "@typess/index";
import { useSearchParams } from "next/navigation";

export default function CategorySelect({
  categories,
  value,
  onChange,
}: {
  categories: Category[];
  value: string;
  onChange: (v: string) => void;
}) {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") ?? "";

  const currentSlug = value || categorySlug;

  const selectedCategory = categories.find((cat) => cat.slug === currentSlug);

  return (
    <Dropdown value={value} onChange={onChange}>
      <Dropdown.Trigger>
        {selectedCategory ? selectedCategory.name : "انتخاب دسته بندی..."}
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.List>
          {categories.map((cat) => (
            <Dropdown.Item key={cat.id} value={cat.slug ?? ""}>
              {cat.name}
            </Dropdown.Item>
          ))}
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
}