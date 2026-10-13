import { createBrowserRouter } from "react-router-dom";
import NavbarContainer from "../components/NavbarBlock/NavbarContainer";
import Layout from "../layout/Layout";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import Home from "../auth/Home";
import ResetPassword from "../Auth/ResetPassword";
import ProfileContainer from "../Components/Profile/ProfileContainer";
import MyAccount from "../Components/Profile/MyAccount";
import AddProfile from "../Components/Profile/AddProfile";
import UploadProfilePhoto from "../Components/Profile/AddProfilePhoto";
import ChangePassword from "../Components/Profile/ChangePassword";
import DeleteAccount from "../Components/Profile/DeleteAccount";
import AdminContainer from "../Admin/AdminContainer";
import CreateAlbum from "../Components/Profile/Album/CreateAlbum";
import PopularAlbums from "../albumLanding/PopularAlbums";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import AlbumLandingContainer from "../albumLanding/AlbumLandingContainer";
import AlbumDetails from "../albumLanding/AlbumDetails";
import AddProfilePhoto from "../Components/Profile/AddProfilePhoto";


let myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path:"/",
                element: <AlbumLandingContainer />,
                children:[
                    {
                        index:true,
                        element:<PopularAlbums/>
                    },{
                        path:"album-details/:title",
                        element:<AlbumDetails/>
                    }
                ]
            },
            {
                path: "/auth/login",
                element: 
                <PublicRoutes>
                    <Login />
                </PublicRoutes>,

            },
            {
                path: "/auth/register",
                element: 
                <PublicRoutes>
                    <Register />
                </PublicRoutes>,
            },
            {
                path: "/auth/reset-password",
                element: 
                <PublicRoutes>
                    <ResetPassword />
                </PublicRoutes>,
            },
            {
                path:"/admin",
                element:<AdminContainer/>,
                children:[
                    {
                        path:"create-album",
                        element:<CreateAlbum/>,
                    },
                ]
            },
            {
                path: "/user/profile",
                element: (
                    <PrivateRoutes>
                        <ProfileContainer />
                    </PrivateRoutes>
                ),
                children: [
                    {
                        index:true,
                        element: <MyAccount />,
                    },
                    {
                        path: "add-profile",
                        element: <AddProfile />,
                    },
                    {
                        path: "upload-profile-photo",
                        element: <AddProfilePhoto />,
                    },
                    {
                        path: "change-password",
                        element: <ChangePassword />,
                    },
                    {
                        path: "delete-account",
                        element: <DeleteAccount />,
                    },
                ]
            },
            {
                path: "*",
                element: <h1>404! Page Not Found</h1>,
            }
        ]
    },
])
export default myRoutes