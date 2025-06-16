import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layout";
import { deleteCookie } from "cookies-next";
import { signOut } from "../../lib/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { isLoading, data: dataProfile } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  async function handleSignOut() {
    try {
      const res = await dispatch(signOut());
      if (signOut.fulfilled.match(res)) {
        deleteCookie("accessToken");
        navigate("/login");
      } else {
        console.log("tidak  bisa logout");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <MainLayout>
      <section>
        <h1>{dataProfile?.name}</h1>
        <button className="btn btn-error" onClick={() => handleSignOut()}>
          LogOut
        </button>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
