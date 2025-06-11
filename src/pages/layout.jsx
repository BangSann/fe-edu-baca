import Navbar from "../components/navbar";

const MainLayout = ({ children }) => {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
};

export default MainLayout;
