import {
    AcademicCapIcon,
    CodeBracketIcon,
    EnvelopeIcon,
    BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white pt-12 pb-6">
            <div className="container mx-auto px-6">
                {/* Grid Footer */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Tentang Simulator */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <CodeBracketIcon className="h-8 w-8 text-indigo-300 mr-2" />
                            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                                OS Simulator
                            </h3>
                        </div>
                        <p className="text-indigo-100">
                            Platform edukasi interaktif untuk mempelajari manajemen proses dan
                            memori dalam sistem operasi.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-indigo-200 hover:text-white transition-colors"
                            >
                                <FaGithub className="h-6 w-6" />
                            </a>
                            <a
                                href="#"
                                className="text-indigo-200 hover:text-white transition-colors"
                            >
                                <FaLinkedin className="h-6 w-6" />
                            </a>
                            <a
                                href="#"
                                className="text-indigo-200 hover:text-white transition-colors"
                            >
                                <EnvelopeIcon className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Navigasi Cepat */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">
                            Navigasi Cepat
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-indigo-200 hover:text-white transition-colors"
                                >
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-indigo-200 hover:text-white transition-colors"
                                >
                                    Simulasi Proses
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-indigo-200 hover:text-white transition-colors"
                                >
                                    Simulasi Memori
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-indigo-200 hover:text-white transition-colors"
                                >
                                    Panduan
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Sumber Belajar */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">
                            Sumber Belajar
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center text-indigo-200 hover:text-white transition-colors"
                                >
                                    <AcademicCapIcon className="h-4 w-4 mr-2" />
                                    Materi Teori
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center text-indigo-200 hover:text-white transition-colors"
                                >
                                    <BuildingLibraryIcon className="h-4 w-4 mr-2" />
                                    Referensi Buku
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center text-indigo-200 hover:text-white transition-colors"
                                >
                                    <CodeBracketIcon className="h-4 w-4 mr-2" />
                                    Contoh Kode
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">
                            Hubungi Kami
                        </h4>
                        <address className="not-italic text-indigo-100 space-y-2">
                            <p>Jurusan Ilmu Komputer</p>
                            <p>Universitas Pendidikan Indonesia</p>
                            <p>Bandung, Jawa Barat</p>
                            <a
                                href="mailto:contact@ossimulator.edu"
                                className="flex items-center hover:text-white transition-colors"
                            >
                                <EnvelopeIcon className="h-4 w-4 mr-2" />
                                contact@ossimulator.edu
                            </a>
                        </address>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-indigo-700 my-6"></div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-indigo-300 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} OS Simulator. Seluruh hak cipta
                        dilindungi.
                    </p>
                    <div className="flex space-x-6">
                        <a
                            href="#"
                            className="text-indigo-300 hover:text-white text-sm transition-colors"
                        >
                            Kebijakan Privasi
                        </a>
                        <a
                            href="#"
                            className="text-indigo-300 hover:text-white text-sm transition-colors"
                        >
                            Syarat Penggunaan
                        </a>
                        <a
                            href="#"
                            className="text-indigo-300 hover:text-white text-sm transition-colors"
                        >
                            Peta Situs
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
