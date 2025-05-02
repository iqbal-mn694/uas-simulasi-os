import { motion } from "framer-motion";
import { Instagram, Github, Facebook } from "lucide-react";

const About = () => {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* Simple and Wide App Description Section */}
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Sistem Simulasi Manajemen Proses dan Memori
            </h2>
            <div className="w-16 h-1 bg-blue-400 mx-auto"></div>
          </div>

          <div className="text-gray-700 text-center">
            <p className="text-lg leading-relaxed">
              Aplikasi ini menyediakan visualisasi interaktif untuk mempelajari
              konsep penjadwalan proses dengan algoritma First-Come-First-Serve
              (FCFS) dan manajemen memori menggunakan metode Best-Fit.
            </p>

            <p className="mt-6 text-sm text-gray-500">
              Apliksi ini dibangun untuk memenuhi tugas akhir matakuliah Sistem
              Operasi.
            </p>
          </div>
        </div>

        {/* Development Team Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 my-12">
            Development Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-center">
                  <img
                    className="h-32 w-32 rounded-full object-cover border-4 border-blue-100"
                    src="237006102.jpg"
                    alt="Ikhwan Kurniawan Julianto"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    Ikhwan Kurniawan Julianto
                  </h3>
                  <p className="text-sm text-gray-500">NPM: 237006102</p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <a
                      href="https://www.instagram.com/ikhwan.re/"
                      className="text-pink-500 hover:text-pink-600"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://github.com/rhenaald"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://facebook.com/IkhwanKrnwn"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-center">
                  <img
                    className="h-32 w-32 rounded-full object-cover border-4 border-blue-100"
                    src="237006107.jpg"
                    alt="Rizal Saepul Anwar"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    Rizal Saepul Anwar
                  </h3>
                  <p className="text-sm text-gray-500">NPM: 237006107</p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <a
                      href="https://www.instagram.com/121z4l_
/"
                      className="text-pink-500 hover:text-pink-600"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://github.com/zidabinn
"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://facebook.com/Xaviier-Sera"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-center">
                  <img
                    className="h-32 w-32 rounded-full object-cover border-4 border-blue-100"
                    src="237006113.jpg"
                    alt="Raihan Ardiansyah"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    Raihan Ardiansyah
                  </h3>
                  <p className="text-sm text-gray-500">NPM: 237006113</p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <a
                      href="https://www.instagram.com/raihanrdh_/"
                      className="text-pink-500 hover:text-pink-600"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-700 hover:text-gray-900">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Team Member 4 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-center">
                  <img
                    className="h-32 w-32 rounded-full object-cover border-4 border-blue-100"
                    src="237006120.jpg"
                    alt="Iqbal Mutaqin"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    Iqbal Mutaqin
                  </h3>
                  <p className="text-sm text-gray-500">NPM: 237006120</p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <a
                      href="https://www.instagram.com/iqbalmutaqin__/"
                      className="text-pink-500 hover:text-pink-600"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://github.com/iqbal-mn694
"
                      className="text-gray-700 hover:text-gray-900"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://facebook.com/Iqbal-Mutaqin"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
};

export default About;
