import { useEffect, useState } from "react";
import { FaGithubSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa';
import Select from 'react-select';
import HeroSection from "../components/HeroSection";
import StaffSkeleton from "../components/skeletons/StaffSkeleton";
import useFetchAllStaff from '../hooks/staff/useFetchAllStaff';
import { useFetchPeriod } from '../hooks/staff/useFetchPeriod';
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useTheme } from "../hooks/useTheme";

export default function Staf() {
  useDocumentTitle("Staff");
  const isDark = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: periods } = useFetchPeriod();

  const [currentPeriod, setCurrentPeriod] = useState('');
  const [currentRole, setCurrentRole] = useState('');

  useEffect(() => {
    if (periods && periods.length > 0) {
      const latestPeriod = periods.slice().reverse()[0];
      setCurrentPeriod(latestPeriod.period_year);
    }
  }, [periods]);

  const { staff, loading } = useFetchAllStaff(currentPeriod, currentRole);

  const roles = [
    {
      id: 1,
      short: 'BPI',
      long: 'Badan Pengurus Inti'
    },
    {
      id: 2,
      short: 'HUMAS',
      long: 'Hubungan Masyarakat'
    },
    {
      id: 3,
      short: 'KWU',
      long: 'Kewirausahaan'
    },
    {
      id: 4,
      short: 'LITBANG',
      long: 'Penelitian dan Pengembangan'
    },
    {
      id: 5,
      short: 'MEDIATEK',
      long: 'Media dan Teknologi'
    },
    {
      id: 6,
      short: 'PSDM',
      long: 'Pengembangan Sumber Daya Mahasiswa'
    }
  ];

  // Get current selected period for display
  const reversedPeriods = periods?.slice().reverse() || [];
  const selectedPeriodObj = reversedPeriods.find((p) => p.period_year === currentPeriod);
  const selectedValue = selectedPeriodObj ? {
    value: selectedPeriodObj.period_year,
    label: `${selectedPeriodObj.period_name} - ${selectedPeriodObj.period_year}`
  } : null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'
      }`}>

      <div className="relative z-10">
        <HeroSection
          title="Pengurus HMIF UNEJ"
          subtitle="Individu-individu berbeda latar belakang yang bersatu dalam satu misi, menciptakan keluarga besar yang solid dengan visi yang sama untuk HMIF UNEJ"
          subtitleLabel="Struktur Organisasi"
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div>
            <div className="mb-6">
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Periode Kepengurusan
              </label>
              <Select
                options={reversedPeriods.map((p) => ({
                  value: p.period_year,
                  label: `${p.period_name} - ${p.period_year}`
                })) || []}
                onChange={(option) => setCurrentPeriod(option?.value || '')}
                value={selectedValue}
                className="font-bricolage"
                classNamePrefix="select"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
                    borderColor: isDark ? '#334155' : '#cbd5e1',
                    color: isDark ? '#e2e8f0' : '#0f172a',
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    borderRadius: '0.75rem',
                    padding: '0.5rem 0.75rem',
                    border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
                    cursor: 'pointer'
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? '#059669' : state.isFocused ? (isDark ? '#0f172a' : '#f1f5f9') : (isDark ? '#1e293b' : '#ffffff'),
                    color: state.isSelected ? '#ffffff' : (isDark ? '#e2e8f0' : '#0f172a'),
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    cursor: 'pointer',
                    padding: '0.75rem 1rem'
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    borderColor: isDark ? '#334155' : '#cbd5e1',
                    maxHeight: '200px',
                    border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`
                  }),
                  menuList: (base) => ({
                    ...base,
                    maxHeight: '150px',
                    '::-webkit-scrollbar': {
                      width: '8px'
                    },
                    '::-webkit-scrollbar-track': {
                      background: isDark ? '#1e293b' : '#f1f5f9'
                    },
                    '::-webkit-scrollbar-thumb': {
                      background: isDark ? '#334155' : '#cbd5e1',
                      borderRadius: '4px'
                    }
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: isDark ? '#e2e8f0' : '#0f172a',
                    fontFamily: "'Bricolage Grotesque', sans-serif"
                  })
                }}
                isSearchable
                isClearable={false}
              />
            </div>

            <div>
              <div className="flex gap-3 overflow-x-auto items-center scrollbar-hide pb-4">
                <button
                  onClick={() => setCurrentRole('')}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 flex-shrink-0 ${currentRole === ''
                    ? isDark
                      ? 'bg-emerald-500 text-slate-950 shadow-lg'
                      : 'bg-emerald-600 text-white shadow-md'
                    : isDark
                      ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-emerald-500/50 hover:text-emerald-400'
                      : 'bg-slate-100 text-slate-700 border border-slate-300 hover:border-emerald-500 hover:text-emerald-600'
                    }`}
                >
                  Semua
                </button>

                {roles.map((r) => (
                  <div key={r.id} className="flex items-center gap-2">
                    {currentRole === r.long && (
                      <div className="flex items-center gap-2">
                        <img
                          src={`/icon-divisi/${r.short}.png`}
                          className="w-7 h-7"
                        />
                        <div className={`h-6 w-0.5 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                      </div>
                    )}
                    <button
                      onClick={() => setCurrentRole(r.long)}
                      className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 flex-shrink-0 ${currentRole === r.long
                        ? isDark
                          ? 'bg-emerald-500 text-slate-950 shadow-lg'
                          : 'bg-emerald-600 text-white shadow-md'
                        : isDark
                          ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-emerald-500/50 hover:text-emerald-400'
                          : 'bg-slate-100 text-slate-700 border border-slate-300 hover:border-emerald-500 hover:text-emerald-600'
                        }`}
                    >
                      {r.short}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full max-w-7xl mx-auto py-8">
            {loading ? (
              <StaffSkeleton />
            ) : staff.length === 0 ? (
              <div className={`text-center py-32 rounded-3xl backdrop-blur-md border transition-all duration-300 ${isDark
                ? 'bg-gradient-to-br from-emerald-600/10 via-emerald-600/5 to-emerald-600/10 border-emerald-600/30'
                : 'bg-gradient-to-br from-emerald-600/20 via-emerald-600/10 to-emerald-600/20 border-emerald-600/40'
                }`}>
                <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 font-bricolage bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-600 bg-clip-text text-transparent`}>
                  Coming Soon
                </h2>
                <p className={`text-base sm:text-lg font-medium mb-2 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Pengurus HMIF UNEJ periode {selectedPeriodObj?.period_name} sedang disiapkan
                </p>
                <p className={`text-sm sm:text-base px-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Pengurus terbaik segera hadir dengan dedikasi penuh untuk memberikan yang terbaik
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
                {staff.map((s, i) => (
                  <div
                    key={i}
                    className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 backdrop-blur-md border ${isDark
                      ? 'bg-gray-800/50 border-gray-700 hover:border-emerald-600/50'
                      : 'bg-white border-gray-200 hover:border-emerald-500/50'
                      }`}
                  >

                    <div className="relative aspect-[16/9] overflow-hidden bg-gray-200">
                      <img
                        src={import.meta.env.VITE_API_BASE_URL_ASSETS + "staff/" + s.image}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-5 relative">
                      <div className={`absolute top-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ${isDark ? 'bg-emerald-500/60' : 'bg-emerald-500/70'}`}></div>

                      <h3 className={`text-base sm:text-lg font-bold mb-1 text-center font-bricolage group-hover:text-emerald-500 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                        {s.name}
                      </h3>

                      <p className={`text-xs md:text-sm font-medium text-center mb-4 transition-colors duration-300 ${isDark ? 'text-gray-300 group-hover:text-emerald-300' : 'text-gray-700 group-hover:text-emerald-700'
                        }`}>
                        {s.name_role}
                      </p>

                      <div className="flex justify-center gap-2">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={s.li_link}
                          className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md ${isDark
                            ? 'bg-emerald-600/20 hover:bg-blue-600/40 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-blue-400/50'
                            : 'bg-emerald-400/20 hover:bg-blue-500/40 text-emerald-700 hover:text-white border border-emerald-300/30 hover:border-blue-300/50'
                            }`}
                          title="LinkedIn"
                        >
                          <FaLinkedin className="text-xl" />
                        </a>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={s.ig_link}
                          className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md ${isDark
                            ? 'bg-emerald-600/20 hover:bg-pink-600/40 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-pink-400/50'
                            : 'bg-emerald-400/20 hover:bg-pink-500/40 text-emerald-700 hover:text-white border border-emerald-300/30 hover:border-pink-300/50'
                            }`}
                          title="Instagram"
                        >
                          <FaInstagramSquare className="text-xl" />
                        </a>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={s.gh_link}
                          className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md ${isDark
                            ? 'bg-emerald-600/20 hover:bg-gray-600/40 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-gray-400/50'
                            : 'bg-emerald-400/20 hover:bg-gray-600/40 text-emerald-700 hover:text-white border border-emerald-300/30 hover:border-gray-300/50'
                            }`}
                          title="GitHub"
                        >
                          <FaGithubSquare className="text-xl" />
                        </a>
                      </div>

                      <div className={`mt-4 pt-4 border-t transition-colors duration-300 ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                        <div className={`text-center px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 backdrop-blur-md border ${isDark
                          ? 'bg-gray-700/50 text-gray-300 border-gray-600'
                          : 'bg-gray-100 text-gray-700 border-gray-300'
                          }`}>
                          {s.role}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
