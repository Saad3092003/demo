import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "js-cookie";
import { url1, url2, url3, url4 } from "./components/port";
// import { url } from "inspector";
export const AddToCart_hsm = createAsyncThunk(
    "AddToCart_hsm",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "post",
                url: `${url4}/api/cart_hsm`,
                data: formData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            return response.data;
        } catch (error) {
            console.log("Not submitting data");
            return rejectWithValue(error.response.data);
        }
    }
);

export const MarkSoldAPI = createAsyncThunk(
    "MarkSoldAPI",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "post",
                url: `${url3}/markAsSold`,
                data: formData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data);
        } catch (error) {
            console.log("Not submitting data");
            return rejectWithValue(error.response.data);
        }
    }
);

export const AddView = createAsyncThunk(
    "AddView",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "post",
                url: `${url4}/api/view_Product`,
                data: formData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            return response.data;
        } catch (error) {
            console.log("Not submitting data");
            return rejectWithValue(error.response.data);
        }
    }
);

export const sendMessage = createAsyncThunk(
    "sendMessage",
    async ({ formData }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "post",
                url: `${url3}/send_chat_listing`,
                data: formData,
                // headers: {
                //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                //     "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                //     // "X-CSRFToken": csrfToken,
                // },
            });

            return response.data;
        } catch (error) {
            // console.log(csrfToken)
            console.log("Message Not Sent");
            return rejectWithValue(error.response.data);
        }
    }
);

export const likeProduct = createAsyncThunk(
    "likeProduct",
    async ({ formData }, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "post",
                url: `${url4}/api/like_Product`,
                data: formData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    // "X-CSRFToken": csrfToken,
                },
            });

            return response.data;
        } catch (error) {
            // console.log(csrfToken)
            console.log("Something went wrong");
            return rejectWithValue(error.response.data);
        }
    }
);

export const addbooking_hsm = createAsyncThunk(
    "addbooking_hsm",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "post",
                url: `${url3}/addbooking_hsm`,
                data: formData,
                headers: {
                    "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // window.location.reload();
            return response.data;

        } catch (error) {
            // console.log(csrfToken)
            alert(error.response.data.msg)
            console.log("Not submitting data");
            return rejectWithValue(error.response.data);
        }
    }
);

export const create_listing_profile = createAsyncThunk(
    "create_listing_profile",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "post",
                url: `${url3}/create_listing_profile`,
                data: formData,
                headers: {
                    "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            return response.data;
        } catch (error) {
            // console.log(csrfToken)
            console.log("Not submitting data");
            return rejectWithValue(error.response.data);
        }
    }
);
export const edit_listing_profile = createAsyncThunk(
    "edit_listing_profile",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "put",
                url: `${url1}/update_listing_profile`,
                data: formData,
                headers: {
                    "API-KEY": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            return response.data;
        } catch (error) {
            // console.log(csrfToken)
            console.log("Not submitting data");
            return rejectWithValue(error.response.data);
        }
    }
);


export const addbooking_showcase = createAsyncThunk(
    "addbooking_showcase",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "post",
                url: `${url3}/addbooking_sm`, //WARNING OLD URL PLS CHANGE
                data: formData,
                headers: {

                    "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    // "X-CSRFToken": csrfToken,
                },
            });
            // window.location.reload();
            console.log(response.data);
            return response.data;
        } catch (error) {
            // console.log(csrfToken)
            alert(error.response.data.msg)
            console.log("Not submitting data");
            return rejectWithValue(error.response.data);
        }
    }
);
export const Order_Table = createAsyncThunk(
    "Order_Table",
    async (mid, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/getOrderHistory_crm?mid=${mid}`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data);
            return response.data.orders;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const GetPurchase = createAsyncThunk(
    "GetPurchase",
    async (mid, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url3}/getMarketplacePurchase?mid=${mid}`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const GetSales = createAsyncThunk(
    "GetSales",
    async (mid, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url3}/getMarketplaceSale?mid=${mid}`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const NotificationRead = createAsyncThunk(
    "NotificationRead",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "put",
                url: `${url1}/updateReadStatus_crm`, //WARNING OLD URL PLS CHANGE
                data: formData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    // "X-CSRFToken": csrfToken,
                },
            });
            // return response.data;
            console.log(response.data);
        } catch (error) {
            // console.log(csrfToken)
            console.log("Not submitting data");
            return rejectWithValue(error.response.data);
        }
    }
);

export const editCart = createAsyncThunk(
    "editCart",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "put",
                url: `${url4}/api/cart_hsm`, //WARNING OLD URL PLS CHANGE
                data: formData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // return response.data;
            console.log(response.data);
        } catch (error) {
            // console.log(csrfToken)
            console.log("Not submitting data");
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_header_data_cms = createAsyncThunk(
    "get_header_data_cms",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios({
                method: "get",
                url: `${url1}/get_header_data_cms`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getreviews_hsm = createAsyncThunk(
    "getreviews_hsm",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios({
                method: "get",
                url: `${url4}/api/getreviews_hsm`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",

                    "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data);
            return response.data.reviews;
        } catch (error) {
            // alert("Operation failed");
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getAllBlogs_cms = createAsyncThunk(
    "getAllBlogs_cms",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios({
                method: "get",
                url: `${url1}/getAllActiveBlogs_cms`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            // alert("Operation failed");
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const viewOrder_crm = createAsyncThunk(
    "viewOrder_crm",
    async (oid, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios({
                method: "get",
                url: `${url1}/vieworder_crm?oid=${oid}`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data);
            return response.data.order;
        } catch (error) {
            // alert("Operation failed");
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const get_live_promotions_home = createAsyncThunk(
    "get_live_promotions_home",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios({
                method: "get",
                url: `${url3}/get_live_promotions_home`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",

                },
            });
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);


export const getCart = createAsyncThunk(
    "getCart",
    async (mid, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url4}/api/cart_hsm?mid=${mid}`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data.products);
            return response.data.products;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const empty_all_cart = createAsyncThunk(
    "empty_all_cart",
    async (mid, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url3}/empty_all_cart?mid=${mid}`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data.products);
            return response.data.msg;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getBlog_cms = createAsyncThunk(
    "getBlog_cms",
    async (blog_id, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url1}/getBlog_cms?blog_id=${blog_id}`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data.products);
            return response.data;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getBookings_sm = createAsyncThunk(
    "getBookings_sm",
    async (mid, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url1}/getBooking_sm?mid=${mid}`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data.products);
            return response.data.bookings_data;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getBookings_hsm = createAsyncThunk(
    "getBookings_hsm",
    async (mid, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url1}/getBooking_hsm?mid=${mid}`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data.products);
            return response.data.bookings_data;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getTerms_cms = createAsyncThunk(
    "getTerms_cms",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url1}/getTerms_cms`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data.products);
            return response.data.data;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getRefund_cms = createAsyncThunk(
    "getRefund_cms",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url1}/getRefund_cms`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data.products);
            return response.data.data;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getPrivacy_cms = createAsyncThunk(
    "getPrivacy_cms",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url1}/getPrivacy_cms`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data.products);
            return response.data.data;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getreviews_bypid = createAsyncThunk(
    "getreviews_bypid",
    async (pid, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url4}/api/getreviews_bypid?pid=${pid}`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",

                    "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data.products);
            return response.data.reviews;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const get_user_listing_profiles = createAsyncThunk(
    "get_user_listing_profiles",
    async (mid, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url3}/get_user_listing_profiles?mid=${mid}`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",

                },
            });
            // console.log(response.data.products);
            console.log(response);
            return response.data.listing_profiles;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_seller_listing_profiles = createAsyncThunk(
    "get_seller_listing_profiles",
    async (mid, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url3}/get_seller_listing_profile?mid=${mid}`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",

                },
            });
            // console.log(response.data.products);
            console.log(response.data.listings);
            return response.data.listings;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_buyers_listing_profile = createAsyncThunk(
    "get_buyers_listing_profile",
    async (lid, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url3}/get_buyers_listing_profile?lid=${lid}`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",

                },
            });
            // console.log(response.data.products);
            console.log(response);
            return response.data.buyers;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_transaction_history_wallet = createAsyncThunk(
    "get_transaction_history_wallet",
    async (mid, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url3}/get_transaction_history_wallet?mid=${mid}`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",

                },
            });
            // console.log(response.data.products);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getViewCount = createAsyncThunk(
    "getViewCount",
    async (pid, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url4}/api/view_Product?pid=${pid}`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data.products);
            return response.data.viewCount;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getLikedArray = createAsyncThunk(
    "getLikedArray",
    async (mid, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url4}/api/liked-products?mid=${mid}`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data.products);
            console.log(response.data)
            return response.data.likedItems;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const checkcart = createAsyncThunk(
    "checkcart",
    async (mid, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios({
                method: "get",
                url: `${url4}/api/cart_hsm/cart`,
                headers: {
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response.data);
            return response.data.products;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const LoggedMember = createAsyncThunk(
    "LoggedMember",
    async (mid, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url1}/viewmember_crm?mid=${mid}`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            return response.data.member;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

// HSM Product List
export const MarketplaceAllListing = createAsyncThunk(
    "MarketplaceAllListing",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/getAllListings_mpm`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            return response.data.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getContactPage_cms = createAsyncThunk(
    "getContactPage_cms",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/getContactPage_cms`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            return response.data.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getAboutUs_cms = createAsyncThunk(
    "getAboutUs_cms",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/getAboutUs_cms`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            return response.data.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getAllDepartments_cms = createAsyncThunk(
    "getAllDepartments_cms",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/getAllDepartments_cms`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            return response.data.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllUsers_um = createAsyncThunk(
    "getAllUsers_um",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/getAllUsers_um`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            return response.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const newsletter_controller = createAsyncThunk(
    "newsletter_controller",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url3}/newsletter_controller`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            return response.data.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const VeiwMember = createAsyncThunk(
    "VeiwMember",
    async (mid, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/viewmember_crm?mid=${mid}`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            return response.data.member;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);


export const get_chats_listing = createAsyncThunk(
    "get_chats_listing",
    async (lid, mid, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url3}/get_chats_listing?lid=${lid}&mid=${mid}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data.chat_messages;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

// HSM Product List
export const HSM_allProduct = createAsyncThunk(
    "HSM_allProduct",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/getAllProducts_hsm`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            return response.data.products;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getHomePage_cms = createAsyncThunk(
    "getHomePage_cms",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios({
                method: "get",
                url: `${url1}/getBanners_home_page_cms`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data.banners);
            return response.data.banners;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

// PSM All projects
export const allProjects = createAsyncThunk(
    "allProjects",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/getAllProjects_sm`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response);
            return response.data.projects;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const generalConf = createAsyncThunk(
    "generalConf",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/getGeneralConf_cms`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.log("Not getting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const HSM_category = createAsyncThunk(
    "HSM_category",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/getAllCategories_hsm`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const HSM_Product_category = createAsyncThunk(
    "HSM_Product_category",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/getAllProductCategories_hsm`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const HSM_Service_category = createAsyncThunk(
    "HSM_Service_category",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/getAllServiceCategories_hsm`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const Internal_Notes = createAsyncThunk(
    "Internal_Notes",
    async (mid, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(`${url1}/getNotes_crm?mid=${mid}`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data.data.messages);
            return response.data.data.messages;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const AllCategories_sm = createAsyncThunk(
    "AllCategories_sm",
    async (pid, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(
                `${url1}/getAllCategories_sm`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            }
            );
            console.log(response);
            return response.data.categories;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const AllCategories_mpm = createAsyncThunk(
    "AllCategories_mpm",
    async (pid, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(
                `${url1}/getAllCategory_mpm`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            }
            );
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_Category = createAsyncThunk(
    "get_Category",
    async (cid, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios.get(
                `${url1}/getCategory_sm?cid=${cid}`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            }
            );
            console.log(response);
            return response.data.category_data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_footer_data_cms = createAsyncThunk(
    "get_footer_data_cms",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios({
                method: "get",
                url: `${url1}/get_footer_data_cms`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getHomePage_cms_meta = createAsyncThunk(
    "getHomePage_cms_meta",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios({
                method: "get",
                url: `${url4}/api/HomePage_cms`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            // alert("Operation failed");
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getContactUs_cms_meta = createAsyncThunk(
    "getContactUs_cms_meta",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios({
                method: "get",
                url: `${url4}/api/ContactUS_cms`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            // alert("Operation failed");
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const getAbout_cms_meta = createAsyncThunk(
    "getAbout_cms_meta",
    async (_, { rejectWithValue }) => {
        console.log("hello");
        try {
            const response = await axios({
                method: "get",
                url: `${url4}/api/About_cms`,
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            // alert("Operation failed");
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const HSM_Product_seo = createAsyncThunk(
    "HSM_Product_seo",
    async ({ pid }, { rejectWithValue }) => {
        console.log("hello 3 motov");
        try {
            const response = await axios.get(`${url4}/api/Product_hsm/${pid}`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response);
            return response.data;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);
export const SM_Product_seo = createAsyncThunk(
    "SM_Product_seo",
    async ({ pid }, { rejectWithValue }) => {
        console.log("hello 3 motov");
        try {
            const response = await axios.get(`${url4}/api/Project_sm/?pid=${pid}`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            // console.log(response);
            return response.data.metaData;
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const userDetails = createSlice({
    name: "userDetails",
    initialState: {
        marketplaceAllListings: [],
        VeiwMember: [],
        LoggedMember: [],
        get_Category: [],
        hsm_allproducts: [],
        allProjects: [],
        getHomePage_cms: [],
        data: [],
        hsm_category: [],
        generalConf: [],
        get_buyers_listing_profile: [],
        hsm_Product_category: [],
        hsm_Service_category: [],
        Internal_Notes: [],
        newsletter_controller: [],
        getContactPage_cms: [],
        getAboutUs_cms: [],
        getAllDepartments_cms: [],
        get_header_data_cms: [],
        getCart: [],
        get_chats_listing: [],
        checkcart: [],
        get_footer_data_cms: [],
        getAllUsers_um: [],
        AllCategories_sm: [],
        AllCategories_mpm: [],
        getRefund_cms: [],
        get_transaction_history_wallet: [],
        get_user_listing_profiles: [],
        get_seller_listing_profiles: [],
        Order_Table: [],
        GetPurchase: [],
        GetSales: [],
        getViewCount: [],
        getLikedArray: [],
        viewOrder_crm: [],
        getreviews_bypid: [],
        getTerms_cms: [],
        getBookings_sm: [],
        getBookings_hsm: [],
        getPrivacy_cms: [],
        getBlog_cms: [],
        getAllBlogs_cms: [],
        empty_all_cart: [],
        getreviews_hsm: [],
        get_live_promotions_home: [],
        getHomePage_cms_meta: [],
        getAbout_cms_meta: [],
        getContactUs_cms_meta: [],
        HSM_Product_seo: [],
        SM_Product_seo: [],
    },
    reducers: {
        dummy: (state) => state,
    },
    extraReducers: (builder) => {
        builder
            // HSM Products List
            .addCase(MarketplaceAllListing.pending, (state) => {
                state.loading = true;
            })
            .addCase(MarketplaceAllListing.fulfilled, (state, action) => {
                state.loading = false;
                state.marketplaceAllListings = action.payload;
            })
            .addCase(MarketplaceAllListing.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            // Get All Member details
            .addCase(get_Category.pending, (state) => {
                state.loading = true;
            })
            .addCase(get_Category.fulfilled, (state, action) => {
                state.loading = false;
                state.get_Category = action.payload;
            })
            .addCase(get_Category.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })


            .addCase(get_transaction_history_wallet.pending, (state) => {
                state.loading = true;
            })
            .addCase(get_transaction_history_wallet.fulfilled, (state, action) => {
                state.loading = false;
                state.get_transaction_history_wallet = action.payload;
            })
            .addCase(get_transaction_history_wallet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getBlog_cms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBlog_cms.fulfilled, (state, action) => {
                state.loading = false;
                state.getBlog_cms = action.payload;
            })
            .addCase(getBlog_cms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })


            .addCase(getBookings_sm.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBookings_sm.fulfilled, (state, action) => {
                state.loading = false;
                state.getBookings_sm = action.payload;
            })
            .addCase(getBookings_sm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(getBookings_hsm.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBookings_hsm.fulfilled, (state, action) => {
                state.loading = false;
                state.getBookings_hsm = action.payload;
            })
            .addCase(getBookings_hsm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(getTerms_cms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTerms_cms.fulfilled, (state, action) => {
                state.loading = false;
                state.getTerms_cms = action.payload;
            })
            .addCase(getTerms_cms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getRefund_cms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRefund_cms.fulfilled, (state, action) => {
                state.loading = false;
                state.getRefund_cms = action.payload;
            })
            .addCase(getRefund_cms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getPrivacy_cms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPrivacy_cms.fulfilled, (state, action) => {
                state.loading = false;
                state.getPrivacy_cms = action.payload;
            })
            .addCase(getPrivacy_cms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getreviews_hsm.pending, (state) => {
                state.loading = true;
            })
            .addCase(getreviews_hsm.fulfilled, (state, action) => {
                state.loading = false;
                state.getreviews_hsm = action.payload;
            })
            .addCase(getreviews_hsm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getAllBlogs_cms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllBlogs_cms.fulfilled, (state, action) => {
                state.loading = false;
                state.getAllBlogs_cms = action.payload;
            })
            .addCase(getAllBlogs_cms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(viewOrder_crm.pending, (state) => {
                state.loading = true;
            })
            .addCase(viewOrder_crm.fulfilled, (state, action) => {
                state.loading = false;
                state.viewOrder_crm = action.payload;
            })
            .addCase(viewOrder_crm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })


            .addCase(get_live_promotions_home.pending, (state) => {
                state.loading = true;
            })
            .addCase(get_live_promotions_home.fulfilled, (state, action) => {
                state.loading = false;
                state.get_live_promotions_home = action.payload;
            })
            .addCase(get_live_promotions_home.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(AllCategories_sm.pending, (state) => {
                state.loading = true;
            })
            .addCase(AllCategories_sm.fulfilled, (state, action) => {
                state.loading = false;
                state.AllCategories_sm = action.payload;
            })
            .addCase(AllCategories_sm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(AllCategories_mpm.pending, (state) => {
                state.loading = true;
            })
            .addCase(AllCategories_mpm.fulfilled, (state, action) => {
                state.loading = false;
                state.AllCategories_mpm = action.payload;
            })
            .addCase(AllCategories_mpm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(get_header_data_cms.pending, (state) => {
                state.loading = true;
            })
            .addCase(get_header_data_cms.fulfilled, (state, action) => {
                state.loading = false;
                state.get_header_data_cms = action.payload;
            })
            .addCase(get_header_data_cms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(generalConf.pending, (state) => {
                state.loading = true;
            })
            .addCase(generalConf.fulfilled, (state, action) => {
                state.loading = false;
                state.generalConf = action.payload;
            })
            .addCase(generalConf.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(Order_Table.pending, (state) => {
                state.loading = true;
            })
            .addCase(Order_Table.fulfilled, (state, action) => {
                state.loading = false;
                state.Order_Table = action.payload;
            })
            .addCase(Order_Table.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(GetPurchase.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetPurchase.fulfilled, (state, action) => {
                state.loading = false;
                state.GetPurchase = action.payload;
            })
            .addCase(GetPurchase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(GetSales.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetSales.fulfilled, (state, action) => {
                state.loading = false;
                state.GetSales = action.payload;
            })
            .addCase(GetSales.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.getCart = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(empty_all_cart.pending, (state) => {
                state.loading = true;
            })
            .addCase(empty_all_cart.fulfilled, (state, action) => {
                state.loading = false;
                state.empty_all_cart = action.payload;
            })
            .addCase(empty_all_cart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getreviews_bypid.pending, (state) => {
                state.loading = true;
            })
            .addCase(getreviews_bypid.fulfilled, (state, action) => {
                state.loading = false;
                state.getreviews_bypid = action.payload;
            })
            .addCase(getreviews_bypid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(get_user_listing_profiles.pending, (state) => {
                state.loading = true;
            })
            .addCase(get_user_listing_profiles.fulfilled, (state, action) => {
                state.loading = false;
                state.get_user_listing_profiles = action.payload;
            })
            .addCase(get_user_listing_profiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(get_seller_listing_profiles.pending, (state) => {
                state.loading = true;
            })
            .addCase(get_seller_listing_profiles.fulfilled, (state, action) => {
                state.loading = false;
                state.get_seller_listing_profiles = action.payload;
            })
            .addCase(get_seller_listing_profiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })


            .addCase(get_buyers_listing_profile.pending, (state) => {
                state.loading = true;
            })
            .addCase(get_buyers_listing_profile.fulfilled, (state, action) => {
                state.loading = false;
                state.get_buyers_listing_profile = action.payload;
            })
            .addCase(get_buyers_listing_profile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(getViewCount.pending, (state) => {
                state.loading = true;
            })
            .addCase(getViewCount.fulfilled, (state, action) => {
                state.loading = false;
                state.getViewCount = action.payload;
            })
            .addCase(getViewCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getLikedArray.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLikedArray.fulfilled, (state, action) => {
                state.loading = false;
                state.getLikedArray = action.payload;
            })
            .addCase(getLikedArray.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(checkcart.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkcart.fulfilled, (state, action) => {
                state.loading = false;
                state.checkcart = action.payload;
            })
            .addCase(checkcart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getAboutUs_cms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAboutUs_cms.fulfilled, (state, action) => {
                state.loading = false;
                state.getAboutUs_cms = action.payload;
            })
            .addCase(getAboutUs_cms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getAllDepartments_cms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllDepartments_cms.fulfilled, (state, action) => {
                state.loading = false;
                state.getAllDepartments_cms = action.payload;
            })
            .addCase(getAllDepartments_cms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(get_footer_data_cms.pending, (state) => {
                state.loading = true;
            })
            .addCase(get_footer_data_cms.fulfilled, (state, action) => {
                state.loading = false;
                state.get_footer_data_cms = action.payload;
            })
            .addCase(get_footer_data_cms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            //Get all users
            .addCase(getAllUsers_um.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers_um.fulfilled, (state, action) => {
                state.loading = false;
                state.getAllUsers_um = action.payload;
            })
            .addCase(getAllUsers_um.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(newsletter_controller.pending, (state) => {
                state.loading = true;
            })
            .addCase(newsletter_controller.fulfilled, (state, action) => {
                state.loading = false;
                state.newsletter_controller = action.payload;
            })
            .addCase(newsletter_controller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getContactPage_cms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getContactPage_cms.fulfilled, (state, action) => {
                state.loading = false;
                state.getContactPage_cms = action.payload;
            })
            .addCase(getContactPage_cms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(LoggedMember.pending, (state) => {
                state.loading = true;
            })
            .addCase(LoggedMember.fulfilled, (state, action) => {
                state.loading = false;
                state.LoggedMember = action.payload;
            })
            .addCase(LoggedMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(VeiwMember.pending, (state) => {
                state.loading = true;
            })
            .addCase(VeiwMember.fulfilled, (state, action) => {
                state.loading = false;
                state.VeiwMember = action.payload;
            })
            .addCase(VeiwMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getHomePage_cms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHomePage_cms.fulfilled, (state, action) => {
                state.loading = false;
                state.getHomePage_cms = action.payload;
            })
            .addCase(getHomePage_cms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            // HSM Products List
            .addCase(HSM_allProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(HSM_allProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.hsm_allproducts = action.payload;
            })
            .addCase(HSM_allProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(get_chats_listing.pending, (state) => {
                state.loading = true;
            })
            .addCase(get_chats_listing.fulfilled, (state, action) => {
                state.loading = false;
                state.get_chats_listing = action.payload;
            })
            .addCase(get_chats_listing.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            // PSM Project list
            .addCase(allProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(allProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.allProjects = action.payload;
            })
            .addCase(allProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            // HSM category
            .addCase(HSM_category.pending, (state) => {
                state.loading = true;
            })
            .addCase(HSM_category.fulfilled, (state, action) => {
                state.loading = false;
                state.hsm_category = action.payload;
            })
            .addCase(HSM_category.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(HSM_Product_category.pending, (state) => {
                state.loading = true;
            })
            .addCase(HSM_Product_category.fulfilled, (state, action) => {
                state.loading = false;
                state.hsm_Product_category = action.payload;
            })
            .addCase(HSM_Product_category.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(HSM_Service_category.pending, (state) => {
                state.loading = true;
            })
            .addCase(HSM_Service_category.fulfilled, (state, action) => {
                state.loading = false;
                state.hsm_Service_category = action.payload;
            })
            .addCase(HSM_Service_category.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(Internal_Notes.pending, (state) => {
                state.loading = true;
            })
            .addCase(Internal_Notes.fulfilled, (state, action) => {
                state.loading = false;
                state.Internal_Notes = action.payload;
            })
            .addCase(Internal_Notes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(HSM_Product_seo.pending, (state) => {
                state.loading = true;
            })
            .addCase(HSM_Product_seo.fulfilled, (state, action) => {
                state.loading = false;
                state.HSM_Product_seo = action.payload;
            })
            .addCase(HSM_Product_seo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            .addCase(SM_Product_seo.pending, (state) => {
                state.loading = true;
            })
            .addCase(SM_Product_seo.fulfilled, (state, action) => {
                state.loading = false;
                state.SM_Product_seo = action.payload;
            })
            .addCase(SM_Product_seo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            //Get home page cms meta
            .addCase(getHomePage_cms_meta.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHomePage_cms_meta.fulfilled, (state, action) => {
                state.loading = false;
                state.getHomePage_cms_meta = action.payload;
            })
            .addCase(getHomePage_cms_meta.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
            // Get About CMS meta
            .addCase(getAbout_cms_meta.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAbout_cms_meta.fulfilled, (state, action) => {
                state.loading = false;
                state.getAbout_cms_meta = action.payload;
            })
            .addCase(getAbout_cms_meta.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            .addCase(getContactUs_cms_meta.pending, (state) => {
                state.loading = true;
            })
            .addCase(getContactUs_cms_meta.fulfilled, (state, action) => {
                state.loading = false;
                state.getContactUs_cms_meta = action.payload;
            })
            .addCase(getContactUs_cms_meta.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })
    },
});

export default userDetails.reducer;