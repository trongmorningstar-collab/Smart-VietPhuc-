import { ReactElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const PageTransition = ({ children }: { children: ReactElement }) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <div key={currentPath} className="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full h-full flex flex-col flex-grow">
      {children}
    </div>
  );
};
