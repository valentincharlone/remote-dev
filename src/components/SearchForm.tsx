type SearchFormProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

export default function SearchForm({
  searchText,
  setSearchText,
}: SearchFormProps) {
  return (
    <form className="search">
      <button>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
