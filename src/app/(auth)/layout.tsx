import React from 'react';
import styles from './styles.module.scss';


function AuthLayout({ children }: { children: React.ReactNode }) {
    return (

        <div
            className={`flex flex-col gap-6 justify-center items-center min-w-screen min-h-screen ${styles.root}`}
        >


            <div className="w-[460px] flex flex-col justify-center bg-[rgba(0,0,0,0.5)] rounded-3xl px-12 pt-6 pb-4  ">
                {children}
            </div>
        </div>

    );
}

export default AuthLayout;
