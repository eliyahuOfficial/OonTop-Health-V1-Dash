import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

const DarkModeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <button
      className="relative focus:outline-none p-2 rounded-full hover:shadow-lg active:shadow-inner pl-4"
      onClick={toggle}
    >
      <div className={`icon-transition ${theme === 'light' ? 'icon-hidden' : 'icon-visible'}`}>
        <FaMoon className="w-6 h-6" />
      </div>
      <div className={`icon-transition ${theme === 'light' ? 'icon-visible' : 'icon-hidden'}`}>
        <FaSun className="w-6 h-6" />
      </div>
    </button>
  );
};

export default DarkModeToggle;
