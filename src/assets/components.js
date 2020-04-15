export const field_rows = [
    {
        title: "Coordinates",
        fields: [
            {
                id: "lat",
                type: "number",
                placeholder: "latitude",
                validate: (val) => {
                    if (!val.match(/\d+.\d+/)) return false;
                    return val >= 53.53 && val <= 56.27;
                },
            },
            {
                id: "lng",
                type:"number",
                placeholder: "longitude",
                validate: (val) => {
                    if (!val.match(/\d+.\d+/)) return false;
                    return val >= 20.56 && val <= 26.5;
                },
            },
        ],
    },
    {
        title: "Location",
       
        fields: [
            { 
                type: "text",
                id: "city",
                placeholder: "city",
                validate: () => {
                    return true;
                },
            },
        ],
    },
];

export const selectors = [
    {
        title: "Category",
        values: ["nature", "museums", "heritage"],
    },
];

export const hours = [
    {
        title: "Weekdays",
        id: "wkd",
    },
    {
        title: "Saturdays",
        id: "std",
    },
    {
        title: "Sundays",
        id: "snd",
    },
];
