import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Login() {
  const {
    user,
    loginWithRedirect,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  const userData = JSON.stringify(user);
  const handleLogin = async () => {
    await loginWithRedirect();
  };
  useEffect(() => {
    sessionStorage.setItem("userInfo", userData);
    const storedUserInfo = sessionStorage.getItem("userInfo");
    // console.log("Stored ", user);
  }, [user, userData]);

  useEffect(() => {
    const saveUser = async () => {
      try {
        if (isAuthenticated) {
          
          const token = await getAccessTokenSilently();
          axios
            .post(
              "/api/v1/user/new",
              {
                userName: user.nickname,
                name: user.name,
                picture: user.picture,
                email: user.email,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Pass token in the request
                },
              }
            )
            .then((response) => {
              console.log("User Saved ", response.data);
            })
            .catch((error) => {
              console.log("Error saving user", error);
            });
        }
      } catch (error) {
        console.error(
          "Error in login:",
          error.response ? error.response.data : error
        );
      }
    };
    saveUser();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className="nav-item">
            <button className="spc-btn" onClick={logout}>
              Logout
            </button>
          </li>
          <li className="nav-item">
            <button className="btn">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </button>
          </li>
        </>
      ) : (
        <li className="nav-item">
          <button className="spc-btn" onClick={handleLogin}>
            Login{" "}
          </button>
        </li>
      )}
    </>
  );
}