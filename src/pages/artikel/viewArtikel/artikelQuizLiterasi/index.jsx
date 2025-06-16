import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadNilaiLiterasi } from "../../../../lib/redux/slice/nilaiLiterasiSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCookie, setCookie } from "cookies-next";

const ArtikelQuizLiterasi = ({ dataArtikel }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.nilaiLiterasi);
  const { data: dataProfile } = useSelector((state) => state.auth);
  const { id_artikel } = useParams();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 menit baca
  const [readingDone, setReadingDone] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentSoal, setCurrentSoal] = useState(0);
  const [answers, setAnswers] = useState({});
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !readingDone) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !readingDone) {
      setReadingDone(true);
    }
    return () => clearInterval(timer);
  }, [timeLeft, readingDone]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleOptionChange = (soalId, selected) => {
    setAnswers((prev) => ({
      ...prev,
      [soalId]: selected,
    }));
  };

  //   set current time
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !readingDone) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;

          // Simpan ke cookies setiap update waktu
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
    return () => clearInterval(timer);
  }, [timeLeft, readingDone]);
  //   set current time

  const nextQuestion = () => {
    if (currentSoal < dataArtikel.soal.length - 1) {
      setCurrentSoal(currentSoal + 1);
    } else {
      handleUploadNilaiQuiz({
        nilai: dataArtikel.soal.reduce((total, item) => {
          const jawabanUser = answers[item.id];
          return total + (jawabanUser === item.jawaban ? item.score : 0);
        }, 0),
        id_user: dataProfile?.id,
        id_artikel: id_artikel,
      });
    }
  };

  const prevQuestion = () => {
    if (currentSoal >= 1) {
      setCurrentSoal(currentSoal - 1);
    }
  };

  const current = dataArtikel.soal[currentSoal];

  async function handleUploadNilaiQuiz(data) {
    try {
      const res = await dispatch(uploadNilaiLiterasi(data));
      if (uploadNilaiLiterasi.fulfilled.match(res)) {
        toast.success("nilai telah direkap");
        deleteCookie("reading_timer");
        deleteCookie("reading_artikel_id");
        navigate("/");
      } else {
        toast.error("nilai gagal diupload");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="p-4 w-full mx-auto space-y-6 flex flex-col items-center justify-center">
      {/* Informasi Artikel */}
      <div
        className={`bg-base-100 shadow-md container ${
          startQuiz ? "hidden" : ""
        }`}
      >
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
              //   disabled={!readingDone}
              onClick={() => setStartQuiz(true)}
            >
              {"Mulai Quiz"}
            </button>
          </div>
        </div>
      </div>

      {/* Quiz */}
      {startQuiz && (
        <div className="card bg-base-100 shadow-md w-full container">
          <div className="card-body space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Soal {currentSoal + 1} dari {dataArtikel.soal.length}
              </h3>
              <span className="badge badge-secondary capitalize">
                {dataArtikel.type}
              </span>
            </div>

            <h4 className="font-semibold text-start text-2xl">
              {current.soal}
            </h4>
            <div className="form-control space-y-2 flex flex-col">
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
                {"kembali"}
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
