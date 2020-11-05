/*eslint no-debugger: "off"*/

export default {
    methods: {
        sortingObjectByMultipleField(items, sortingFields) {
            const array = items.map(a => a);
            const rightFieldsArray = Object.keys(sortingFields).map(a => { return { name: a, descending: sortingFields[a].descending } });
            if (!rightFieldsArray.length) return items;

            function innerSort(left, right, rightFields) {
                const sotingItem = rightFields[0];
                const sortingField = sotingItem.name;
                const sortingDescending = sotingItem.descending;

                const leftValue = left[sortingField] || ``;
                const rightValue = right[sortingField] || ``; 
                if (leftValue === rightValue) {
                    return rightFields && rightFields.length > 1 ? innerSort(left, right, rightFields.slice(1)) : 0;
                }

                return (sortingDescending ? leftValue < rightValue : leftValue > rightValue ) ? 1 : -1;
            }

            array.sort((left, right) => {
                return innerSort(left, right, rightFieldsArray);
            });
            
            return array;
        }
    }
}