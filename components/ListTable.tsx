import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Button from './Button';
import { IListItem, IFilter, IFilterOption } from '../common/interfaces';
import { FormControlLabel } from '@material-ui/core';

interface IProps {
    data: Array<IListItem>,
    filters: Array<IFilter>,
    onSubmitSearch?: Function,
};

interface IState {
    search: string,
    activeDropdown: string,
    appliedFilters: Array<IFilterOption>,
};

export default class ListTable extends React.Component<IProps, IState> {  
    state = {
        search: "",
        activeDropdown: "",
        appliedFilters: [],
    };

    submitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const { onSubmitSearch } = this.props;
        const { search } = this.state;
        if (!!onSubmitSearch) {
            onSubmitSearch(search);
        }
    };

    toggleFilterOption = (filter: IFilter, option: IFilterOption) => {
        let appliedFilters: Array<IFilterOption> = this.state.appliedFilters;
        option = {
            ...option,
            type: filter.name,
        }
        if (appliedFilters.find(a => JSON.stringify(a) === JSON.stringify(option))) {
            appliedFilters = appliedFilters.filter(a => JSON.stringify(a) !== JSON.stringify(option));
        } else { 
            appliedFilters.push(option);
        }
        console.log("Applied Filters : ", appliedFilters)
        return this.setState({ appliedFilters });
    };

    render() {
        const { filters, data } = this.props;
        const { activeDropdown, appliedFilters } = this.state;
        return (
            <div className="component list">
                <div className="table__wrapper">
                    <div className="table__header">
                        <div className="table__filters">
                            {filters.map((filter, i: number) => {
                                return (
                                    <div
                                        className="table__filter"
                                        onClick={() => this.setState({ activeDropdown: activeDropdown === filter.name ? "" : filter.name })}
                                        key={i}
                                    >
                                        <span>{`${filter.label} Filter`}</span>
                                        {activeDropdown === filter.name && (
                                            <div className="filter__dropdown">
                                                {filter.options.map((option, k: number) => {
                                                    const typedOption = {...option, type: filter.name};
                                                    const isToggled = !!appliedFilters.find(a => JSON.stringify(typedOption) === JSON.stringify(a));
                                                    return (
                                                        <div
                                                            className="dropdown__item"
                                                            onClick={() => this.toggleFilterOption(filter, option)}
                                                            key={k}
                                                        >
                                                            <FormControlLabel
                                                                value={option.value}
                                                                label={option.label}
                                                                control={<Checkbox
                                                                    checked={isToggled}
                                                                />}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="table__search">
                            <form onSubmit={(e) => this.submitSearch(e)}>
                                <SearchIcon />
                                <input placeholder="Search" onChange={(e) => this.setState({ search: e.target.value })}/>
                            </form>
                        </div>
                    </div>
                    <div className="table__items">
                        {data.map((item, i: number) => {
                            return (
                                <React.Fragment key={i}>
                                    <div className="table__item">
                                        <div className="item__image">
                                            <img src={item.img} />
                                        </div>
                                        <div className="item__info">
                                            <p>{item.name}</p>
                                            <p>{item.vendor}</p>
                                            <p>It was recognized {item.date}</p>
                                        </div>
                                        <div className="item__action">
                                            <a href={item.url}>
                                                <Button onClick={() => null}>View</Button>
                                            </a>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };
};

const SearchIcon = () => (
    <svg style={{width: 24, height: 24}} viewBox="0 0 24 24">
        <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    </svg>
);