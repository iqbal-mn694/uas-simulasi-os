import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    HomeIcon,
    CpuChipIcon,
    CircleStackIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        {
            path: "/",
            name: "Home",
            icon: <HomeIcon className="w-5 h-5" />,
        },
        {
            path: "/process",
            name: "Process Manager",
            icon: <CpuChipIcon className="w-5 h-5" />,
        },
        {
            path: "/memory",
            name: "Memory Manager",
            icon: <CircleStackIcon className="w-5 h-5" />,
        },
        {
            path: "/about",
            name: "About",
            icon: <InformationCircleIcon className="w-5 h-5" />,
        },
    ];

    return (
        <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                            <CpuChipIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-gray-800 hidden sm:inline-block">
                            OS Simulator
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-3 py-2 rounded-md flex items-center space-x-1 text-sm font-medium relative transition-colors
                  ${location.pathname === item.path
                                        ? "text-indigo-600"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                <span className="hidden sm:inline-block">{item.icon}</span>
                                <span>{item.name}</span>

                                {location.pathname === item.path && (
                                    <motion.div
                                        layoutId="navIndicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
