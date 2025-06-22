import MainLayout from "../layout";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

const KontakPage = () => {
  return (
    <MainLayout>
      <section className="h-[90vh] mt-8">
        <div className="rounded-md w-full shadow-md p-6 container mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold text-green-700">Tentang EduBaca</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong>EduBaca</strong> adalah platform pembelajaran literasi
            digital yang dirancang untuk membantu siswa dalam memahami materi
            melalui artikel interaktif, kuis, dan modul pembelajaran lainnya.
            Kami percaya bahwa membaca adalah kunci utama dalam membangun
            generasi cerdas dan kritis.
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Ikuti Kami
            </h2>
            <div className="flex justify-center gap-6 text-3xl text-green-600">
              <a
                href="https://www.instagram.com/edubaca.unpkdr?igsh=N3FvbXprNWg1aTds"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <FaInstagram className="hover:text-pink-600 transition" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCuFvZk9qrFSdxxwk6GYBK3Q"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
              >
                <FaYoutube className="hover:text-red-600 transition" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61577723757851"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <FaFacebook className="hover:text-blue-600 transition" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default KontakPage;
