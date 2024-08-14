import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { CategoryGet } from "../../Models/Category";
import {
  deleteCategory,
  getCategories,
  postCategory,
  putCategory,
  searchCategories,
} from "../../Services/CategoryService";
import Search from "../../Components/Search/Search";
import Categories from "../../Components/Category/Categories";
import AddForm from "../../Components/PopupBoxes/AddPopup";
import AddCategory from "../../Components/Category/AddCategory";

type Props = {};

const SearchPage = (props: Props) => {
  const [categoriesResult, setCategoriesResult] = useState<CategoryGet[]>([]);
  const [search, setSearch] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        if (typeof result === "string") {
          setServerError(result);
        } else if (Array.isArray(result!.data)) {
          setCategoriesResult(result!.data);
        }
      } catch (error) {
        setServerError("An error occurred while fetching cart items.");
      }
    };

    fetchCategories();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  const changeSearchCategoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearchCategoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCategories(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setCategoriesResult(result.data);
    }
  };

  const handleCategoryPopupSubmit = async (
    e: SyntheticEvent,
    close: () => void
  ) => {
    e.preventDefault();

    const result = await postCategory(categoryName);
    if (typeof result === "string") {
      setServerError(result);
    } else if (result!.data) {
      setCategoriesResult((prevCategories) => [
        ...prevCategories,
        result!.data,
      ]);
      close(); // Close the popup after successful submission
    }
  };

  const handleCategoryPopupNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const onDeleteCategory = async (e: any) => {
    e.preventDefault();
    const categoryId = parseInt(e.target[0].value);
    const removed = await deleteCategory(categoryId);

    if (typeof removed === "string") {
      setServerError(removed);
    } else if (removed?.data) {
      setCategoriesResult(removed!.data);
    } else {
      setServerError("Unexpected response format");
    }
  };

  const handleEditCategoryPopupSubmit = async (
    e: SyntheticEvent,
    close: () => void
  ) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      categoryId: { value: string };
      categoryName: { value: string };
    };

    const id = parseInt(target.categoryId.value);
    const name = target.categoryName.value;

    const result = await putCategory(id, name);
    if (typeof result === "string") {
      setServerError(result);
    } else if (result!.data) {
      setCategoriesResult((prevCategories) =>
        prevCategories.map((category) =>
          category.id === result!.data.id ? result!.data : category
        )
      );
      close(); // Close the popup after successful submission
    }
  };

  return (
    <>
      <Search
        usedForComponent="categories"
        search={search}
        changeSearchHandler={changeSearchCategoHandler}
        onSearchSubmit={onSearchCategoSubmit}
      />
      <AddForm
        children={
          <AddCategory
            closeOnSubmit={() => {}}
            handleCategoryPopupNameChange={handleCategoryPopupNameChange}
            handleCategoryPopupSubmit={handleCategoryPopupSubmit}
          />
        }
      />
      <Categories
        closeOnSubmit={() => {}}
        categoriesData={categoriesResult}
        onDeleteCategory={onDeleteCategory}
        handleEditCategoryPopupSubmit={handleEditCategoryPopupSubmit}
      />
      {serverError && <h1>{serverError}</h1>}
    </>
  );
};

export default SearchPage;
