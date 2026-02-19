import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// В apiSlice.js
const apiUrl = process.env.REACT_APP_API_URL || "https://kyrgyzgeology.kg/api";

export const instance = axios.create({
    baseURL: apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl, 
});

export const getHome = createAsyncThunk(
    "api/getHome",
    async function (_, { rejectWithValue }) {
        try {
            const response = await instance.get(`/home/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const getMaps = createAsyncThunk(
    "api/getMaps",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/maps/maps`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getNewMaps = createAsyncThunk(
    "api/getNewMaps",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/maps/newmaps/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getNews = createAsyncThunk(
    "api/getNews",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/news/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getServices = createAsyncThunk(
    "api/getServices",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/services/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const postComment = createAsyncThunk(
    "api/postComment",
    async ({ id, comment }, { rejectWithValue }) => {
        try {
            const response = await instance.post(`/news/${id}/comment/`, comment);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getMap = createAsyncThunk(
    "api/getMap",
    async (id , { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/maps/maps/${id}/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getNewMap = createAsyncThunk(
    "api/getNewMap",
    async (id , { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/maps/newmaps/${id}/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getNewsPost = createAsyncThunk(
    "api/getNewsPost",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/news/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getDiagramInvestor = createAsyncThunk(
    "api/getDiagramInvestor",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/charts/category-chart/allocation/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getLineChartInvestor = createAsyncThunk(
    "api/getLineChartInvestor",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/charts/category-chart/monthlyincome/`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const getInvestorsInfo = createAsyncThunk(
    "api/getInvestorsInfo",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/investors/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getInvestorItem = createAsyncThunk(
    "api/getInvestorItem",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/investors/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getGP = createAsyncThunk(
    "api/getGP",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/gp/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getGPItem = createAsyncThunk(
    "api/getGPItem",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/gp/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getAboutCompany = createAsyncThunk(
    "api/getAboutCompany",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/aboutcompany/1`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getAchievements = createAsyncThunk(
    "api/getAchievements",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/achievements/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getAchievementItem = createAsyncThunk(
    "api/getAchievementItem",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/achievements/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getEmployees = createAsyncThunk(
    "api/getEmployees",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/employees/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getEmployee = createAsyncThunk(
    "api/getEmployee",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/employees/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getBoezgrtHome = createAsyncThunk(
    "api/getBoezgrtHome",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/boezgrt/home/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getBoezgrtProducts = createAsyncThunk(
    "api/getBoezgrtProducts",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/boezgrt/products/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getBoezgrtProduct = createAsyncThunk(
    "api/getBoezgrtProduct",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/boezgrt/products/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getBoezgrtCurrencies = createAsyncThunk(
    "api/getBoezgrtCurrencies",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/boezgrt/currency/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getCategories = createAsyncThunk(
    "api/getCategories",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/category`);
            return response.data;

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getVacancies = createAsyncThunk(
    "api/getVacancies",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/vacancies`);
            return response.data;

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getVacancyDetail = createAsyncThunk(
    "api/getVacancyDetail",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const response = await instance.get(`/vacancies${id}/`);
            return response.data;

        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const postBoezgrtApplication = createAsyncThunk(
    "api/postBoezgrtApplication",
    async (comment , { rejectWithValue }) => {
        try {
            const response = await instance.post(`/comments/boezgrtapplication/`, comment);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const postKyrgyzGeologyApplication = createAsyncThunk(
    "api/postKyrgyzGeologyApplication",
    async (comment , { rejectWithValue }) => {
        try {
            const response = await instance.post(`/comments/kyrgyzgeologyapplication/`, comment);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);



const apiSlice = createSlice({
    name: "api",
    initialState: {
        homes: [],
        loading: false,
        error: null,
        map: [],
        newMap:[],
        maps: [],
        newMaps:[],
        news:[],
        newsPost:[],
        services:[],
        diagramInvestor:[],
        lineChartInvestor:[],
        investorsInfo:[],
        investorItem:[],
        gp:[],
        gpItem:[],
        aboutCompany:[],
        achievements:[],
        achievementItem:[],
        employes:[],
        employee:[],
        boezgrtHome: [],
        boezgrtProducts: [],
        boezgrtProduct:[],
        boezgrtCurrencies:[],
        categories: [],
        vacancies:[],
        vacancyDetail:[],
    },
    reducers: {
        clearMap: (state) => {
            state.map = [];
        },
        clearNewMap: (state) =>{
            state.newMap = [];
        },
        clearInvestorItem:  (state) =>{
            state.investorItem = []
        },
        clearNewsPost:  (state) =>{
            state.newsPost = []
        },
        clearAchievementItem: (state) =>{
            state.achievementItem = []
        },
        clearEmployee: (state) =>{
            state.employee = []
        },
        clearBoezgrtProduct: (state) =>{
            state.boezgrtProduct = []
        },
        clearGPItem: (state) => {
            state.gpItem = []
        },
        clearVacancyDetail: (state) =>{
            state.vacancyDetail = []
        }


    },
    extraReducers: (builder) => {
        builder
            .addCase(getHome.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHome.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.homes = payload;
            })
            .addCase(getHome.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getMaps.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMaps.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.maps = payload;
            })
            .addCase(getMaps.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getNewMaps.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNewMaps.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.newMaps = payload;
            })
            .addCase(getNewMaps.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getMap.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMap.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.map = payload;
            })
            .addCase(getMap.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getNewMap.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNewMap.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.newMap = payload;
            })
            .addCase(getNewMap.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getNews.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNews.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.news = payload;
            })
            .addCase(getNews.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getNewsPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNewsPost.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.newsPost = payload;
            })
            .addCase(getNewsPost.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(getServices.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.services = payload;
            })
            .addCase(getServices.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getDiagramInvestor.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDiagramInvestor.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.diagramInvestor = payload;
            })
            .addCase(getDiagramInvestor.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getLineChartInvestor.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLineChartInvestor.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.lineChartInvestor = payload;
            })
            .addCase(getLineChartInvestor.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getInvestorsInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(getInvestorsInfo.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.investorsInfo = payload;
            })
            .addCase(getInvestorsInfo.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getInvestorItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(getInvestorItem.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.investorItem = payload;
            })
            .addCase(getInvestorItem.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getGP.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGP.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.gp = payload;
            })
            .addCase(getGP.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getGPItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGPItem.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.gpItem = payload;
            })
            .addCase(getGPItem.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getAboutCompany.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAboutCompany.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.aboutCompany = payload;
            })
            .addCase(getAboutCompany.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getAchievements.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAchievements.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.achievements = payload;
            })
            .addCase(getAchievements.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getAchievementItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAchievementItem.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.achievementItem = payload;
            })
            .addCase(getAchievementItem.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getEmployees.pending, (state) => {
                state.loading = true;
            })
            .addCase(getEmployees.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.employees = payload;
            })
            .addCase(getEmployees.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getEmployee.pending, (state) => {
                state.loading = true;
            })
            .addCase(getEmployee.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.employee = payload;
            })
            .addCase(getEmployee.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getBoezgrtHome.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBoezgrtHome.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.boezgrtHome = payload;
            })
            .addCase(getBoezgrtHome.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getBoezgrtProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBoezgrtProducts.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.boezgrtProducts = payload;
            })
            .addCase(getBoezgrtProducts.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getBoezgrtProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBoezgrtProduct.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.boezgrtProduct = payload;
            })
            .addCase(getBoezgrtProduct.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getBoezgrtCurrencies.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBoezgrtCurrencies.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.boezgrtCurrencies = payload;
            })
            .addCase(getBoezgrtCurrencies.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.categories = payload;
            })
            .addCase(getCategories.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getVacancies.pending, (state) => {
                state.loading = true;
            })
            .addCase(getVacancies.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.vacancies = payload;
            })
            .addCase(getVacancies.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getVacancyDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(getVacancyDetail.fulfilled, (state,{payload}) => {
                state.loading = false;
                state.vacancyDetail = payload;
            })
            .addCase(getVacancyDetail.rejected, (state) => {
                state.loading = false;
            })
            .addCase(postBoezgrtApplication.pending, (state) => {
                state.loading = true;
            })
            .addCase(postBoezgrtApplication.fulfilled, (state,{payload}) => {
                state.loading = false;
            })
            .addCase(postBoezgrtApplication.rejected, (state) => {
                state.loading = false;
            })
            .addCase(postKyrgyzGeologyApplication.pending, (state) => {
                state.loading = true;
            })
            .addCase(postKyrgyzGeologyApplication.fulfilled, (state,{payload}) => {
                state.loading = false;
            })
            .addCase(postKyrgyzGeologyApplication.rejected, (state) => {
                state.loading = false;
            });


    },
});

export default apiSlice.reducer;
export const {  clearMap,
                clearNewMap ,
                clearInvestorItem,
                clearNewsPost,
                clearAchievementItem,
                clearEmployee,
                clearBoezgrtProduct,
                clearGPItem,
                clearVacancyDetail,
            } = apiSlice.actions;
