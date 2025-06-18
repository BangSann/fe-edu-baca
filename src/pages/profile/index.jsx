import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layout";
import { deleteCookie } from "cookies-next";
import { signOut } from "../../lib/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { isLoading, data: dataProfile } = useSelector((state) => state.auth);
  const navigate = useNavigate();
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

  function getAvatarInitial(name) {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }

  return (
    <MainLayout>
      <section className="h-[calc(100vh-65px)] flex justify-center mt-4">
        <div className="card bg-base-100 container space-y-4">
          <div className="flex justify-between shadow-sm p-6">
            {/* Avatar */}
            <div className="flex items-center gap-2 w-full">
              <div className="avatar avatar-online avatar-placeholder col-span-1">
                <div className="bg-primary text-primary-content w-24 rounded-full">
                  <span className="text-4xl">
                    {getAvatarInitial(dataProfile?.name || "")}
                  </span>
                </div>
              </div>
              <div className="space-y-1 text-start">
                <h2 className="text-xl font-semibold">{dataProfile?.name}</h2>
                <p className="text-sm text-gray-500">
                  @{dataProfile?.username}
                </p>
                <p className="text-sm text-gray-600">
                  {dataProfile?.sekolah?.nama_sekolah}
                </p>
              </div>
            </div>

            {/* User Info */}

            <button
              className="btn btn-error btn-sm text-white"
              onClick={handleSignOut}
            >
              Log Out
            </button>

            {/* Logout Button */}
          </div>
          <div className="flex justify-between shadow-sm p-6">
            <h1>Resume Presensi</h1>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
