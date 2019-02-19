import React from 'react'

interface IProps {
  handleSearchTyping(event: React.FormEvent<HTMLInputElement>): void;
}

export const SearchInput = (props: IProps) =>
  <input type="text" placeholder="Search here" onChange={props.handleSearchTyping} />;
