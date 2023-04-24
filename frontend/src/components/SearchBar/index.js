import './SearchBar.css'

const SearchBar = () => {
    return (
        <form id='searchbar'>
            <input placeholder='search bar'/>
            <input placeholder='location dummy' />
            <input className='red-button' type='submit' />
        </form>
    )
}

export default SearchBar