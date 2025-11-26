import { useEffect } from 'react';

/**
 * Custom hook untuk mengubah document title
 * @param {string} title - Judul halaman
 * @param {boolean} includeSiteName - Apakah menyertakan nama site (default: true)
 */
export const useDocumentTitle = (title, includeSiteName = true) => {
  useEffect(() => {
    const siteName = 'HMIF UNEJ';
    const fullTitle = includeSiteName && title !== siteName 
      ? `${siteName} - ${title}`
      : title;
    
    document.title = fullTitle;

    // Cleanup - kembalikan ke title default saat component unmount
    return () => {
      document.title = 'HMIF UNEJ - Himpunan Mahasiswa Informatika Universitas Jember';
    };
  }, [title, includeSiteName]);
};

export default useDocumentTitle;
