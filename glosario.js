const glossaryData = [
    // Conceptos Fundamentales
    { term: "Estructura de datos", definition: "Organización y almacenamiento de datos de manera que puedan ser utilizados eficientemente.", category: "conceptos fundamentales" },
    { term: "Tipos de datos", definition: "Clasificación de los datos que define el tipo de valores que puede contener y las operaciones que se pueden realizar.", category: "conceptos fundamentales" },
    { term: "Tipos de datos abstractos (TDA)", definition: "Modelos matemáticos de datos y operaciones que definen un comportamiento sin especificar implementación concreta.", category: "conceptos fundamentales" },
    { term: "Recursividad directa", definition: "Cuando una función se llama a sí misma directamente.", category: "conceptos fundamentales" },
    { term: "Recursividad indirecta", definition: "Cuando una función llama a otra función que finalmente llama a la primera.", category: "conceptos fundamentales" },
    { term: "Constructor", definition: "Función especial usada para inicializar un objeto al ser creado.", category: "conceptos fundamentales" },
    { term: "Unidades temáticas", definition: "División de contenido en secciones o módulos para organizar conceptos.", category: "conceptos fundamentales" },

    // Estructuras y Componentes
    { term: "Estáticas (estructuras)", definition: "Estructuras de datos con tamaño fijo durante la ejecución del programa.", category: "estructuras y componentes" },
    { term: "Dinámicas (estructuras)", definition: "Estructuras de datos cuyo tamaño puede cambiar durante la ejecución del programa.", category: "estructuras y componentes" },
    { term: "Bloques de construcción estáticas", definition: "Componentes de estructuras estáticas, como arrays o registros.", category: "estructuras y componentes" },
    { term: "Bloques de construcción en dinámicas", definition: "Componentes de estructuras dinámicas, como nodos en listas enlazadas.", category: "estructuras y componentes" },
    { term: "Nodos", definition: "Elementos básicos de estructuras dinámicas que contienen datos y referencias a otros nodos.", category: "estructuras y componentes" },
    { term: "Arreglos", definition: "Colección de elementos del mismo tipo, almacenados contiguamente en memoria.", category: "estructuras y componentes" },

    // Elementos de Programación
    { term: "Declaración", definition: "Instrucción que define variables, funciones o estructuras.", category: "elementos de programacion" },
    { term: "Tamaño [ ]", definition: "Indica el tamaño o dimensiones de un arreglo.", category: "elementos de programacion" },
    { term: "Corchetes { }", definition: "Se usan para delimitar bloques de código en la mayoría de lenguajes.", category: "elementos de programacion" },
    { term: "Palabra reservada", definition: "Palabras con significado especial en un lenguaje de programación.", category: "elementos de programacion" },
    { term: "Sintaxis", definition: "Conjunto de reglas que define la forma correcta de escribir código.", category: "elementos de programacion" },
    { term: "Semántica", definition: "Significado o interpretación de las instrucciones del código.", category: "elementos de programacion" },

    // Control de Memoria
    { term: "Apuntador (*)", definition: "Variable que almacena la dirección de memoria de otra variable.", category: "control de memoria" },
    { term: "Iterador", definition: "Objeto o variable que permite recorrer elementos de una colección.", category: "control de memoria" },
    { term: "Long int", definition: "Tipo de dato entero de mayor tamaño.", category: "control de memoria" },
    { term: "Transformación de datos", definition: "Proceso de convertir datos de un formato a otro.", category: "control de memoria" },

    // Posición y Tipos de Datos
    { term: "Índice", definition: "Número que indica la posición de un elemento en una estructura.", category: "posicion y tipos de datos" },
    { term: "Subíndice", definition: "Valor usado para acceder a un elemento específico de una estructura.", category: "posicion y tipos de datos" },
    { term: "char", definition: "Tipo de dato que almacena un solo carácter.", category: "posicion y tipos de datos" },
    { term: "short", definition: "Tipo de dato entero pequeño.", category: "posicion y tipos de datos" },
    { term: "int", definition: "Tipo de dato entero estándar.", category: "posicion y tipos de datos" },
    { term: "long", definition: "Tipo de dato entero grande.", category: "posicion y tipos de datos" },
    { term: "float", definition: "Tipo de dato que almacena números decimales de precisión simple.", category: "posicion y tipos de datos" },
    { term: "double", definition: "Tipo de dato que almacena números decimales de doble precisión.", category: "posicion y tipos de datos" },
    { term: "long double", definition: "Tipo de dato que almacena números decimales de precisión extendida.", category: "posicion y tipos de datos" },
];

let filteredData = [...glossaryData];
let currentFilter = 'all';

const categoryColors = {
    "conceptos fundamentales": "bg-blue-100 text-blue-800",
    "estructuras y componentes": "bg-green-100 text-green-800",
    "elementos de programacion": "bg-yellow-100 text-yellow-800",
    "control de memoria": "bg-purple-100 text-purple-800",
    "posicion y tipos de datos": "bg-pink-100 text-pink-800"
};

function initGlossary() {
    renderGlossary();
    setupSearch();
}

function renderGlossary() {
    const grid = document.getElementById('glossaryGrid');
    grid.innerHTML = '';

    filteredData.forEach(item => {
        const termCard = document.createElement('div');
        termCard.className = 'term-card bg-white rounded-lg shadow-md p-6 cursor-pointer border border-gray-200';
        termCard.onclick = () => showTermDetail(item);

        termCard.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-semibold text-gray-800">${item.term}</h3>
                <span class="px-2 py-1 rounded-full text-xs font-medium ${categoryColors[item.category]}">${item.category}</span>
            </div>
            <p class="text-gray-600 text-sm line-clamp-3">${item.definition.substring(0, 100)}...</p>
            <div class="mt-4 text-blue-500 text-sm font-medium">Click para ver más →</div>
        `;

        grid.appendChild(termCard);
    });

    if (filteredData.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500">No se encontraron conceptos.</div>';
    }
}

function showTermDetail(item) {
    document.getElementById('detailTerm').textContent = item.term;
    document.getElementById('detailCategory').textContent = item.category;
    document.getElementById('detailCategory').className = `inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColors[item.category]}`;
    document.getElementById('detailDefinition').textContent = item.definition;
    document.getElementById('termDetail').classList.remove('hidden');
    document.querySelector('#termDetail .bg-white').classList.add('definition-enter');
}

function closeDetail() {
    document.getElementById('termDetail').classList.add('hidden');
}

function filterByCategory(category) {
    currentFilter = category;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.className = 'filter-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors';
    });

    event.target.className = 'filter-btn bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors';

    if (category === 'all') {
        filteredData = [...glossaryData];
    } else {
        filteredData = glossaryData.filter(item => item.category === category);
    }

    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        filteredData = filteredData.filter(item =>
            item.term.toLowerCase().includes(searchTerm) ||
            item.definition.toLowerCase().includes(searchTerm)
        );
    }

    renderGlossary();
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        let baseData = currentFilter === 'all' ? glossaryData : glossaryData.filter(item => item.category === currentFilter);

        if (searchTerm) {
            filteredData = baseData.filter(item =>
                item.term.toLowerCase().includes(searchTerm) ||
                item.definition.toLowerCase().includes(searchTerm)
            );
        } else {
            filteredData = baseData;
        }

        renderGlossary();
    });
}

document.getElementById('termDetail').addEventListener('click', (e) => {
    if (e.target.id === 'termDetail') closeDetail();
});

initGlossary();