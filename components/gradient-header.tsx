import {ReactNode} from 'react';

interface GradientHeaderProps {

    title : string;
    subtitle? : string;
    children? : ReactNode;

}
export function GradientHeader({
    title,
    subtitle,
    children
} : GradientHeaderProps) {
    return (
        <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-6 rounded-lg shadow-md mb-6">
            <div className='relative z-10'>

                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                {subtitle && <p className="text-lg">{subtitle}</p>}
                {children}



            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-50 rounded-lg shadow-md -z-10">


            </div>


            </div>
);
}