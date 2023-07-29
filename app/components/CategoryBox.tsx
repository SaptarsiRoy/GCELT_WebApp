'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const Yr = label.charAt(0);
  const now = new Date();
  const Year = String( now.getFullYear() - Number(Yr) + 1);

  const handleClick = useCallback(() => {
    // initialize a currentquery with empty object
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString()) // we create objects out of all current parameters in the url
    }

    // the category param going to combine with all other params in url
    const updatedQuery: any = {
      ...currentQuery,
      Year: Year
    }

    // if we selected a category again , then we simply want to remove it from params
    // if already selected and once i select it again , then remove category from params
    if (params?.get('Year') === Year) {
      delete updatedQuery.Year;
    }

    // generate the url alomg with updation
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    // and push the url in router
    router.push(url);
  }, [Year, router, params]);

  return ( 
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-1
        pb-3
        border-b-0
        hover:text-neutral-800
        dark:hover:text-neutral-100
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800  dark:border-b-neutral-200' : 'border-transparent'}
        ${selected ? 'text-neutral-800 dark:text-neutral-100' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
   );
}
 
export default CategoryBox;