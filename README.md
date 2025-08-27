📚 LibrarySystem – Sistema de Gestión de Biblioteca
Descripción

LibrarySystem es una clase en JavaScript diseñada para gestionar el flujo completo de una biblioteca, incluyendo:

Registro y eliminación de libros.

Préstamos y devoluciones.

Búsqueda de libros por criterios y géneros.

Cálculo automático de multas por retraso.

Generación de reportes estadísticos de la biblioteca.

Este proyecto está pensado para fines educativos y como base para sistemas más complejos, integrables con bases de datos y APIs REST.


🚀 Características principales

Creación y gestión de libros (título, autor, género, ISBN).

Préstamos y devoluciones con control de fechas y multas.

Búsqueda por criterio (título, autor o género).

Filtrado por género literario.

Detección de libros vencidos y cálculo de multas automáticas.

Reportes estadísticos en tiempo real.


🛠 Tecnologías utilizadas

Lenguaje: JavaScript (ES6+)

Entorno de ejecución: Node.js (recomendado v14 o superior)

No requiere librerías externas (100% nativo de JS).


📂 Estructura de la clase

La clase LibrarySystem incluye los siguientes métodos públicos:

createBook(title, author, genre, isbn)
Crea un objeto libro con sus atributos y metadatos.

addBookToLibrary(title, author, genre, isbn)
Agrega un libro al catálogo de la biblioteca.

removeBookFromLibrary(id)
Elimina un libro por su ID único.

borrowBook(bookId, borrowerName, days = 14)
Registra el préstamo de un libro y asigna fecha de devolución.

returnBook(bookId)
Procesa la devolución de un libro y calcula multa si hay retraso.

calculateFine(dueDate, fineRate = 0.50)
Calcula la multa en función de los días de retraso.

searchBooks(criteria)
Busca libros por título, autor o género.

getBooksByGenre(genre)
Filtra los libros por un género específico.

getOverdueBooks(fineRate = 0.50)
Devuelve una lista de libros vencidos y sus multas.

generateLibraryReport()
Genera un reporte con estadísticas generales de la biblioteca.


📌 Ejemplo de uso
// Crear instancia
const myLibrary = new LibrarySystem();

// Agregar libros
const book1 = myLibrary.addBookToLibrary('Cien años de soledad', 'Gabriel García Márquez', 'Realismo Mágico', '978-0307474278');

// Prestar un libro
const borrowResult = myLibrary.borrowBook(book1.id, 'Juan Pérez', 7);

// Buscar libros
const searchResults = myLibrary.searchBooks('soledad');

// Generar reporte
myLibrary.generateLibraryReport();


📊 Ejemplo de reporte generado
{
  "totalBooks": 3,
  "borrowedBooks": 1,
  "availableBooks": 2,
  "overdueBooks": 0,
  "totalFines": 0
}


💡 Posibles mejoras futuras

Conexión a una base de datos (MySQL, MongoDB, etc.).

Creación de API REST con Express.js.

Interfaz web para gestión de libros y reportes.

Implementación de autenticación de usuarios.

Ingresos manuales del usuario y no con valores definidos especificos.


🧑‍💻 Autor

German Ricardo Torres Hernández
Proyecto gesrtion de biblioteca servicios WEB.