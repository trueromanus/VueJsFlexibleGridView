export default {
    methods: {
        filteringObjectsByMultipleField(items, filters) {
            if (!filters || !filters.length) return items;

            return items.filter(
                item => {
                    return filters.filter(filter => filter.command(item, filter.fields, filter.value)).length;
                }
            );
        }
    }
}