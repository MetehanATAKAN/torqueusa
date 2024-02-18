import React from 'react';
import { Select } from 'antd';

const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



const Selects = ({
    options,
    onChange,
    onSearch,
    onClear,
    selectedItems,
    selectId
}) => {

    const onClearSelect = () => {
        if (onClear) onClear(selectedItems,selectId);
    };

    return (
       <>
        <Select
            value={selectedItems}
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={(value, label) => onChange && onChange(value, label, options, selectId)}
            onSearch={onSearch}
            filterOption={filterOption}
            options={options}
            allowClear
            onClear={() => onClearSelect()}
        />
       </>
    )
};
export default Selects;