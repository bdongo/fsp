import './SearchBar.css'

const SearchBar = () => {
    return (
        <div id='searchbar'>
            <form>
                <input placeholder='search bar' />
                <div id='divider'/>
                <input placeholder='location dummy' />
            </form>
            <button >Q</button>
        </div>
    )
}

export default SearchBar