import { ChangeEvent, SyntheticEvent } from "react";

interface Props {
  usedForComponent: string | undefined;
  search: string | undefined;
  onSearchSubmit: (e: SyntheticEvent) => void;
  changeSearchHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({
  usedForComponent,
  search,
  onSearchSubmit,
  changeSearchHandler,
}: Props) => {
  return (
    <>
      <section className="sideMargin relative bg-lightGray">
        <div className="max-w-4xl mx-auto space-y-6">
          <form
            className="form relative flex flex-col w-full p-1 space-y-4 bg-lightGreen rounded-lg md:flex-row md:space-y-0 md:space-x-3"
            onSubmit={onSearchSubmit}
          >
            <input
              className="flex-1 p-3  rounded-lg placeholder-black focus:outline-none"
              placeholder={"Search " + usedForComponent}
              value={search}
              onChange={changeSearchHandler}
            ></input>
          </form>
        </div>
      </section>
    </>
  );
};

export default Search;
