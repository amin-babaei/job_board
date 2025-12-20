'use client';
import Dropdown from "@components/ui/Dropdown";
import { JobType } from "@typess/index";

const JOB_TYPES: { label: string; value: JobType }[] = [
  { label: "تمام وقت", value: "full_time" },
  { label: "پاره وقت", value: "part_time" },
  { label: "دورکاری", value: "remote" },
];

 const JobTimeTypeSelect = ({
  value,
  onChange,
}: {
  value: JobType | "";
  onChange: (v: JobType) => void;
}) => {
  const selectedType = JOB_TYPES.find((t) => t.value === value);
  const displayLabel = selectedType ? selectedType.label : "نوع قرارداد";
  return (
   <Dropdown value={value} onChange={(v) => onChange(v as JobType)}>
      <Dropdown.Trigger>
        {displayLabel}
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.List>
          {JOB_TYPES.map((t) => (
            <Dropdown.Item key={t.value} value={t.value}>
              {t.label}
            </Dropdown.Item>
          ))}
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
}
export default JobTimeTypeSelect;