/**
 * Clase para manejar el sistema de gestión de biblioteca con un constructor.
 */
class LibrarySystem {
  constructor() {
    this.books = [];
    this.borrowedBooks = new Map();
  }

  /**
   * FUNCIÓN 1: Crear un nuevo objeto libro y retorna el objeto libro.
   */
  createBook(title, author, genre, isbn) {
    if (!title || !author || !genre || !isbn) {
      throw new Error('Todos los parámetros del libro (título, autor, género, ISBN) son obligatorios.');
    }
    const id = Date.now();
    return {
      id,
      title,
      author,
      genre,
      isbn,
      isAvailable: true,
      borrowedBy: null,
      borrowedAt: null,
      dueDate: null,
      createdAt: new Date(),
    };
  }

  /**
   * FUNCIÓN 2: Agregar un libro a la biblioteca y retorna el libro creado.
   */
  addBookToLibrary(title, author, genre, isbn) {
    const newBook = this.createBook(title, author, genre, isbn);
    this.books.push(newBook);
    console.log(` Libro agregado: "${newBook.title}" (ID: ${newBook.id})`);
    return newBook;
  }

  /**
   * FUNCIÓN 3: Eliminar un libro de la biblioteca por ID y retorna el libro eliminado o null si no existe.
   */
  removeBookFromLibrary(id) {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) {
      console.log(` No se encontró ningún libro con el ID: ${id}`);
      return null;
    }
    const [removedBook] = this.books.splice(index, 1);
    console.log(` Libro eliminado: "${removedBook.title}" (ID: ${id})`);
    return removedBook;
  }

  /**
   * FUNCIÓN 4: Prestar un libro a un usuario y retorna objeto con { success, message, book, dueDate }.
   */
  borrowBook(bookId, borrowerName, days = 14) {
    const book = this.books.find(b => b.id === bookId);

    if (!book) {
      return { success: false, message: `El libro con ID ${bookId} no existe.` };
    }
    if (!book.isAvailable) {
      return { success: false, message: `El libro "${book.title}" no está disponible, ya está prestado por ${book.borrowedBy}.` };
    }

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(borrowDate.getDate() + days);

    book.isAvailable = false;
    book.borrowedBy = borrowerName;
    book.borrowedAt = borrowDate;
    book.dueDate = dueDate;

    this.borrowedBooks.set(bookId, book);
    console.log(`  Libro prestado: "${book.title}" a ${borrowerName}. Fecha de devolución: ${dueDate.toLocaleDateString()}.`);
    return { success: true, message: 'Préstamo exitoso.', book, dueDate };
  }

  /**
   * FUNCIÓN 5: Devolver un libro prestado y retorna el objeto con { success, message, fine }.
   */
  returnBook(bookId) {
    const book = this.books.find(b => b.id === bookId);

    if (!book || book.isAvailable) {
      return { success: false, message: `El libro con ID ${bookId} no se encuentra prestado.` };
    }

    let fine = 0;
    if (book.dueDate < new Date()) {
      fine = this.calculateFine(book.dueDate);
      console.log(`  ¡Devolución tardía! Multa calculada: $${fine.toFixed(2)}.`);
    }

    // Restaurar propiedades del libro
    book.isAvailable = true;
    book.borrowedBy = null;
    book.borrowedAt = null;
    book.dueDate = null;

    // Eliminar del mapa de libros prestados
    this.borrowedBooks.delete(bookId);

    console.log(`🔙 Libro devuelto: "${book.title}".`);
    return { success: true, message: 'Devolución exitosa.', fine };
  }

  /**
   * FUNCIÓN 6: Calcular multa por retraso y retorna el numero de la multa.
   */
  calculateFine(dueDate, fineRate = 0.50) {
    const now = new Date();
    const overdueTime = now.getTime() - dueDate.getTime();
    if (overdueTime <= 0) {
      return 0;
    }
    const overdueDays = Math.ceil(overdueTime / (1000 * 60 * 60 * 24));
    return overdueDays * fineRate;
  }

  /**
   * FUNCIÓN 7: Buscar libros por criterios y retorna array de libros que coinciden.
   */
  searchBooks(criteria) {
    const lowerCaseCriteria = criteria.toLowerCase();
    const results = this.books.filter(book =>
      book.title.toLowerCase().includes(lowerCaseCriteria) ||
      book.author.toLowerCase().includes(lowerCaseCriteria) ||
      book.genre.toLowerCase().includes(lowerCaseCriteria)
    );
    console.log(` Se encontraron ${results.length} resultados para "${criteria}".`);
    return results;
  }

  /**
   * FUNCIÓN 8: Obtener libros por género específico y retorna Array de libros del género especificado.
   */
  getBooksByGenre(genre) {
    const lowerCaseGenre = genre.toLowerCase();
    const results = this.books.filter(book => book.genre.toLowerCase() === lowerCaseGenre);
    console.log(`📚 Se encontraron ${results.length} libros en el género "${genre}".`);
    return results;
  }

  /**
   * FUNCIÓN 9: Obtener lista de libros vencidos y retorna Array de objetos con información de libros vencidos.
   */
  getOverdueBooks(fineRate = 0.50) {
    const overdueList = [];
    const now = new Date();
    for (const book of this.borrowedBooks.values()) {
      if (book.dueDate < now) {
        const fine = this.calculateFine(book.dueDate, fineRate);
        overdueList.push({
          ...book,
          fine: parseFloat(fine.toFixed(2)),
        });
      }
    }
    console.log(` Se encontraron ${overdueList.length} libros con retraso.`);
    return overdueList;
  }

  /**
   * FUNCIÓN 10: Generar reporte estadístico de la bibliotecay retorna el objeto con estadísticas.
   */
  generateLibraryReport() {
    const borrowedCount = this.borrowedBooks.size;
    const availableCount = this.books.length - borrowedCount;
    let totalFines = 0;
    const overdueBooks = this.getOverdueBooks();
    overdueBooks.forEach(book => totalFines += book.fine);

    const report = {
      totalBooks: this.books.length,
      borrowedBooks: borrowedCount,
      availableBooks: availableCount,
      overdueBooks: overdueBooks.length,
      totalFines: parseFloat(totalFines.toFixed(2)),
    };
    console.log(' Generando reporte de la biblioteca...');
    console.log(report);
    return report;
  }
}

// --- Ejemplo de uso del sistema de biblioteca con datos implicitos sin entrada por consola ---

// Crear una instancia del sistema
const myLibrary = new LibrarySystem();

// Agregar libros
const book1 = myLibrary.addBookToLibrary('Cien años de soledad', 'Gabriel García Márquez', 'Realismo Mágico', '978-0307474278');
const book2 = myLibrary.addBookToLibrary('1984', 'George Orwell', 'Distopía', '978-0451524935');
const book3 = myLibrary.addBookToLibrary('El señor de los anillos', 'J.R.R. Tolkien', 'Fantasía', '978-0618053267');

// Prestar un libro
const borrowResult1 = myLibrary.borrowBook(book1.id, 'Juan Pérez', 7);

// Simular un retraso en la devolución del libro 2 para probar la multa
// Para esta prueba, cambia la fecha de vencimiento a una fecha pasada
if (borrowResult1.success) {
  const overdueBook = myLibrary.books.find(b => b.id === book1.id);
  overdueBook.dueDate = new Date(new Date().setDate(new Date().getDate() - 5)); // Pone 5 días de retraso
}

// Prestar el libro 3
const borrowResult2 = myLibrary.borrowBook(book3.id, 'María López', 21);

// Buscar un libro por criterio
const searchResults = myLibrary.searchBooks('señor');
console.log('Resultados de búsqueda:', searchResults);

// Obtener libros por género
const fantasyBooks = myLibrary.getBooksByGenre('Fantasía');
console.log('Libros de fantasía:', fantasyBooks);

// Obtener libros vencidos y sus multas
const overdueBooksList = myLibrary.getOverdueBooks();
console.log('Lista de libros con retraso:', overdueBooksList);

// Devolver un libro
const returnResult1 = myLibrary.returnBook(book1.id);
console.log('Resultado de la devolución:', returnResult1);

// Generar reporte de la biblioteca
myLibrary.generateLibraryReport();

// Eliminar un libro
myLibrary.removeBookFromLibrary(book2.id);
myLibrary.generateLibraryReport();