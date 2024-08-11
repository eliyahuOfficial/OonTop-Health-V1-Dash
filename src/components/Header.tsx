import { useMenu } from '../contexts/MenuContext';
import { FiMenu } from 'react-icons/fi';
import DarkModeToggle from './DarkModeToggle';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isOpen, toggleMenu } = useMenu();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <img src="/OnTopLogoPng.png" alt="Logo" className="w-10 h-10 mr-2" />
          <Link to="/">
            <h1 className="text-2xl" >OonTop <span className="text-base">Health</span> </h1>
          </Link>
        </div>
        <button onClick={toggleMenu} className={`focus:outline-none p-2 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'} hover:shadow-lg active:shadow-inner`}>
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
