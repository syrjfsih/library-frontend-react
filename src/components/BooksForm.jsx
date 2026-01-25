import { createBook, updateBook } from "../../api/booksApi";

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("judul", judul);
  formData.append("penulis", penulis);
  formData.append("penerbit", penerbit);
  formData.append("tahun_terbit", tahun);
  formData.append("stok", stok);

  if (cover) {
    formData.append("cover", cover);
  }

  if (editMode) {
    await updateBook(book.id, formData);
  } else {
    await createBook(formData);
  }
};
