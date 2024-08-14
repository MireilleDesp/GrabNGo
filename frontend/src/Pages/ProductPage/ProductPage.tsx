import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { ProductGet, ProductPost } from "../../Models/Product";
import {
  deleteProduct,
  postProduct,
  putProduct,
  searchProducts,
} from "../../Services/ProductService";
import PreviewCartItems from "../../Components/CartItem/PreviewCartItems";
import Search from "../../Components/Search/Search";
import Product from "../../Components/Product/Product";
import {
  deleteCartItem,
  getCartItems,
  postCartItem,
} from "../../Services/CartItemService";
import { UserCartItemsGet } from "../../Models/CartItem";
import AddForm from "../../Components/PopupBoxes/AddPopup";
import AddProduct from "../../Components/Product/AddProduct";
import { SupplierGet } from "../../Models/Supplier";
import { getSuppliers } from "../../Services/SupplierService";
import { getCategories } from "../../Services/CategoryService";
import { CategoryGet } from "../../Models/Category";
import { useAuth } from "../../Context/useAuth";

type Props = {};

const SearchProductsPage = (props: Props) => {
  const { isAdmin } = useAuth();
  const [productsResult, setProductsResult] = useState<ProductGet[]>([]);
  const [search, setSearch] = useState<string>("");
  const [cartItems, setCartItems] = useState<UserCartItemsGet[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const [suppliersData, setSuppliers] = useState<SupplierGet[]>([]);
  const [categoryData, setCategories] = useState<CategoryGet[]>([]);
  const [formData, setFormData] = useState<ProductPost>({
    name: "",
    price: 0,
    quatityInStock: 0,
    description: "",
    image: "",
    supplierId: 0,
    categoryId: 0,
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const result = await getCartItems();
        if (typeof result === "string") {
          setServerError(result);
        } else if (Array.isArray(result!.data)) {
          setCartItems(result!.data);
        }
      } catch (error) {
        setServerError("An error occurred while fetching cart items.");
      }
    };

    const fetchProducts = async () => {
      try {
        const result = await searchProducts(search);
        if (typeof result === "string") {
          setServerError(result);
        } else if (Array.isArray(result.data)) {
          setProductsResult(result.data);
        }
      } catch (error) {
        setServerError("An error occurred while fetching products.");
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers(); // Adjust the endpoint as necessary
        setSuppliers(response!.data);
      } catch (error) {
        console.error("Failed to fetch suppliers", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategories(); // Adjust the endpoint as necessary
        if (typeof response === "string") {
          setServerError(response);
        } else if (Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch suppliers", error);
      }
    };

    // Fetch both cart items and products
    const fetchAllData = async () => {
      await Promise.all([
        fetchProducts(),
        fetchCartItems(),
        ...(isAdmin() ? [fetchSuppliers(), fetchCategories()] : []),
      ]);
    };

    fetchAllData();
  }, [search, isAdmin]); // The empty dependency array ensures this runs only once when the component mounts

  const changeSearchProdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchProdSubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchProducts(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setProductsResult(result.data);
    }
  };

  const onAddToCart = async (e: any) => {
    e.preventDefault();
    const productId = parseInt(e.target[0].value);
    const quantity = parseInt(e.target[1].value);
    const result = await postCartItem(productId, quantity);

    if (typeof result === "string") {
      setServerError(result);
    } else {
      // If it's a single object, add it to the existing cartItems array
      setCartItems((prevCartItems) => {
        const existingItemIndex = prevCartItems.findIndex(
          (item) => item.productId === result!.data.productId
        );

        if (existingItemIndex !== -1) {
          // Update the quantity of the existing item
          const updatedCartItems = [...prevCartItems];
          updatedCartItems[existingItemIndex].quantity += result!.data.quantity;
          return updatedCartItems;
        } else {
          // Add the new item to the cart
          return [...prevCartItems, result!.data];
        }
      });
    }
  };

  const onRemoveFromCart = async (e: any) => {
    e.preventDefault();

    const cartItemId = parseInt(e.target[0].value);
    const removed = await deleteCartItem(cartItemId);

    if (typeof removed === "string") {
      setServerError(removed);
    } else if (removed?.data) {
      setCartItems(removed!.data);
    } else {
      setServerError("Unexpected response format");
    }
  };

  const handleProductPopupSubmit = async (
    e: SyntheticEvent,
    close: () => void
  ) => {
    e.preventDefault();

    const {
      name,
      price,
      quatityInStock,
      description,
      image,
      supplierId,
      categoryId,
    } = formData;
    const result = await postProduct(
      name,
      price,
      quatityInStock,
      description,
      image,
      supplierId,
      categoryId
    );
    if (typeof result === "string") {
      setServerError(result);
    } else if (result!.data) {
      setProductsResult((prevProducts) => [...prevProducts, result!.data]);
      close(); // Close the popup after successful submission
    }
  };

  const handleProductPopupInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onDeleteProduct = async (e: any) => {
    e.preventDefault();
    const productId = parseInt(e.target[0].value);
    const removed = await deleteProduct(productId);

    if (typeof removed === "string") {
      setServerError(removed);
    } else if (removed?.data) {
      setProductsResult(removed!.data);
    } else {
      setServerError("Unexpected response format");
    }
  };

  const handleEditProductPopupSubmit = async (
    e: SyntheticEvent,
    close: () => void
  ) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      id: { value: string };
      name: { value: string };
      price: { value: string };
      quatityInStock: { value: string };
      description: { value: string };
      image: { value: string };
      supplierId: { value: string };
      categoryId: { value: string };
    };

    const id = parseInt(target.supplierId.value);
    const name = target.name.value;
    const price = parseInt(target.price.value);
    const quatityInStock = parseInt(target.quatityInStock.value);
    const description = target.description.value;
    const image = target.image.value;
    const supplierId = parseInt(target.supplierId.value);
    const categoryId = parseInt(target.categoryId.value);

    const result = await putProduct(
      id,
      name,
      price,
      quatityInStock,
      description,
      image,
      supplierId,
      categoryId
    );

    if (typeof result === "string") {
      setServerError(result);
    } else if (result?.data) {
      // Use the setter function to update the products array
      setProductsResult((prevProducts) =>
        prevProducts.map((product) =>
          product.id === result.data.id ? result.data : product
        )
      );
      close(); // Close the popup after successful submission
    }
  };

  return (
    <>
      <Search
        usedForComponent="products"
        search={search}
        changeSearchHandler={changeSearchProdHandler}
        onSearchSubmit={searchProdSubmitHandler}
      />
      {isAdmin() && (
        <AddForm
          children={
            <AddProduct
              closeOnSubmit={() => {}}
              handleProductPopupInputChange={handleProductPopupInputChange}
              handleProductPopupSubmit={handleProductPopupSubmit}
              formData={formData}
              suppliers={suppliersData}
              categories={categoryData}
            />
          }
        />
      )}
      <PreviewCartItems
        onRemoveFromCart={onRemoveFromCart}
        cartItems={cartItems}
      />
      <Product
        productData={productsResult}
        onAddToCart={onAddToCart}
        onDeleteProduct={onDeleteProduct}
        closeOnSubmit={() => {}}
        handleEditProductPopupSubmit={handleEditProductPopupSubmit}
        suppliers={suppliersData}
        categories={categoryData}
      />
      {serverError && <h1 className="sideMargin">{serverError}</h1>}
    </>
  );
};

export default SearchProductsPage;