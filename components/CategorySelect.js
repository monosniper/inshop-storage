import React from 'react';
import {Box, Select, Text} from "@chakra-ui/react";

const CategorySelect = ({ category=null, handleCategoryChange, categories, category_id=null }) => {
    return (
        <Box>
            <Text mb='8px'>Категория</Text>
            <Select
                value={category}
                onChange={handleCategoryChange}
                size='sm'
            >
                {categories.map((category, i) => {
                    if(category.id === category_id) return <option selected value={category.id}>{category.title}</option>
                    else return <option selected value={category.id}>{category.title}</option>
                })}
            </Select>
        </Box>
    );
};

export default CategorySelect;