export interface IFilterOption {
    label: string,
    value: string,
    type?: string, // define the parent filter name
};

export interface IFilter {
    name: string,
    label: string,
    options: Array<IFilterOption>,
};

export interface IListItem {
    name: string,
    vendor: string,
    date: string,
    url: string,
    img: string,
};
