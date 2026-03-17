'use client'
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos"
import 'aos/dist/aos.css';

type Props = { children: ReactNode }

const Aoscompo = ({children}: Props) => {
    const pathname = usePathname();

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 800,
            once: false,
        })
    }, [])

    useEffect(() => {
        // Block browser back button
        const blockBack = () => {
          window.history.pushState(null, '', window.location.href);
          window.history.forward();
        };

        // Push initial states
        window.history.pushState(null, '', window.location.href);
        window.history.pushState(null, '', window.location.href);
        window.history.forward();
        
        window.addEventListener('popstate', blockBack);

        return () => {
          window.removeEventListener('popstate', blockBack);
        };
    }, [pathname])

  return (
    <div>
      {children}
    </div>
  )
}

export default Aoscompo
