import CustomAlert from "../components/CustomAlert";
import NavBar from "../components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CustomAlert />
      <NavBar />
      <div className="p-4 sm:ml-64">
        <div className="p-0 rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </div>
  );
}
