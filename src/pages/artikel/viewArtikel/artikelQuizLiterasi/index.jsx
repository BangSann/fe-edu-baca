import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNilaiLiterasiByIdUsersIdArtikel,
  uploadNilaiLiterasi,
} from "../../../../lib/redux/slice/nilaiLiterasiSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCookie, setCookie } from "cookies-next";
import Swal from "sweetalert2";

const ArtikelQuizLiterasi = ({ dataArtikel , setQuizSubmitted }) => {
  const dispatch = useDispatch();
  const { isLoading, data: dataNilai } = useSelector(
    (state) => state.nilaiLiterasi
  );
  const { data: dataProfile } = useSelector((state) => state.auth);
  const { id_artikel } = useParams();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [readingDone, setReadingDone] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentSoal, setCurrentSoal] = useState(0);
  const [answers, setAnswers] = useState({});

  const readingTimer = useRef(null);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Simpan waktu baca ke cookie, hanya jika kuis belum selesai
  useEffect(() => {
    if (dataNilai) return;

    if (timeLeft > 0 && !readingDone) {
      readingTimer.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;

          setCookie("reading_timer", newTime.toString(), {
            maxAge: 60 * 60 * 24,
          });
          setCookie("reading_artikel_id", id_artikel, {
            maxAge: 60 * 60 * 24,
          });

          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && !readingDone) {
      setReadingDone(true);
    }

    return () => clearInterval(readingTimer.current);
  }, [timeLeft, readingDone, dataNilai, id_artikel]);

  const handleOptionChange = (soalId, selected) => {
    setAnswers((prev) => ({ ...prev, [soalId]: selected }));
  };

  const handleUploadNilaiQuiz = async () => {
    const nilai = dataArtikel.soal.reduce((total, item) => {
      return total + (answers[item.id] === item.jawaban ? item.score : 0);
    }, 0);

    try {
      const res = await dispatch(
        uploadNilaiLiterasi({ nilai, id_user: dataProfile?.id, id_artikel })
      );

      if (uploadNilaiLiterasi.fulfilled.match(res)) {
        setQuizSubmitted(true); // ✅ Sembunyikan seluruh tampilan

        Swal.fire({
          title: "Sukses",
          text: "Berhasil menyelesaikan kuis.",
          icon: "success",
          confirmButtonText: "Kembali Ke Menu Utama",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteCookie("reading_timer");
            deleteCookie("reading_artikel_id");
            navigate("/");
          }
        });
      } else {
        toast.error("Nilai gagal diupload");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nextQuestion = () => {
    if (currentSoal < dataArtikel.soal.length - 1) {
      setCurrentSoal((prev) => prev + 1);
    } else {
      handleUploadNilaiQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentSoal > 0) {
      setCurrentSoal((prev) => prev - 1);
    }
  };

  if (dataNilai) {
    return (
      <section className="flex justify-center items-center h-[100vh] p-4">
        <div className="card bg-green-100 border border-green-300 shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            Quiz Sudah Selesai
          </h2>
          <p className="text-gray-700">
            Anda telah menyelesaikan quiz pada artikel ini.
          </p>
          <button
            className="btn btn-primary btn-sm mt-4"
            onClick={() => navigate("/artikel")}
          >
            Kembali Ke Daftar Artikel
          </button>
        </div>
      </section>
    );
  }

  const current = dataArtikel.soal[currentSoal];

  // quiz time
  const [quizTimeLeft, setQuizTimeLeft] = useState(15 * 60); // 15 menit untuk kuis
  const quizTimer = useRef(null); // untuk mengontrol timer kuis

  useEffect(() => {
    if (!startQuiz || dataNilai) return;

    quizTimer.current = setInterval(() => {
      setQuizTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(quizTimer.current);
          handleUploadNilaiQuiz(); // Auto-submit jika waktu habis
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(quizTimer.current);
  }, [startQuiz, dataNilai]);

  return (
    <section className="p-4 w-full mx-auto space-y-6 flex flex-col items-center h-[96vh]">
      {!startQuiz && (
        <div className="bg-base-100 shadow-md container">
          <div className="p-4">
            <div className="mt-2 text-right">
              <span className="badge badge-info text-white">
                Waktu Baca: {formatTime(timeLeft)}
              </span>
            </div>
            <div className="w-full h-[70vh] border rounded mt-4 overflow-hidden">
              <iframe
                src={dataArtikel.artikel_link}
                title="Artikel"
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  clearInterval(readingTimer.current);
                  setStartQuiz(true);
                }}
              >
                Mulai Kuis
              </button>
            </div>
          </div>
        </div>
      )}

      {startQuiz && (
        <div className="card bg-base-100 shadow-md w-full container">
          <div className="card-body space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Soal {currentSoal + 1} dari {dataArtikel.soal.length}
              </h3>
              <div className="space-x-2">
                <span className="badge badge-info text-white">
                  Sisa Waktu: {formatTime(quizTimeLeft)}
                </span>
                <span className="badge badge-secondary capitalize">
                  {dataArtikel.type}
                </span>
              </div>
            </div>

            <h4 className="font-semibold text-start text-2xl">
              {current.soal}
            </h4>

            <div className="flex flex-col space-y-2">
              {["a", "b", "c", "d", "e"].map((opt) => (
                <label key={opt} className="label cursor-pointer">
                  <input
                    type="radio"
                    name={`opsi-${current.id}`}
                    className="radio"
                    value={current[`opsi_${opt}`]}
                    checked={answers[current.id] === current[`opsi_${opt}`]}
                    onChange={() =>
                      handleOptionChange(current.id, current[`opsi_${opt}`])
                    }
                  />
                  <span className="label-text ml-2">
                    {current[`opsi_${opt}`]}
                  </span>
                </label>
              ))}
            </div>

            <div className="card-actions justify-between">
              <button
                className="btn btn-primary"
                onClick={prevQuestion}
                disabled={currentSoal < 1 || isLoading}
              >
                Kembali
              </button>
              <button
                className={`btn text-white ${
                  currentSoal === dataArtikel.soal.length - 1
                    ? "btn-info"
                    : "btn-primary"
                }`}
                onClick={nextQuestion}
                disabled={isLoading}
              >
                {currentSoal === dataArtikel.soal.length - 1
                  ? "Selesai"
                  : "Lanjut"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ArtikelQuizLiterasi;
