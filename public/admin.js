// Your Code Here

// Displays the list of books
fetch('http://localhost:3001/listBooks')
    .then(response => response.json())
    .then(books => {
        const bookList = document.querySelector('#root'); // Found that I needed to access the <div id="root"></div> to see the bookList

        books.forEach(book => {
            const div = document.createElement('div');
            const title = document.createElement('h2');
        title.textContent = book.title;
        const input = document.createElement('input');
        input.type = 'number';
        input.value = book.quantity;
        const button = document.createElement('button');
        button.textContent = 'Save';
        button.addEventListener('click', () => {
            // fetch(`http://localhost:3001/updateBook` ,{ 
            // Had trouble connecting to the server.js and the /admin would not render on the browser.
            fetch(`http://localhost:3001/updateBook/${book.id}` ,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: book.id, quantity: input.value })
             })
                .then(response => response.json())
                .then(updateBook => {
                    input.value = updateBook.quantity;
                })
                .catch(error => console.log(error));
         });
        bookList.appendChild(title);
        bookList.appendChild(input);
        bookList.appendChild(button);
        bookList.appendChild(div);
    })  
})

.catch(error => console.error(error));
