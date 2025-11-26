export const validateFormData = (formData) => {
  const nama = formData.get("nama")?.trim();
  const email = formData.get("email")?.trim();
  const pesan = formData.get("pesan")?.trim();

  if (!nama) {
    return { valid: false, message: "Nama tidak boleh kosong!" };
  }

  if (!email) {
    return { valid: false, message: "Email tidak boleh kosong!" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, message: "Format email tidak valid!" };
  }

  if (!pesan) {
    return { valid: false, message: "Pesan tidak boleh kosong!" };
  }

  return { valid: true };
};
