import React, {useState} from 'react';
import {Box, Select, Text} from "@chakra-ui/react";
import {v4 as uuidv4} from "uuid";

const CategorySelect = ({ category=null, handleCategoryChange, categories, category_id=null }) => {
    const [uuid, setUuid] = useState(uuidv4());

    return (
        <Box>
            <Text mb='8px'>Категория</Text>
            <Select
                value={category_id}
                onChange={handleCategoryChange}
                size='sm'
            >
                {categories.map((category, i) => (
                    <option key={'cat-'+uuid+'-'+i} value={category.id}>{category.title}</option>
                ))}
            </Select>
        </Box>
    );
};

export default CategorySelect;