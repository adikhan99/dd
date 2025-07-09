import CustomSelect from "@components/common-components/CustomSelect";
import { useClassGroupsQuery } from "@data/broadcast-message/get-class-groups";

interface ClassGroupDropdownProps {
    params: any;
    handleChange: any;
}

const ClassGroupDropdown = ({ params, handleChange }: ClassGroupDropdownProps) => {
    const collegeId = params.row.college?.value;
    const selectedYearLevels = params.row.yearLevel;

    const isAllYearLevels =
        selectedYearLevels?.includes('All') || (selectedYearLevels?.length || 0) > 1;

    // Enforce 'All' if multiple yearLevels or 'All' selected
    if (isAllYearLevels && params.row.classGroup !== 'All') {
        setTimeout(() => {
            handleChange(params.id as number, 'classGroup', 'All');
        }, 0);
    }

    const yearGroup = !isAllYearLevels
        ? selectedYearLevels?.[0]
        : null;

    const { data: classGroupData } = useClassGroupsQuery({
        yearGroup: (yearGroup === 'KG' ? '-1' : yearGroup === 'PP' ? '0' : yearGroup?.replace('Year ', '')) || '',
        collegeId: collegeId || ''
    });

    // Safe check to avoid map on undefined/non-array

    // To be fixed
    const fetchedClassGroups = Array.isArray(classGroupData?.data)
        // @ts-ignore
        ? classGroupData?.data?.map((item: any) => ({
            value: item.pc_tutor_group,
            label: item.pc_tutor_group
        }))
        : [];

    const options = [
        { value: 'All', label: 'All' },
        // TO BE FIX
        //@ts-ignore 
        ...fetchedClassGroups?.filter((val) => val.label)
    ];

    const selectedValues = Array.isArray(params.value)
        ? params.value
        : typeof params.value === 'string'
            ? [params.value]
            : [];

    const selectValue = selectedValues
        .filter((val: any) => val !== null && val !== undefined)
        .map((val: any) => ({ label: val, value: val }));

    const isMultiSelectAllowed = !isAllYearLevels;

    const handleClassGroupChange = (selectedOptions: any) => {
        let selected = Array.isArray(selectedOptions)
            ? selectedOptions.map((opt) => opt.value)
            : selectedOptions?.value
                ? [selectedOptions.value]
                : [];

        // If "All" is selected, force it to be the only one
        if (selected.includes('All')) {
            handleChange(params.id as number, 'classGroup', ['All']);
            return;
        }

        // If already selected contains "All", remove it
        selected = selected.filter((val: string) => val !== 'All');

        handleChange(
            params.id as number,
            'classGroup',
            selected.length > 0 ? selected : null
        );
    };

    return (
        <div onMouseDown={(e) => e.stopPropagation()} style={{ width: '100%' }}>
            <CustomSelect
                list={options}
                value={selectValue}
                onChange={handleClassGroupChange}
                isMulti={isMultiSelectAllowed}
                placeholder="Select Class Group"
                errorMsg=""
                menuPortalTarget={document.body}
                disable={
                    !collegeId ||
                    !selectedYearLevels?.length ||
                    selectedYearLevels?.length > 1 ||
                    selectedYearLevels[0] === 'All'
                }
            />
        </div>
    );
};

export default ClassGroupDropdown;
