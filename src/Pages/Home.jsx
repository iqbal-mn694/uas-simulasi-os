import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    CpuChipIcon,
    CircleStackIcon,
    ChartBarSquareIcon,
    AcademicCapIcon,
    ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
    const [isProcessHovered, setIsProcessHovered] = useState(false);
    const [isMemoryHovered, setIsMemoryHovered] = useState(false);
    const [animateHero, setAnimateHero] = useState(false);

    useEffect(() => {
        setAnimateHero(true);
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut",
            },
        }),
        hover: {
            scale: 1.03,
            transition: {
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier curve
            },
        },
    };

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const fiturList = [
        {
            icon: <ArrowsRightLeftIcon className="w-8 h-8 text-purple-600" />,
            title: "Visualisasi Interaktif",
            description:
                "Lihat algoritma bekerja dengan animasi langkah demi langkah yang dapat Anda kontrol",
            color: "from-indigo-500 to-indigo-500",
            bgColor: "bg-purple-50",
        },
        {
            icon: <ChartBarSquareIcon className="w-8 h-8 text-blue-600" />,
            title: "Analisis Performa",
            description:
                "Bandingkan dan ukur efisiensi setiap algoritma dengan metrik yang jelas",
            color: "from-indigo-500 to-cyan-500",
            bgColor: "bg-blue-50",
        },
        {
            icon: <AcademicCapIcon className="w-8 h-8 text-indigo-600" />,
            title: "Panduan Belajar",
            description:
                "Penjelasan teori dan praktik setiap konsep dengan contoh nyata",
            color: "from-indigo-500 to-violet-500",
            bgColor: "bg-indigo-50",
        },
    ];

    const tujuanPembelajaran = [
        "Memahami konsep dasar penjadwalan proses dan algoritma yang populer",
        "Menganalisis strategi alokasi memori dan dampaknya terhadap performa sistem",
        "Membandingkan performa algoritma berbeda dalam berbagai skenario beban kerja",
        "Memvisualisasikan manajemen sumber daya OS dengan grafik dan simulasi",
    ];

    const edukasiList = [
        {
            title: "Apa itu Penjadwalan Proses?",
            content:
                "Penjadwalan proses adalah metode yang digunakan sistem operasi untuk mengalokasikan waktu CPU ke berbagai proses yang sedang berjalan. Tujuannya adalah untuk memaksimalkan penggunaan CPU dan memberikan waktu respons yang optimal.",
            icon: <CpuChipIcon className="w-6 h-6 text-indigo-600" />,
        },
        {
            title: "Mengapa Manajemen Memori Penting?",
            content:
                "Manajemen memori yang efisien memungkinkan sistem operasi untuk mengalokasikan memori ke proses yang membutuhkan, melindungi memori tiap proses, dan memastikan penggunaan memori fisik yang optimal melalui teknik seperti paging dan segmentation.",
            icon: <CircleStackIcon className="w-6 h-6 text-blue-600" />,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 w-screen">
            {/* Hero Section */}
            <section className="w-full py-20 md:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={animateHero ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-7xl mx-auto px-6 lg:px-8 text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
                        Simulator{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                            Sistem Operasi
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
                        Platform interaktif untuk mempelajari manajemen proses dan memori
                        dengan simulasi visual
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/process"
                            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                        >
                            Mulai Simulasi
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Fitur Section */}
            <motion.section
                id="fitur"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="w-full py-16 bg-white"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                            Fitur{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                                Unggulan
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Belajar konsep sistem operasi dengan cara yang interaktif dan
                            menyenangkan
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {fiturList.map((fitur, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                custom={index}
                                className={`${fitur.bgColor} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 will-change-transform`}
                            >
                                <div className="p-6">
                                    <div className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-white shadow-md">
                                        {fitur.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-800">
                                        {fitur.title}
                                    </h3>
                                    <p className="text-gray-600">{fitur.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Simulasi Section */}
            <motion.section
                id="simulasi"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="w-full py-16 bg-gradient-to-br from-indigo-50 to-purple-50"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                            Mulai{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                                Belajar
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Pilih modul simulasi untuk mempelajari konsep sistem operasi
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200"
                            onMouseEnter={() => setIsProcessHovered(true)}
                            onMouseLeave={() => setIsProcessHovered(false)}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.3, ease: "easeOut" },
                            }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center">
                                <div className="md:w-1/3 mb-6 md:mb-0">
                                    <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-500 rounded-2xl shadow-lg flex items-center justify-center mx-auto md:mx-0">
                                        <CpuChipIcon className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                                <div className="md:w-2/3">
                                    <h3 className="text-2xl font-bold mb-3 text-gray-800">
                                        Manajemen Proses
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Pelajari algoritma penjadwalan proses FCFS (First Come First
                                        Serve).
                                    </p>
                                    <Link
                                        to="/process"
                                        className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        Mulai Simulasi
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200"
                            onMouseEnter={() => setIsMemoryHovered(true)}
                            onMouseLeave={() => setIsMemoryHovered(false)}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.3, ease: "easeOut" },
                            }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center">
                                <div className="md:w-1/3 mb-6 md:mb-0">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-lg flex items-center justify-center mx-auto md:mx-0">
                                        <CircleStackIcon className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                                <div className="md:w-2/3">
                                    <h3 className="text-2xl font-bold mb-3 text-gray-800">
                                        Manajemen Memori
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Pelajari strategi alokasi memori dan teknik manajemen memori
                                        modern.
                                    </p>
                                    <Link
                                        to="/memory"
                                        className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        Mulai Simulasi
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Learning Goals */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="w-full py-16 bg-gradient-to-br from-indigo-600 to-purple-700"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            Tujuan Pembelajaran
                        </h2>
                        <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                            Setelah menggunakan simulator ini, Anda diharapkan mampu:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {tujuanPembelajaran.map((tujuan, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                custom={idx}
                                className="bg-white/10 backdrop-blur-md rounded-xl p-5 flex items-start border border-white/20 hover:bg-white/20 transition-colors duration-300 hover:scale-[1.01]"
                            >
                                <div className="bg-white/20 rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                                    <span className="text-white font-bold">{idx + 1}</span>
                                </div>
                                <p className="text-white">{tujuan}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Edukasi Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="w-full py-16 bg-white"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                            Informasi{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                Edukasi
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Pelajari konsep dasar sistem operasi
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {edukasiList.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.3, ease: "easeOut" },
                                }}
                                custom={index}
                                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 will-change-transform"
                            >
                                <div className="flex items-start">
                                    <div className="bg-indigo-50 p-3 rounded-lg mr-4">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-3 text-gray-800">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600">{item.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
