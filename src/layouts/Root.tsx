
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import SideNav from '../components/SideNav.tsx';





const Root = () => {



  return (
    <div className="dark:bg-slate-700 bg-stone-100 flex flex-col min-h-screen">
      <Header />
      <SideNav />
      <main className="flex-1 max-w-screen-2xl mx-auto ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Root;
