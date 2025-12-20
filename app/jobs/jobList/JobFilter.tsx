"use client"
import CategorySelect from '@components/header/category/CategorySelect';
import CitySelect from '@components/header/city/CitySelectInput';
import { Button } from '@components/ui/Button';
import { Category, City } from '@typess/index';
import JobTimeTypeSelect from './JobTimeTypeSelect';
import DeleteFilter from './DeleteFilter';
import { Loader } from 'lucide-react';
import { useJobFilters } from '@hooks/useJobFilter';

const JobFilter = ({
    cities,
    categories,
}: {
    cities: City[];
    categories: Category[];
}) => {
    const { city,
        setCity,
        category,
        setCategory,
        jobType,
        setJobType,
        isPending,
        updateUrl,
        removeFilter,
    } = useJobFilters();
    const persianCategory = categories.find((cat) => cat.slug === (category));

    return (
        <section>
            <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
                <CitySelect cities={cities} value={city} onChange={setCity} />

                <CategorySelect categories={categories} value={category} onChange={setCategory} />
                <JobTimeTypeSelect value={jobType} onChange={setJobType} />
                <Button
                    variant="primary"
                    onClick={updateUrl}
                    className="w-auto md:w-1/4 mx-auto"
                    disabled={!(city || category || jobType)}
                >
                    {isPending ? <Loader size={25} /> : "جستجو"}
                </Button>
            </div>
            <div className="flex flex-1 flex-wrap gap-2 mt-4">
                {city && (
                    <DeleteFilter
                        label={city}
                        onRemove={() => removeFilter("city")}
                    />
                )}
                {category && (
                    <DeleteFilter
                        label={persianCategory?.name}
                        onRemove={() => removeFilter("category")}
                    />
                )}
                {jobType && (
                    <DeleteFilter
                        label={(jobType as string) == "full_time" ? "تمام وقت" : (jobType as string) == "part_time" ? "پاره وقت" : "دورکاری"}
                        onRemove={() => removeFilter("jobType")}
                    />
                )}
            </div>
        </section>
    );
}

export default JobFilter