export default function SearchBar(props) {
    return (
      <input type="text" placeholder="Search for a receip..." onChange={props.onChange} className="search"/>
    )
  }