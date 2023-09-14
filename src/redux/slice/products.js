import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the action creator for fetching products by category
export const fetchProductsByCategory = createAsyncThunk(
	"fetchProductsByCategory",
	async (category) => {
		const response = await fetch(
			`https://dummyjson.com/products/category/${category}`
		);
		return response.json();
	}
);

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
	const response = await fetch("https://dummyjson.com/products");
	return response.json();
});

const productsSlice = createSlice({
	name: "products",
	initialState: {
		isLoading: false,
		data: null,
		isError: false,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchProducts.rejected, (state, action) => {
			console.log("Error", action.payload);
			state.isError = true;
		});

		// Add extraReducers for fetchProductsByCategory
		builder.addCase(fetchProductsByCategory.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
			console.log("Error", action.payload);
			state.isError = true;
		});
	},
});

export default productsSlice.reducer;
